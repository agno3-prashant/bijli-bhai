import { useEffect, useMemo, useState } from "react";

import { FestiveHomeVisual, GALLERY_SCENES } from "@/campaigns/diwali/FestiveHomeVisual";
import { DIWALI_CAMPAIGN } from "@/campaigns/diwali/config";
import {
  DIWALI_FAQS,
  DIWALI_LIGHT_LABOUR,
  DIWALI_POINT_LABOUR,
  DIWALI_PROPERTIES,
  DIWALI_SERVICES,
  DIWALI_STEPS,
} from "@/campaigns/diwali/data";
import { diwaliWhatsAppHref } from "@/campaigns/diwali/messages";
import { CallCta, OutlineCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { Section } from "@/components/layout/Section";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRIMARY_AREAS } from "@/data/site";
import { PRICE_WHATSAPP_HREF, trackCta } from "@/lib/contact";
import { cn } from "@/lib/utils";

const LOCATIONS = ["Kanpur", "Shuklaganj", "Unnao"] as const;

function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    const previousCanonical = canonical?.getAttribute("href") ?? "";
    const previousOgTitle = ogTitle?.getAttribute("content") ?? "";
    const previousOgDescription = ogDescription?.getAttribute("content") ?? "";
    const previousOgUrl = ogUrl?.getAttribute("content") ?? "";
    const url = `https://bijlibhai.in${path}`;

    document.title = title;
    meta?.setAttribute("content", description);
    canonical?.setAttribute("href", url);
    ogTitle?.setAttribute("content", title);
    ogDescription?.setAttribute("content", description);
    ogUrl?.setAttribute("content", url);

    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
      canonical?.setAttribute("href", previousCanonical);
      ogTitle?.setAttribute("content", previousOgTitle);
      ogDescription?.setAttribute("content", previousOgDescription);
      ogUrl?.setAttribute("content", previousOgUrl);
    };
  }, [title, description, path]);
}

function Choice({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-4 text-sm font-semibold transition",
        active
          ? "bg-[#FDE245] text-[#07182C]"
          : "border border-[#F4B942]/30 bg-white/5 text-[#FFF8E7]/80 hover:border-[#FDE245]/50",
      )}
    >
      {children}
    </button>
  );
}

