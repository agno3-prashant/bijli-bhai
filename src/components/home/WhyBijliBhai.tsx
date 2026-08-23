import {
  CircleDollarSign,
  Clock,
  Home,
  MapPin,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { TRUST_POINTS } from "@/data/site";

const ICONS: LucideIcon[] = [
  CircleDollarSign,
  MapPin,
  Clock,
  Home,
  Wrench,
  Users,
];

export function WhyBijliBhai() {
  return (
    <Section id="why" className="bg-canvas">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-navy-600">
          Why BijliBhai
        </p>
        <h2 className="section-title mt-2">
          Local electrician service, ab thoda smarter.
        </h2>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRUST_POINTS.map((point, index) => {
          const Icon = ICONS[index];
          return (
            <article
              key={point.title}
              className="surface-card bg-mist p-6 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 text-yellow">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-[1.15rem] font-semibold text-ink">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {point.text}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
