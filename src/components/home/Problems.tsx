import { ArrowUpRight } from "lucide-react";

import { PROBLEMS } from "@/data/site";
import { trackCta } from "@/lib/contact";

export function Problems() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Aapki problem kya hai?
        </h2>
        <p className="mt-3 max-w-2xl text-navy-600">
          Problem select karein. WhatsApp par pehle se typed message khul jayega.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROBLEMS.map((problem) => (
            <a
              key={problem.title}
              href={problem.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackCta({
                  event: "whatsapp_clicked",
                  label: problem.title,
                  href: problem.href,
                })
              }
              className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-navy-100 bg-mist px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-yellow hover:bg-yellow/10"
            >
              <span className="text-base font-semibold text-ink">
                {problem.title}
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-navy-500 group-hover:text-navy-950" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
