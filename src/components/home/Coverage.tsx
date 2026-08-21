import { MapPin } from "lucide-react";

import { WhatsAppCta } from "@/components/cta/CtaLinks";
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
          ? "border-yellow/40 bg-navy-950 text-white shadow-[0_16px_40px_rgba(6,22,42,0.18)]"
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
    <section id="coverage" className="scroll-mt-24 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Kanpur, Shuklaganj aur Unnao me electrician chahiye?
        </h2>
        <p className="mt-3 max-w-2xl text-navy-600">
          BijliBhai Kanpur, Shuklaganj aur Unnao me electrician service deta
          hai. Nearby areas me availability call/WhatsApp par confirm ki ja
          sakti hai.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <AreaGroup title="Primary Service Areas" areas={PRIMARY_AREAS} featured />
          <AreaGroup title="More Kanpur areas" areas={EXTENDED_AREAS} />
        </div>
        <p className="mt-6 text-sm text-navy-600">
          Availability electrician aur distance par depend karegi. Exact area
          call ya WhatsApp par confirm karein.
        </p>
        <WhatsAppCta href={AREA_WHATSAPP_HREF} label="Area confirm" className="mt-5">
          Apna area confirm karein
        </WhatsAppCta>
      </div>
    </section>
  );
}
