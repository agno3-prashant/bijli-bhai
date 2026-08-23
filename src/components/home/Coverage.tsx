import { MapPin } from "lucide-react";

import { WhatsAppCta } from "@/components/cta/CtaLinks";
import { Section } from "@/components/layout/Section";
import { EXTENDED_AREAS, PRIMARY_AREAS } from "@/data/site";
import { AREA_WHATSAPP_HREF } from "@/lib/contact";

function AreaGroup({
  title,
  areas,
  featured = false,
}: {
  title: string;
  areas: readonly string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.4rem] border p-5 sm:p-6 ${
        featured
          ? "border-yellow/40 bg-navy-950 text-white shadow-[0_16px_40px_rgba(7,24,44,0.18)]"
          : "border-navy-100 bg-mist"
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wider ${
          featured ? "text-yellow" : "text-navy-500"
        }`}
      >
        {title}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {areas.map((area) => (
          <li
            key={area}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${
              featured
                ? "bg-white/10 text-white"
                : "border border-navy-100 bg-white text-navy-800"
            }`}
          >
            <MapPin
              className={`h-3.5 w-3.5 ${featured ? "text-yellow" : "text-navy-500"}`}
              aria-hidden
            />
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Coverage() {
  return (
    <Section id="coverage" className="bg-canvas">
      <h2 className="section-title">
        Kanpur, Shuklaganj & Unnao me electrician chahiye?
      </h2>
      <p className="section-copy">
        BijliBhai selected areas me local electrician requests coordinate karta
        hai. Exact availability call ya WhatsApp par confirm karein.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <AreaGroup title="Primary service areas" areas={PRIMARY_AREAS} featured />
        <AreaGroup title="More Kanpur localities" areas={EXTENDED_AREAS} />
      </div>
      <p className="mt-6 text-sm text-slate">
        Availability electrician aur distance par depend karegi.
      </p>
      <WhatsAppCta
        href={AREA_WHATSAPP_HREF}
        label="Area confirm"
        className="mt-5"
        event="location_clicked"
      >
        Apna area confirm karein
      </WhatsAppCta>
    </Section>
  );
}
