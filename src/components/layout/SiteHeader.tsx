import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { CallCta, TrackedLink } from "@/components/cta/CtaLinks";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/data/site";
import { CALL_HREF } from "@/lib/contact";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.hash, location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-white/10 bg-navy-950/95 backdrop-blur-md"
          : "border-transparent bg-navy-950"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Logo variant="light" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <TrackedLink
            href={CALL_HREF}
            event="call_clicked"
            label="Header call icon"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-yellow text-navy-950 lg:hidden"
            aria-label="Call BijliBhai"
          >
            <Phone className="h-5 w-5" />
          </TrackedLink>

          <CallCta className="hidden min-h-11 px-4 text-sm lg:inline-flex" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-navy-800 bg-navy-950 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-white">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  BijliBhai page sections and call action
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      to={link.href}
                      className="rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8">
                <CallCta className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
