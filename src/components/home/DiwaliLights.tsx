import { Link } from "react-router-dom";

import { FestiveHomeVisual } from "@/campaigns/diwali/FestiveHomeVisual";
import { DIWALI_CAMPAIGN } from "@/campaigns/diwali/config";
import { diwaliWhatsAppHref } from "@/campaigns/diwali/messages";
import { CallCta, OutlineCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { Section } from "@/components/layout/Section";
import { PRICE_WHATSAPP_HREF, trackCta } from "@/lib/contact";

export function DiwaliLights() {
  return (
    <Section
      id="diwali"
      className="diwali-campaign relative overflow-hidden bg-[#07182C] text-white"
    >
      <div className="diwali-sparkle pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="diwali-fade">
          <p className="inline-flex rounded-full border border-[#F4B942]/35 bg-[#FDE245]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FDE245]">
            Diwali 2026 · Kanpur • Shuklaganj • Unnao
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Is Diwali, Ghar Chamkega.
            <span className="mt-2 block text-[#FDE245]">BijliBhai Sambhalega.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#FFF8E7]/75 sm:text-lg">
            Jhalar, fairy lights, balcony lighting, LED strips aur decorative
            lights installation — ab bina tension ke.
          </p>
          <p className="mt-3 text-sm text-[#FFF8E7]/55">
            Labour existing Light / extra-point rates se. Material alag ho sakta
            hai. Availability confirm karke batate hain — guaranteed slot nahi.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppCta
              href={diwaliWhatsAppHref()}
              event="diwali_booking_started"
              label="Diwali Lighting Book Karein"
              className="w-full sm:w-auto"
            >
              Diwali Lighting Book Karein
            </WhatsAppCta>
            <OutlineCta
              href={PRICE_WHATSAPP_HREF}
              event="diwali_whatsapp_clicked"
              label="WhatsApp Par Rate Puchhein"
              className="w-full sm:w-auto"
            >
              WhatsApp Par Rate Puchhein
            </OutlineCta>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallCta
              event="diwali_call_clicked"
              label="Diwali campaign call"
              className="w-full sm:w-auto"
            />
            <Link
              to={DIWALI_CAMPAIGN.path}
              onClick={() =>
                trackCta({
                  event: "diwali_banner_clicked",
                  label: "Homepage lighting page",
                  href: DIWALI_CAMPAIGN.path,
                })
              }
              className="text-sm font-semibold text-[#FDE245] hover:underline"
            >
              Lighting services dekhein →
            </Link>
          </div>
        </div>
        <div className="diwali-fade">
          <FestiveHomeVisual compact />
        </div>
      </div>
    </Section>
  );
}
