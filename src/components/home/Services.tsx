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
    <section id="services" className="scroll-mt-24 bg-mist py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-navy-600">
            Popular services
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Shuklaganj aur Unnao ke common electrician jobs
          </h2>
          <p className="mt-3 text-base text-navy-600">
            Starting labour prices visible hain. Material alag ho sakta hai.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.slug] ?? Plug;
            return (
              <article
                key={service.slug}
                className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow/20 text-navy-950">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-navy-700">
                  {service.price}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
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
      </div>
    </section>
  );
}
