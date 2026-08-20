import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { CALL_NUMBERS, EMAIL, EMAIL_HREF, trackCta } from "@/lib/contact";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-navy-950 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Shuklaganj ya Unnao me electrician chahiye?
        </h2>
        <p className="mt-4 text-lg text-white/75">
          BijliBhai ko call ya WhatsApp karein.
        </p>
        <p className="mt-3 flex flex-col items-center gap-1 text-sm text-white/70 sm:flex-row sm:justify-center sm:gap-4">
          {CALL_NUMBERS.map((number) => (
            <a
              key={number.href}
              href={number.href}
              className="hover:text-yellow"
              onClick={() =>
                trackCta({
                  event: "call_clicked",
                  label: `Final CTA ${number.display}`,
                  href: number.href,
                })
              }
            >
              {number.display}
            </a>
          ))}
          <a href={EMAIL_HREF} className="hover:text-yellow">
            {EMAIL}
          </a>
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CallCta className="w-full sm:w-auto" />
          <WhatsAppCta className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
