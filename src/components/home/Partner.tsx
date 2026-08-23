import { Phone } from "lucide-react";

import { TrackedLink, WhatsAppCta } from "@/components/cta/CtaLinks";
import { Section } from "@/components/layout/Section";
import { CALL_HREF, PARTNER_WHATSAPP_HREF } from "@/lib/contact";

export function Partner() {
  return (
    <Section id="partner" className="bg-mist">
      <div className="rounded-[1.6rem] border border-dashed border-navy-300 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">
            For electricians
          </p>
          <h2 className="section-title mt-2">Electrician ho?</h2>
          <p className="section-copy">
            BijliBhai ke saath local service requests par kaam karein.
          </p>
        </div>
        <div className="mt-6 flex w-full flex-col gap-3 sm:mt-0 sm:w-auto sm:flex-row">
          <TrackedLink
            href={CALL_HREF}
            event="partner_clicked"
            label="Partner call"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy-950 px-5 font-semibold text-white"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Partner Banne Ke Liye Call Karein
          </TrackedLink>
          <WhatsAppCta
            href={PARTNER_WHATSAPP_HREF}
            event="partner_clicked"
            label="Partner WhatsApp"
          />
        </div>
      </div>
    </Section>
  );
}
