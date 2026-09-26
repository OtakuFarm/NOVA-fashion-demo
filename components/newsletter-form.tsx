"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import { useToast } from "@/components/toast";

type Errors = { email?: string };

/** Newsletter capture with client-side validation and inline success state. */
export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const notify = useToast();

  const dark = tone === "dark";
  const validate = (value: string): Errors => {
    const next: Errors = {};
    if (!value.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()))
      next.email = "That email address doesn't look right.";
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(email);
    setErrors(found);
    if (Object.keys(found).length) {
      notify("Please check your email address", "error");
      return;
    }
    setDone(true);
    notify("You are on the list — welcome to NOVA");
    setEmail("");
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-3 border px-5 py-4 text-sm ${
          dark ? "border-bone/25 text-bone" : "border-ink/20 text-ink"
        }`}
      >
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-ink">
          <Check className="size-3.5" aria-hidden="true" />
        </span>
        You are on the list. Check your inbox for 10% off.
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-md">
      <div
        className={`flex items-center gap-3 border-b pb-3 ${
          errors.email ? "border-clay" : dark ? "border-bone/30" : "border-ink/25"
        }`}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({});
          }}
          placeholder="Enter your email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          className={`w-full bg-transparent text-base outline-none placeholder:text-current/40 ${
            dark ? "text-bone" : "text-ink"
          }`}
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="shrink-0 transition-transform duration-300 hover:translate-x-1"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs text-clay">
          {errors.email}
        </p>
      )}
      <p className={`mt-3 text-xs ${dark ? "text-bone/50" : "text-ink-soft"}`}>
        By subscribing you agree to our privacy policy. Unsubscribe any time.
      </p>
    </form>
  );
}
