import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Coverage } from "@/components/home/Coverage";
import { Emergency } from "@/components/home/Emergency";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Partner } from "@/components/home/Partner";
import { Pricing } from "@/components/home/Pricing";
import { Problems } from "@/components/home/Problems";
import { Services } from "@/components/home/Services";
import { WhyBijliBhai } from "@/components/home/WhyBijliBhai";
import { SiteShell } from "@/components/layout/SiteShell";

function useHashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash, pathname]);
}

const Index = () => {
  useHashScroll();

  return (
    <SiteShell>
      <Hero />
      <Services />
      <Problems />
      <HowItWorks />
      <WhyBijliBhai />
      <Pricing />
      <Coverage />
      <Emergency />
      <Partner />
      <Faq />
      <FinalCta />
    </SiteShell>
  );
};

export default Index;
