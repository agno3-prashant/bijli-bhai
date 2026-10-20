import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { getProblems } from "@/data/site";
import { trackCta } from "@/lib/contact";

export function Problems() {
  return (
    <Section className="bg-canvas">
      <h2 className="section-title">Aapki problem kya hai?</h2>
      <p className="section-copy">
        Problem select karein. WhatsApp par pehle se typed message khul jayega.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {getProblems().map((problem) => (
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
            className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-navy-100 bg-white px-4 py-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-yellow hover:shadow-card-hover"
          >
            <span className="text-base font-semibold text-ink">
              {problem.title}
            </span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-navy-500 group-hover:text-navy-950"
              aria-hidden
            />
          </a>
        ))}
      </div>
    </Section>
  );
}
