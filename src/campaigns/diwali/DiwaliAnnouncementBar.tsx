import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

import { DIWALI_CAMPAIGN } from "@/campaigns/diwali/config";
import { trackCta } from "@/lib/contact";

const DISMISS_KEY = "bijlibhai_diwali_bar_dismissed_2026";

export function DiwaliAnnouncementBar() {
  const [hidden, setHidden] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  });

  if (hidden) return null;

  function onBook() {
    trackCta({
      event: "diwali_banner_clicked",
      label: "Book Decoration",
      href: DIWALI_CAMPAIGN.path,
    });
  }

  return (
    <div className="diwali-campaign relative z-[60] bg-[#07182C] text-[#FFF8E7]">
      <div className="diwali-sparkle pointer-events-none absolute inset-0" aria-hidden />
      <div className="page-wrap relative flex min-h-11 items-center justify-between gap-2 py-2">
        <Link
          to={DIWALI_CAMPAIGN.path}
          onClick={onBook}
          className="min-w-0 flex-1 truncate text-sm font-semibold hover:text-[#FDE245] lg:hidden"
        >
          ✨ Diwali Lighting Bookings Open! →
        </Link>
        <p className="hidden min-w-0 flex-1 text-sm font-semibold lg:block">
          🪔 Diwali Lighting Bookings Open! Ghar, balcony aur dukaan ki lighting
          ke liye BijliBhai bulao.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={DIWALI_CAMPAIGN.path}
            onClick={onBook}
            className="hidden min-h-8 items-center rounded-full bg-[#FDE245] px-3 text-sm font-bold text-[#07182C] lg:inline-flex"
          >
            Book Decoration →
          </Link>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#FFF8E7]/70 hover:bg-white/10 hover:text-white"
            aria-label="Dismiss Diwali announcement"
            onClick={() => {
              sessionStorage.setItem(DISMISS_KEY, "1");
              setHidden(true);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
