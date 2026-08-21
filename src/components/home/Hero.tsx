import { Link } from "react-router-dom";
import { MapPin, ShieldCheck, Sparkles, Timer } from "lucide-react";

import { AppointmentForm } from "@/components/home/AppointmentForm";
import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";

const CHIPS = [
  { icon: MapPin, label: "Kanpur · Shuklaganj · Unnao" },
  { icon: ShieldCheck, label: "Clear pricing" },
  { icon: Timer, label: "Same-day help" },
  { icon: Sparkles, label: "Local electricians" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yellow/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-yellow/5 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex rounded-full border border-yellow/25 bg-yellow/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow">
            Doorstep electrician · Uttar Pradesh
          </p>
          <h1 className="font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Bijli ka kaam?
            <span className="mt-1 block text-yellow">Bhai ko bulao.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            Switch, fan, MCB, wiring aur inverter — trusted local electricians
            for Kanpur, Shuklaganj and Unnao. Labour price clear before work
            starts.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {CHIPS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
              >
                <Icon className="h-3.5 w-3.5 text-yellow" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallCta className="w-full sm:w-auto" />
            <WhatsAppCta className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 text-sm text-white/45">
            Prefer typing? Use the form — confirmation opens after you book.{" "}
            <Link to="/#book" className="text-yellow hover:underline">
              Jump to booking
            </Link>
          </p>
        </div>

        <div className="animate-fade-up lg:pl-2">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
