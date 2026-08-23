import { Phone } from "lucide-react";

import { TrackedLink, WhatsAppCta } from "@/components/cta/CtaLinks";
import { Section } from "@/components/layout/Section";
import { CALL_HREF, PARTNER_WHATSAPP_HREF } from "@/lib/contact";

export function Partner() {
  return (
    <Section id="partner" className="bg-mist">
      <div className="surface-card px-6 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">
            For electricians
          </p>
          <h2 className="section-title mt-2">Electrician ho?</h2>
          <p className="section-copy mx-auto">
            BijliBhai ke saath local service requests par kaam karein.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <TrackedLink
              href={CALL_HREF}
              event="partner_clicked"
              label="Partner call"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy-950 px-6 font-semibold text-white"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              Partner Call Karein
            </TrackedLink>
            <WhatsAppCta
              href={PARTNER_WHATSAPP_HREF}
              event="partner_clicked"
              label="Partner WhatsApp"
            >
              Partner WhatsApp
            </WhatsAppCta>
          </div>
        </div>
      </div>
    </Section>
  );
}
