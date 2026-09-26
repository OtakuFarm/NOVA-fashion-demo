// Minimal CDP screenshotter: launches nothing, connects to an already-running
// Chrome with --remote-debugging-port, waits in REAL time (no virtual clock),
// then captures a full-page screenshot.
import { writeFileSync } from "node:fs";

const PORT = process.env.CDP_PORT || 9222;
const OUT = process.env.OUT_DIR || "preview";
const WIDTH = Number(process.env.W || 1440);
const HEIGHT = Number(process.env.H || 900);
const WAIT = Number(process.env.WAIT || 3500);
const PAGES = JSON.parse(process.env.PAGES);

const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" });
const target = await res.json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const events = [];

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  } else if (msg.method) {
    events.push(msg);
  }
});

await new Promise((r) => ws.addEventListener("open", r, { once: true }));

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: 1,
  mobile: WIDTH < 768,
});

for (const [name, url] of PAGES) {
  events.length = 0;
  await send("Page.navigate", { url });
  await new Promise((r) => setTimeout(r, WAIT));

  // Scroll the whole page first. Many sections animate in via whileInView, and
  // IntersectionObserver never fires for content that is below the fold when a
  // full-page screenshot is stitched together — leaving large blank gaps that
  // look like bugs but aren't. Scrolling makes the capture faithful.
  const { result } = await send("Runtime.evaluate", {
    expression: `(async () => {
      const step = window.innerHeight * 0.75;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      return document.body.scrollHeight;
    })()`,
    awaitPromise: true,
  });
  await new Promise((r) => setTimeout(r, 1200));
  console.log(`   ${name} full height ${result.value}px`);

  // Report any real JS errors so silent breakage can't hide behind a pretty picture.
  const errs = events
    .filter((e) => e.method === "Runtime.exceptionThrown" || e.method === "Log.entryAdded")
    .map((e) => JSON.stringify(e.params).slice(0, 300));
  if (errs.length) console.log(`  ! ${name} errors:\n    ` + errs.join("\n    "));

  const { result: audit } = await send("Runtime.evaluate", {
    expression: `(() => {
      const imgs = [...document.images];
      const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0);
      const visible = el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && getComputedStyle(el).opacity !== '0';
      };
      const anyOverflowX = document.documentElement.scrollWidth > window.innerWidth + 1;
      // Identify exactly which elements stick out past the viewport.
      const vw = window.innerWidth;
      const offenders = [...document.querySelectorAll('body *')]
        .map(el => {
          const r = el.getBoundingClientRect();
          return { el, right: r.right, left: r.left, w: r.width };
        })
        .filter(o => o.right > vw + 1 || o.left < -1)
        .filter(o => o.w > 0)
        .slice(0, 6)
        .map(o => {
          const cls = (o.el.className || '').toString().split(' ').filter(Boolean).slice(0, 3).join('.');
          let chain = [];
          let n = o.el;
          for (let d = 0; d < 6 && n; d++) {
            const c = (n.className || '').toString().split(' ').filter(Boolean).slice(0, 3).join('.');
            chain.push(n.tagName.toLowerCase() + '.' + c + '[' + Math.round(n.getBoundingClientRect().width) + ']');
            n = n.parentElement;
          }
          return 'w=' + Math.round(o.w) + ' left=' + Math.round(o.left) + ' right=' + Math.round(o.right) + ' :: ' + chain.join(' < ');
        });
      return JSON.stringify({
        images: imgs.length,
        broken: broken.length,
        hOverflow: anyOverflowX,
        scrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        offenders,
        links: document.querySelectorAll('a').length,
        emptyLinks: [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
      });
    })()`,
    returnByValue: true,
  });
  console.log(`   ${name} ${audit.value}`);

  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
  });
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, "base64"));
  console.log(`ok ${name} (${Math.round(data.length * 0.75 / 1024)}kb)`);
}

ws.close();
process.exit(0);
