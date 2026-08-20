import {
  CircleDollarSign,
  Clock,
  Home,
  MapPin,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { TRUST_POINTS } from "@/data/site";

const ICONS: LucideIcon[] = [
  CircleDollarSign,
  MapPin,
  Clock,
  Wrench,
  Home,
  Users,
];

export function WhyBijliBhai() {
  return (
    <section id="why" className="scroll-mt-24 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-navy-600">
            Why BijliBhai
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Local electrician service, ab thoda smarter.
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_POINTS.map((point, index) => {
            const Icon = ICONS[index];
            return (
              <article
                key={point.title}
                className="rounded-2xl border border-navy-100 bg-mist p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 text-yellow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {point.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
