import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/button";

export type TimelineEntry = { year: string; title: string; body: string };
export type Principle = { title: string; body: string };

/** Numbered milestone grid used on the About page. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <>
      <SectionHeading eyebrow="How we got here" title="Seven years, four drops a year" className="mb-14" />
      <ol className="grid gap-10 md:grid-cols-4">
        {entries.map((item, i) => (
          <Reveal as="li" key={item.year} delay={i * 0.08}>
            <p className="eyebrow mb-3 text-ink-soft">{item.year}</p>
            <h3 className="text-xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
          </Reveal>
        ))}
      </ol>
    </>
  );
}

/** Two-column principle list. */
export function Principles({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  items: Principle[];
}) {
  return (
    <>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="mb-14"
      />
      <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {items.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.06}>
            <h3 className="text-xl">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </Reveal>
        ))}
      </ul>
    </>
  );
}
