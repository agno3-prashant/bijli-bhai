import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { CallCta } from "@/components/cta/CtaLinks";
import { SiteShell } from "@/components/layout/SiteShell";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-navy-500">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">
          Page nahi mili
        </h1>
        <p className="mt-3 text-navy-600">
          Yeh link available nahi hai. Home par wapas jayein ya electrician ke
          liye call karein.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-navy-950 px-5 font-semibold text-white"
          >
            BijliBhai Home
          </Link>
          <CallCta />
        </div>
      </div>
    </SiteShell>
  );
};

export default NotFound;
