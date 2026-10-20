import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { CALL_NUMBERS, EMAIL, EMAIL_HREF, trackCta } from "@/lib/contact";

export function FinalCta() {
  return (
    <section id="contact" className="section-pad bg-navy-950 text-white">
      <div className="page-wrap max-w-3xl text-center">
        <h2 className="font-display text-[1.85rem] font-extrabold tracking-tight sm:text-5xl">
          Bijli ka kaam pending hai?
          <span className="mt-2 block text-yellow">Bhai ko bulao.</span>
        </h2>
        <p className="mt-4 text-lg text-white/65">Kanpur • Shuklaganj • Unnao</p>
        <p className="mt-2 text-sm text-yellow/80">
          Diwali jhalar pending hai? Abhi bulao — festival se pehle.
        </p>
        <p className="mt-4 flex flex-col items-center gap-1 text-sm text-white/50 sm:flex-row sm:justify-center sm:gap-4">
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
