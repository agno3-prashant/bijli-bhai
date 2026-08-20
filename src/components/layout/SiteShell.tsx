import type { ReactNode } from "react";

import { FloatingActions } from "@/components/layout/FloatingActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-ink">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
