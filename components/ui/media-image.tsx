import type { ReactNode } from "react";

type MediaImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". Defaults to 4:5. */
  aspect?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
};

/**
 * Lightweight responsive image primitive.
 *
 * The demo ships vector artwork in /public/media, so a plain <img> is used
 * instead of next/image: it avoids the native `sharp` dependency, keeps the
 * markup tiny and still gives us intrinsic sizing, native lazy-loading and
 * async decoding. Swap this component for `next/image` when real photography
 * is wired up.
 */
export function MediaImage({
  src,
  alt,
  width,
  height,
  aspect = "aspect-[4/5]",
  className = "",
  imgClassName = "object-cover",
  priority = false,
  sizes,
  children,
}: MediaImageProps) {
  return (
    <div className={`relative overflow-hidden bg-sand ${aspect} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={`size-full ${imgClassName}`}
      />
      {children}
    </div>
  );
}
