import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { SiteShell } from "@/components/layout/SiteShell";
import { CALL_NUMBERS, EMAIL } from "@/lib/contact";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | BijliBhai`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm text-navy-500">
          <Link to="/" className="hover:text-navy-800">
            Home
          </Link>
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-2 text-sm text-navy-500">Last updated: 21 August 2026</p>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-navy-700">
          {children}
        </div>
        <p className="mt-10 text-sm text-navy-600">
          Questions? Call BijliBhai at {CALL_NUMBERS.map((n) => n.display).join(" / ")}{" "}
          or email {EMAIL}.
        </p>
      </article>
    </SiteShell>
  );
}
