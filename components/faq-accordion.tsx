"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

export type FaqItem = { q: string; a: string; id?: string };
export type FaqGroup = { title: string; items: FaqItem[] };

/** Accessible accordion of question groups. */
export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="eyebrow mb-6 border-b border-ink/10 pb-3 text-ink-soft">{group.title}</h2>
          <ul className="divide-y divide-ink/10 border-b border-ink/10">
            {group.items.map((item) => {
              const key = item.id ?? item.q;
              const isOpen = open === key;
              return (
                <li key={key} id={item.id} className="scroll-mt-28">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-base md:text-lg">{item.q}</span>
                      <Plus
                        className={`size-4 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
