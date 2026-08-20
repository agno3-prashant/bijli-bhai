import { Phone } from "lucide-react";

import { OutlineCta, TrackedLink, WhatsAppGlyph } from "@/components/cta/CtaLinks";
import { CALL_HREF, EMERGENCY_WHATSAPP_HREF } from "@/lib/contact";

export function Emergency() {
  return (
    <section className="bg-navy-950 py-14 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow">
            Emergency
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Sparking, burning smell ya short circuit?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Exposed wire ko touch na karein. Agar safely possible ho tabhi main
            supply off karein. Immediate fire/danger ki situation me appropriate
            emergency assistance contact karein.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={CALL_HREF}
              event="call_clicked"
              label="Emergency call"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow px-5 font-semibold text-navy-950"
            >
              <Phone className="h-4 w-4" />
              Electrician Se Baat Karein
            </TrackedLink>
            <OutlineCta
              href={EMERGENCY_WHATSAPP_HREF}
              label="WhatsApp Emergency Request"
            >
              <WhatsAppGlyph />
              WhatsApp Emergency Request
            </OutlineCta>
          </div>
        </div>
      </div>
    </section>
  );
}
