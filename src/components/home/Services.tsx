import {
  AlertTriangle,
  Battery,
  Lightbulb,
  Plug,
  Power,
  Search,
  Wind,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { TrackedLink } from "@/components/cta/CtaLinks";
import { Section } from "@/components/layout/Section";
import { SERVICES } from "@/data/site";
import { CALL_HREF, whatsappHref } from "@/lib/contact";

const ICONS: Record<string, LucideIcon> = {
  "switch-socket": Power,
  fan: Wind,
  light: Lightbulb,
  "mcb-db": Plug,
  wiring: Wrench,
  inverter: Battery,
  inspection: Search,
  emergency: AlertTriangle,
};

export function Services() {
  return (
    <Section id="services" className="bg-mist">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-navy-600">
          Popular services
        </p>
        <h2 className="section-title mt-2">
          Everyday electrician jobs, clearly priced
        </h2>
        <p className="section-copy">
          Starting labour prices visible hain. Material alag ho sakta hai.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => {
          const Icon = ICONS[service.slug] ?? Plug;
          return (
            <article
              key={service.slug}
              className="surface-card flex h-full flex-col p-5 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow/20 text-navy-950">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-[1.15rem] font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-navy-700">
                {service.price}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                {service.description}
              </p>
              <div className="mt-5 flex gap-2">
                <TrackedLink
                  href={CALL_HREF}
                  event="service_clicked"
                  label={`${service.title} call`}
                  className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-yellow text-sm font-semibold text-navy-950"
                >
                  Call Now
                </TrackedLink>
                <TrackedLink
                  href={whatsappHref(service.message)}
                  event="whatsapp_clicked"
                  label={`${service.title} WhatsApp`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-navy-200 px-3 text-sm font-semibold text-navy-800"
                >
                  Book
                </TrackedLink>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
