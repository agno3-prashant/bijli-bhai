import type { ReactNode } from "react";

import { DiwaliAnnouncementBar } from "@/campaigns/diwali/DiwaliAnnouncementBar";
import { isDiwaliCampaignEnabled } from "@/campaigns/diwali/config";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function SiteShell({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      {compact || !isDiwaliCampaignEnabled() ? null : <DiwaliAnnouncementBar />}
      <SiteHeader compact={compact} />
      <main>{children}</main>
      <SiteFooter compact={compact} />
      {compact ? null : <FloatingActions />}
    </div>
  );
}
