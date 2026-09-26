"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navigation } from "@/lib/site";

/** Primary desktop navigation with a hover dropdown for collections. */
export function DesktopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {navigation.map((item) =>
          item.children ? (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <Link
                href={item.href}
                aria-expanded={open === item.label}
                aria-haspopup="true"
                className="link-underline flex items-center gap-1 py-2 text-xs uppercase tracking-[0.18em]"
              >
                {item.label}
                <ChevronDown
                  className={`size-3 transition-transform duration-300 ${
                    open === item.label ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </Link>
              <AnimatePresence>
                {open === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 w-80 -translate-x-1/2 border border-ink/10 bg-bone p-2 shadow-[0_30px_60px_-30px_rgba(11,11,12,0.35)]"
                  >
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-3 transition-colors hover:bg-ink/5"
                          >
                            <span className="block text-sm">{child.label}</span>
                            {child.description && (
                              <span className="mt-0.5 block text-xs text-ink-soft">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`link-underline py-2 text-xs uppercase tracking-[0.18em] ${
                  pathname === item.href ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
