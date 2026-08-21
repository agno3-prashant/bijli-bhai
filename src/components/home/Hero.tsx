import { MapPin, ShieldCheck, Sparkles, Timer } from "lucide-react";

import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";

const CHIPS = [
  { icon: MapPin, label: "Local Electricians" },
  { icon: ShieldCheck, label: "Clear Pricing" },
  { icon: Timer, label: "Quick Response" },
  { icon: Sparkles, label: "Kanpur, Shuklaganj & Unnao" },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-6 rounded-[2rem] bg-yellow/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-navy-900 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M28 0H0V28" fill="none" stroke="rgba(255,214,0,0.12)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative flex min-h-[280px] flex-col items-center justify-center gap-6 px-6 py-10 sm:min-h-[340px]">
          <div className="relative">
            <span className="absolute inset-0 animate-glow rounded-full bg-yellow/30 blur-2xl" />
            <svg
              viewBox="0 0 160 160"
              className="relative h-32 w-32 sm:h-40 sm:w-40"
              aria-hidden
            >
              <circle cx="80" cy="80" r="72" fill="#0A1828" stroke="rgba(255,214,0,0.35)" strokeWidth="2" />
              <path
                d="M92 28 48 86h28l-8 46 52-68H92l8-36z"
                fill="#FFD600"
              />
            </svg>
          </div>
          <p className="text-center font-display text-lg font-semibold text-white">
            Doorstep electrician
            <span className="block text-sm font-medium text-white/60">
              Kanpur, Shuklaganj & Unnao. Price pehle clear.
            </span>
          </p>
          <div className="grid w-full grid-cols-2 gap-2 text-left">
            {[
              ["Switch", "₹99 se"],
              ["Fan", "₹199 se"],
              ["MCB", "₹199 se"],
              ["Wiring", "₹499 se"],
            ].map(([name, price]) => (
              <div
                key={name}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <p className="text-xs text-white/55">{name}</p>
                <p className="text-sm font-semibold text-yellow">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-yellow/5 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:py-20">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow">
            Serving Kanpur, Shuklaganj & Unnao
          </p>
          <h1 className="font-display text-[2.15rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Bijli ka kaam?
            <span className="mt-1 block text-yellow">Bhai ko bulao.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Trusted local electricians for Kanpur, Shuklaganj, Unnao aur nearby areas.
          </p>
          <p className="mt-3 max-w-xl text-sm font-medium text-white/90 sm:text-base">
            Switch, fan, MCB, wiring, inverter aur electrical repair ke liye
            fast local doorstep service.
          </p>
          <p className="mt-3 max-w-xl text-sm font-medium text-white/90 sm:text-base">
            Clear labour pricing. Kaam shuru hone se pehle price clear.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CallCta className="w-full sm:w-auto" />
            <WhatsAppCta className="w-full sm:w-auto" />
          </div>
          <ul className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CHIPS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-yellow" />
                {label}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/50">
            Kanpur, Shuklaganj (Rishi Nagar, Subhash Nagar, Kanchan Nagar) aur Unnao
          </p>
        </div>
        <div className="animate-fade-up lg:pl-6">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
