import { useEffect } from "react";
import { Link } from "react-router-dom";

import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { SiteShell } from "@/components/layout/SiteShell";
import { PRIMARY_AREAS } from "@/data/site";
import { type SeoPage } from "@/data/seoPages";
import { whatsappHref } from "@/lib/contact";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = title;
    meta?.setAttribute("content", description);
    return () => {
      document.title = previousTitle;
      if (meta) meta.setAttribute("content", previousDescription);
    };
  }, [title, description]);
}

export function SeoLanding({ page }: { page: SeoPage }) {
  usePageMeta(page.title, page.description);
  const message = `Namaste BijliBhai, mujhe ${page.area} me ${page.serviceFocus} chahiye.`;

  return (
    <SiteShell>
      <article className="bg-white">
        <section className="bg-navy-950 py-12 text-white sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-yellow">
              {page.area} · BijliBhai
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              {page.intro}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallCta />
              <WhatsAppCta
                href={whatsappHref(message)}
                label={`${page.area} WhatsApp`}
              />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-ink">
            Local doorstep electrician service
          </h2>
          <p className="mt-3 text-navy-600">
            BijliBhai Kanpur, Shuklaganj aur Unnao me electrician service deta
            hai. Search intent jaise “{page.intent}” ke liye yeh page hai.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {PRIMARY_AREAS.slice(0, 6).map((area) => (
              <li
                key={area}
                className="rounded-full bg-mist px-3 py-1.5 text-sm font-medium text-navy-800"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-navy-600">
            Availability electrician aur distance par depend karegi. Exact area
            call ya WhatsApp par confirm karein.
          </p>
          <p className="mt-8 text-sm">
            <Link to="/" className="font-semibold text-navy-800 hover:text-navy-950">
              Saari services dekhein
            </Link>
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
