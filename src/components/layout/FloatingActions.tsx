import { Phone } from "lucide-react";

import { TrackedLink, WhatsAppGlyph } from "@/components/cta/CtaLinks";
import { CALL_HREF, DEFAULT_WHATSAPP_HREF } from "@/lib/contact";

export function FloatingActions() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-800 bg-navy-950/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
          <TrackedLink
            href={CALL_HREF}
            event="call_clicked"
            label="Mobile bar Call Now"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow text-sm font-semibold text-navy-950"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call Now
          </TrackedLink>
          <TrackedLink
            href={DEFAULT_WHATSAPP_HREF}
            event="whatsapp_clicked"
            label="Mobile bar WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-semibold text-white"
          >
            <WhatsAppGlyph className="h-4 w-4" />
            WhatsApp
          </TrackedLink>
        </div>
      </div>

      <TrackedLink
        href={DEFAULT_WHATSAPP_HREF}
        event="whatsapp_clicked"
        label="Desktop floating WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Karein"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.4)] md:inline-flex"
      >
        <WhatsAppGlyph className="h-7 w-7" />
      </TrackedLink>
    </>
  );
}
