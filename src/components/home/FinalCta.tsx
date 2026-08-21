import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { CALL_NUMBERS, EMAIL, EMAIL_HREF, trackCta } from "@/lib/contact";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-navy-950 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow">
          Ready when you are
        </p>
        <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Need an electrician in Kanpur, Shuklaganj or Unnao?
        </h2>
        <p className="mt-4 text-lg text-white/65">
          Book a visit, or talk to BijliBhai directly.
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
          <Link
            to="/#book"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow px-5 text-base font-semibold text-navy-950"
          >
            Book a visit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <CallCta className="w-full sm:w-auto" />
          <WhatsAppCta className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
