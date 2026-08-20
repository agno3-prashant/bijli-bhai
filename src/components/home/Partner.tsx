import { Phone } from "lucide-react";

import { TrackedLink, WhatsAppCta } from "@/components/cta/CtaLinks";
import { CALL_HREF, PARTNER_WHATSAPP_HREF } from "@/lib/contact";

export function Partner() {
  return (
    <section className="bg-mist py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[1.6rem] border border-navy-200 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-10">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
              Electrician ho?
            </h2>
            <p className="mt-3 max-w-xl text-navy-600">
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
              <Phone className="h-4 w-4" />
              Partner Banne Ke Liye Call Karein
            </TrackedLink>
            <WhatsAppCta
              href={PARTNER_WHATSAPP_HREF}
              event="partner_clicked"
              label="Partner WhatsApp"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
