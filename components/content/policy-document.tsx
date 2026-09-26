import { createElement, type ReactNode } from "react";

/** A paragraph or bulleted list inside a policy section. */
export type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

export type PolicySection = { heading: string; body: Block[] };

/** Renders a block list with consistent typography. */
export function renderBlocks(body: Block[]): ReactNode[] {
  return body.map((block, i) => {
    if (block.type === "p") return createElement("p", { key: i }, block.text);
    return createElement(
      "ul",
      { key: i, className: "space-y-2.5" },
      block.items.map((item) =>
        createElement(
          "li",
          { key: item, className: "flex gap-3" },
          createElement("span", {
            "aria-hidden": true,
            className: "mt-2 size-1 shrink-0 rounded-full bg-ink",
          }),
          item,
        ),
      ),
    );
  });
}

/** Consistent typography for long-form policy and legal content. */
export function PolicyDocument({
  intro,
  sections,
  updated,
}: {
  intro: string;
  sections: PolicySection[];
  updated: string;
}) {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-base leading-relaxed text-ink-soft md:text-lg">{intro}</p>
      <p className="mt-4 text-xs text-ink-soft">Last updated: {updated}</p>

      <div className="mt-14 space-y-12">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="border-b border-ink/10 pb-3 text-2xl">{section.heading}</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-soft">
              {renderBlocks(section.body)}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
