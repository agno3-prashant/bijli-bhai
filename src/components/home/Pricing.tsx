import { WhatsAppCta } from "@/components/cta/CtaLinks";
import { PRICE_EXAMPLES } from "@/data/site";
import { PRICE_WHATSAPP_HREF } from "@/lib/contact";

export function Pricing() {
  return (
    <section className="bg-mist py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[1.6rem] border border-navy-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Rate ki kich-kich kam.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                Basic labour pricing pehle se visible hai. Parts/material
                charges alag ho sakte hain. Final expected cost kaam shuru hone
                se pehle customer ko clear ki jayegi.
              </p>
              <WhatsAppCta
                href={PRICE_WHATSAPP_HREF}
                label="Price Puchhein"
                className="mt-6"
              >
                Price Puchhein on WhatsApp
              </WhatsAppCta>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PRICE_EXAMPLES.map((item) => (
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
      </div>
    </section>
  );
}
