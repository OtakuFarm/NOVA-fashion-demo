"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

import { useToast } from "@/components/toast";

type Fields = { name: string; email: string; order: string; topic: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const TOPICS = [
  "Sizing & fit",
  "An order",
  "Returns or exchange",
  "Repairs",
  "Press or wholesale",
  "Something else",
];

const EMPTY: Fields = { name: "", email: "", order: "", topic: TOPICS[0], message: "" };

const inputClass =
  "w-full border-b border-ink/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-ink";

/** Validated contact form. Submissions are simulated — nothing is sent. */
export function ContactForm() {
  const notify = useToast();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (f: Fields): Errors => {
    const next: Errors = {};
    if (!f.name.trim()) next.name = "Please tell us your name.";
    if (!f.email.trim()) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
      next.email = "That email address doesn't look right.";
    if (f.message.trim().length < 10) next.message = "A little more detail helps us help you.";
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      notify("Please fix the highlighted fields", "error");
      return;
    }
    setSending(true);
    // Simulated request — this demo has no backend.
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
    notify("Message sent — we reply within one business day");
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-5 border border-ink/10 px-8 py-20 text-center"
      >
        <span className="grid size-12 place-items-center rounded-full bg-accent text-ink">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl">Thanks, {fields.name.split(" ")[0]}.</h2>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Your message is with the studio. We reply to everything within one business day —
            usually much faster.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY);
            setSent(false);
          }}
          className="border-b border-ink pb-0.5 text-xs uppercase tracking-[0.2em]"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block text-ink-soft">
            Name
          </label>
          <input
            id="name"
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
          {errors.name && (
            <p role="alert" className="mt-1.5 text-xs text-clay">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block text-ink-soft">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
          />
          {errors.email && (
            <p role="alert" className="mt-1.5 text-xs text-clay">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="topic" className="eyebrow mb-2 block text-ink-soft">
            Topic
          </label>
          <select
            id="topic"
            value={fields.topic}
            onChange={(e) => set("topic", e.target.value)}
            className={inputClass}
          >
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="order" className="eyebrow mb-2 block text-ink-soft">
            Order number <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="order"
            value={fields.order}
            onChange={(e) => set("order", e.target.value)}
            placeholder="NOVA-00000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block text-ink-soft">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="How can we help?"
          aria-invalid={Boolean(errors.message)}
          className={`${inputClass} resize-y`}
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-xs text-clay">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={sending}
          className="bg-ink px-10 py-4 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-ink-soft disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
        <p className="mt-3 text-xs text-ink-soft">
          This is a demo storefront — the form validates and simulates a send, but nothing is
          transmitted.
        </p>
      </div>
    </form>
  );
}
