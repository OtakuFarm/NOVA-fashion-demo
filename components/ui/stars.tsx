import { Star } from "lucide-react";

/** Accessible star rating display. */
export function Stars({
  rating,
  count,
  size = 14,
  showValue = false,
  className = "",
}: {
  rating: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="inline-flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = rounded >= i;
          const half = !filled && rounded >= i - 0.5;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star className="absolute inset-0 text-ink/20" style={{ width: size, height: size }} />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? size / 2 : size }}
                >
                  <Star
                    className="text-ink"
                    style={{ width: size, height: size }}
                    fill="currentColor"
                    strokeWidth={1}
                  />
                </span>
              )}
            </span>
          );
        })}
      </span>
      <span className="sr-only">
        Rated {rating} out of 5{count !== undefined ? ` from ${count} reviews` : ""}
      </span>
      {showValue && (
        <span aria-hidden="true" className="text-xs text-ink-soft">
          {rating.toFixed(1)}
          {count !== undefined && ` (${count})`}
        </span>
      )}
    </span>
  );
}