export default function DiwaliLighting() {
  const [property, setProperty] = useState<(typeof DIWALI_PROPERTIES)[number]>("Home");
  const [service, setService] = useState<(typeof DIWALI_SERVICES)[number]["title"]>(
    DIWALI_SERVICES[0].title,
  );
  const [location, setLocation] = useState<(typeof LOCATIONS)[number]>("Kanpur");

  usePageMeta(DIWALI_CAMPAIGN.title, DIWALI_CAMPAIGN.description, DIWALI_CAMPAIGN.path);

  useEffect(() => {
    trackCta({
      event: "diwali_page_viewed",
      label: "Diwali lighting page",
      href: DIWALI_CAMPAIGN.path,
    });
  }, []);

  const bookingHref = useMemo(
    () => diwaliWhatsAppHref({ property, service, location }),
    [property, service, location],
  );

  return (
    <SiteShell>
      <article className="diwali-campaign bg-[#FFF8E7]">
        <section className="relative overflow-hidden bg-[#07182C] text-white">
          <div className="diwali-sparkle pointer-events-none absolute inset-0" aria-hidden />
          <div className="page-wrap relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="diwali-fade">
              <p className="inline-flex max-w-full flex-wrap rounded-full border border-[#F4B942]/35 bg-[#FDE245]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FDE245]">
                <span className="hidden sm:inline">Festive lighting · </span>
                Kanpur • Shuklaganj • Unnao
              </p>
              <h1 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.06] tracking-tight sm:text-6xl">
                Is Diwali, Ghar Chamkega.
                <span className="mt-2 block text-[#FDE245]">BijliBhai Sambhalega.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#FFF8E7]/75 sm:text-lg">
                Jhalar, fairy lights, balcony lighting, LED strips aur decorative
                lights installation — ab bina tension ke.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppCta
                  href={bookingHref}
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
            </div>
            <FestiveHomeVisual compact />
          </div>
        </section>

        <Section id="diwali-services" className="bg-[#FFF8E7]">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#F28C38]">
            Seasonal lighting services
          </p>
          <h2 className="section-title mt-2">Jo lighting chahiye, woh select karo</h2>
          <p className="section-copy">
            Existing labour catalogue se mapped. Exact festive package price nahi
            likha — estimate WhatsApp par milta hai. Material labour se alag.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DIWALI_SERVICES.map((item) => (
              <article
                key={item.slug}
                className="flex h-full flex-col rounded-2xl border border-[#F4B942]/25 bg-white p-5 shadow-card"
              >
                <h3 className="font-display text-lg font-semibold text-[#07182C]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
                  {item.text}
                </p>
                <p className="mt-3 text-sm font-semibold text-[#F28C38]">{item.rate}</p>
                <WhatsAppCta
                  href={diwaliWhatsAppHref({
                    property,
                    service: item.title,
                    location,
                  })}
                  event="diwali_service_selected"
                  label={item.title}
                  className="mt-4 w-full"
                >
                  {item.cta}
                </WhatsAppCta>
              </article>
            ))}
          </div>
        </Section>

        <Section id="book" className="bg-[#07182C] text-white">
          <h2 className="font-display text-[1.65rem] font-bold tracking-tight sm:text-4xl">
            Property type choose karo
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] text-[#FFF8E7]/70">
            Message me property, service aur location fill ho jayegi. Preferred
            date aap WhatsApp par likh dena.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {DIWALI_PROPERTIES.map((option) => (
              <Choice
                key={option}
                active={property === option}
                onClick={() => setProperty(option)}
              >
                {option}
              </Choice>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold text-[#FDE245]">Service</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DIWALI_SERVICES.map((item) => (
              <Choice
                key={item.slug}
                active={service === item.title}
                onClick={() => {
                  setService(item.title);
                  trackCta({
                    event: "diwali_service_selected",
                    label: item.title,
                    href: DIWALI_CAMPAIGN.path,
                  });
                }}
              >
                {item.title}
              </Choice>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold text-[#FDE245]">Location</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {LOCATIONS.map((option) => (
              <Choice
                key={option}
                active={location === option}
                onClick={() => setLocation(option)}
              >
                {option}
              </Choice>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppCta
              href={bookingHref}
              event="diwali_booking_started"
              label="Diwali booking from selector"
              className="w-full sm:w-auto"
            >
              Diwali Lighting Book Karein
            </WhatsAppCta>
            <CallCta
              event="diwali_call_clicked"
              label="Diwali landing call"
              className="w-full sm:w-auto"
            />
          </div>
        </Section>

        <Section className="bg-white">
          <h2 className="section-title">Booking kaise hoti hai</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {DIWALI_STEPS.map((step) => (
              <li
                key={step.step}
                className="rounded-2xl border border-navy-100 bg-[#FFF8E7] p-5"
              >
                <p className="text-xs font-bold tracking-[0.16em] text-[#F28C38]">
                  {step.step}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#07182C]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section className="bg-[#FFF8E7]">
          <h2 className="section-title">Installation gallery</h2>
          <p className="section-copy">
            Yeh campaign illustrations hain, completed customer projects nahi.
            Team job photos add honge jab genuine assets ready honge.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {GALLERY_SCENES.map((variant) => (
              <FestiveHomeVisual key={variant} variant={variant} />
            ))}
          </div>
        </Section>

        <Section className="bg-white">
          <h2 className="section-title">Pricing seedha, bina invented discount</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-navy-100 p-5">
              <h3 className="font-display text-lg font-semibold">Labour</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Decorative lighting labour existing Light Installation rate se
                start ho sakta hai ({DIWALI_LIGHT_LABOUR}). Extra electrical
                point existing Wiring rate se ({DIWALI_POINT_LABOUR}). Final
                labour visit / scope par depend karta hai.
              </p>
            </div>
            <div className="rounded-2xl border border-navy-100 p-5">
              <h3 className="font-display text-lg font-semibold">Material</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Jhalar, fairy lights, LED strips aur decorative material usually
                alag. Customer ke lights lagwa sakte hain, ya material estimate
                alag se batate hain. Festival discount claim nahi karte.
              </p>
            </div>
          </div>
        </Section>

        <Section className="bg-[#07182C] text-white">
          <h2 className="font-display text-[1.65rem] font-bold">Coverage</h2>
          <p className="mt-3 max-w-2xl text-[#FFF8E7]/70">
            Primary geography equally: Kanpur • Shuklaganj • Unnao. Nearby
            localities bhi, availability electrician aur distance par depend
            karti hai.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {PRIMARY_AREAS.slice(0, 9).map((area) => (
              <li
                key={area}
                className="rounded-full border border-[#F4B942]/30 px-3 py-1.5 text-sm text-[#FFF8E7]/80"
              >
                {area}
              </li>
            ))}
          </ul>
        </Section>

        <Section className="bg-white">
          <h2 className="section-title">Safety pehle</h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-navy-700">
            <li>Sparking / burning smell ho to lights touch na karein.</li>
            <li>Zyada decoration load ke liye extra point ya inspection recommend.</li>
            <li>DIY festival wiring se short / trip ho sakta hai.</li>
            <li>Availability confirm karke aate hain — guaranteed same-day nahi.</li>
          </ul>
        </Section>

        <Section className="bg-[#FFF8E7]">
          <h2 className="section-title">Diwali lighting FAQ</h2>
          <Accordion type="single" collapsible className="mt-8 max-w-3xl">
            {DIWALI_FAQS.map((item, index) => (
              <AccordionItem key={item.q} value={`diwali-faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-navy-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <section className="section-pad bg-[#07182C] text-white">
          <div className="page-wrap max-w-3xl text-center">
            <h2 className="font-display text-[1.85rem] font-extrabold sm:text-5xl">
              Is Diwali lighting pending hai?
              <span className="mt-2 block text-[#FDE245]">Bhai ko bulao.</span>
            </h2>
            <p className="mt-4 text-lg text-[#FFF8E7]/65">
              Kanpur • Shuklaganj • Unnao
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <WhatsAppCta
                href={bookingHref}
                event="diwali_booking_started"
                label="Diwali final book"
                className="w-full sm:w-auto"
              >
                Diwali Lighting Book Karein
              </WhatsAppCta>
              <CallCta
                event="diwali_call_clicked"
                label="Diwali final call"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
