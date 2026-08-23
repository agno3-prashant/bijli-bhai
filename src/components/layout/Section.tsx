import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("section-pad", className)}>
      <div className="page-wrap">{children}</div>
    </section>
  );
}
