import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 uppercase tracking-[0.2em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-bone hover:bg-ink-soft",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  ghost: "text-ink hover:bg-ink/5",
  accent: "bg-accent text-ink hover:brightness-95",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.65rem]",
  md: "px-7 py-3.5 text-[0.7rem]",
  lg: "px-10 py-5 text-xs",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}

/** Primary button element. */
export function Button({
  variant = "solid",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={classes(variant, size, className)} {...props} />;
}

/** Anchor-styled link that looks like a button. */
export function ButtonLink({
  variant = "solid",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={classes(variant, size, className)} {...props} />;
}

/** Editorial section header with an optional action link. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3 text-ink-soft">{eyebrow}</p>}
        <h2 className="text-3xl md:text-5xl">{title}</h2>
        {description && <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="link-underline pb-1 text-xs uppercase tracking-[0.2em]">
          {action.label}
        </Link>
      )}
    </div>
  );
}
