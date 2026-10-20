import { WhatsAppCta } from "@/components/cta/CtaLinks";
import { Section } from "@/components/layout/Section";
import { getPriceExamples } from "@/data/site";
import { PRICE_WHATSAPP_HREF } from "@/lib/contact";

export function Pricing() {
  return (
    <Section id="pricing" className="bg-mist">
      <div className="overflow-hidden rounded-[1.6rem] border border-navy-100 bg-white p-6 shadow-card sm:p-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="section-title">Rate ki kich-kich kam.</h2>
            <p className="section-copy">
              Basic labour pricing pehle se visible hai. Parts/material charges
              alag ho sakte hain. Expected cost kaam shuru hone se pehle clear
              ki jayegi.
            </p>
            <WhatsAppCta
              href={PRICE_WHATSAPP_HREF}
              label="Price Puchhein"
              className="mt-6"
            >
              Apne kaam ka rate puchhein
            </WhatsAppCta>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {getPriceExamples().map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-navy-950 px-4 py-4 text-white"
              >
                <p className="text-xs text-white/60">{item.label}</p>
                <p className="mt-1 font-display text-xl font-bold text-yellow">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
