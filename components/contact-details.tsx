import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { site } from "@/lib/site";

/** Contact details panel shown alongside the form. */
export function ContactDetails() {
  const items = [
    { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { Icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^0-9+]/g, "")}` },
    { Icon: MapPin, label: "Studio", value: site.address },
    { Icon: Clock, label: "Hours", value: site.hours },
  ];

  return (
    <ul className="space-y-7">
      {items.map(({ Icon, label, value, href }) => (
        <li key={label} className="flex gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow text-ink-soft">{label}</p>
            {href ? (
              <a href={href} className="mt-1 block text-sm hover:underline">
                {value}
              </a>
            ) : (
              <p className="mt-1 text-sm">{value}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
