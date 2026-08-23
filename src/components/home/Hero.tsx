import { Home, ShieldCheck, Sparkles, Wallet } from "lucide-react";

import { AppointmentForm } from "@/components/home/AppointmentForm";
import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";

const CHIPS = [
  { icon: Sparkles, label: "Local Electricians" },
  { icon: Wallet, label: "Clear Pricing" },
  { icon: ShieldCheck, label: "Quote Before Work" },
  { icon: Home, label: "Doorstep Service" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yellow/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-yellow/5 blur-3xl" />

      <div className="page-wrap relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex rounded-full border border-yellow/25 bg-yellow/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow">
            Kanpur • Shuklaganj • Unnao
          </p>
          <h1 className="font-display text-[2.15rem] font-extrabold leading-[1.06] tracking-tight sm:text-6xl">
            Bijli ka kaam?
            <span className="mt-1 block text-yellow">Bhai ko bulao.</span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-lg">
            Switch, fan, MCB, wiring, inverter aur electrical repair ke liye
            trusted local electrician service across Kanpur, Shuklaganj & Unnao.
          </p>
          <p className="mt-3 text-sm font-medium text-white/80">
            Clear pricing • Quick response • Doorstep service
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {CHIPS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
              >
                <Icon className="h-3.5 w-3.5 text-yellow" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallCta className="w-full sm:w-auto" />
            <WhatsAppCta className="w-full sm:w-auto" />
          </div>
        </div>

        <div className="animate-fade-up lg:pl-2">
          <div className="mb-4 hidden flex-wrap gap-2 lg:flex">
            {["Fan Installation", "MCB Repair", "Switch & Socket", "Wiring"].map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                >
                  {label}
                </span>
              ),
            )}
          </div>
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
