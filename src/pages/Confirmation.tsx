import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock3, MapPin, Phone } from "lucide-react";

import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { SiteShell } from "@/components/layout/SiteShell";
import { CALL_NUMBERS } from "@/lib/contact";

const NEXT_STEPS = [
  {
    icon: Phone,
    title: "Bhai call karega",
    text: "Jaldi aapke number par call ya WhatsApp aayega.",
  },
  {
    icon: MapPin,
    title: "Area confirm hoga",
    text: "Kanpur, Shuklaganj ya Unnao — location clear karenge.",
  },
  {
    icon: Clock3,
    title: "Price pehle clear",
    text: "Visit se pehle labour aur expected cost bata denge.",
  },
] as const;

const Confirmation = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    const robots = document.querySelector('meta[name="robots"]');
    const previousRobots = robots?.getAttribute("content") ?? "";

    document.title = "Appointment confirmed | BijliBhai";
    meta?.setAttribute(
      "content",
      "Aapka BijliBhai appointment request confirm ho gaya hai. Hum jaldi call ya WhatsApp par aapse contact karenge.",
    );
    if (robots) {
      robots.setAttribute("content", "noindex,follow");
    }

    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
      if (robots) robots.setAttribute("content", previousRobots);
    };
  }, []);

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-yellow/5 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 pb-28 pt-14 text-center sm:px-6 sm:pb-32 sm:pt-20">
          <div className="relative mx-auto mb-6 h-24 w-24">
            <span className="absolute inset-0 animate-glow rounded-full bg-yellow/35 blur-2xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-yellow/40 bg-navy-900 shadow-[0_16px_50px_rgba(255,214,0,0.22)]">
              <CheckCircle2 className="h-12 w-12 text-yellow" strokeWidth={1.75} />
            </div>
          </div>
          <p className="inline-flex rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow">
            Appointment confirmed
          </p>
          <h1 className="mt-5 font-display text-[2.15rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Request aa gayi.
            <span className="mt-1 block text-yellow">Bhai contact karega.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            Aapka electrician appointment confirm ho gaya hai. Team jaldi call
            ya WhatsApp par area, time aur expected labour price clear karegi.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CallCta className="w-full sm:w-auto" />
            <WhatsAppCta className="w-full sm:w-auto" />
          </div>
          <p className="mt-5 text-sm text-white/50">
            Turant baat karni ho? {CALL_NUMBERS.map((n) => n.display).join(" · ")}
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-16 bg-mist pb-16 sm:-mt-20 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-[1.6rem] border border-navy-100 bg-white p-5 shadow-[0_24px_80px_rgba(6,22,42,0.12)] sm:p-8">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-navy-500">
              Ab kya hoga
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {NEXT_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-navy-100 bg-mist px-4 py-5 text-left"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-950 text-yellow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy-500">
                      Step 0{index + 1}
                    </p>
                    <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {step.text}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-center text-sm">
              <Link
                to="/"
                className="font-semibold text-navy-800 underline-offset-4 hover:text-navy-950 hover:underline"
              >
                Home par wapas jayein
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default Confirmation;
