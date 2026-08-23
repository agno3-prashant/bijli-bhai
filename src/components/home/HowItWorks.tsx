import { CheckCircle2, MessageCircle, User } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { STEPS } from "@/data/site";

const ICONS = [MessageCircle, User, CheckCircle2];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-mist">
      <h2 className="section-title">How BijliBhai works</h2>
      <p className="section-copy">
        Booking system is Call + WhatsApp. No app download needed.
      </p>
      <ol className="mt-10 grid gap-6 md:grid-cols-3 md:gap-0">
        {STEPS.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <li key={item.step} className="relative flex gap-4 md:block md:px-6">
              {index < STEPS.length - 1 && (
                <span className="absolute left-[1.4rem] top-12 hidden h-[calc(100%-1.5rem)] w-px bg-navy-200 md:left-auto md:right-0 md:top-7 md:block md:h-px md:w-full" />
              )}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-yellow shadow-glow">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="md:mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                  Step {item.step}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {item.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
