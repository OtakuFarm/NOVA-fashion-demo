import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/ui/media-image";
import type { ProductImage } from "@/lib/commerce";

/** Editorial page banner used at the top of Shop, Collection and policy pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  meta,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: ProductImage;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="container-nova pt-12 pb-10 md:pt-16 md:pb-14">
      {image && (
        <Reveal className="mb-10">
          <MediaImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            aspect="aspect-[16/7]"
            priority
            imgClassName="object-cover"
          />
        </Reveal>
      )}

      <Reveal>
        <p className="eyebrow mb-4 text-ink-soft">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl md:text-6xl">{title}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
            {description}
          </p>
        )}
        {meta && meta.length > 0 && (
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow text-ink-soft">{m.label}</dt>
                <dd className="mt-1.5 text-sm">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Reveal>
    </section>
  );
}
