import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { WhatsAppGlyph } from "@/components/cta/CtaLinks";
import { NAV_LINKS } from "@/data/site";
import {
  CALL_NUMBERS,
  DEFAULT_WHATSAPP_HREF,
  EMAIL,
  EMAIL_HREF,
  WHATSAPP_DISPLAY,
  trackCta,
} from "@/lib/contact";

const FOOTER_LINKS = [
  ...NAV_LINKS.filter((link) =>
    ["Services", "How It Works", "FAQ", "Contact"].includes(link.label),
  ),
  { href: "/#coverage", label: "Kanpur" },
  { href: "/electrician-shuklaganj", label: "Shuklaganj" },
  { href: "/electrician-unnao", label: "Unnao" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 pb-24 text-white md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Bijli ka kaam? Bhai ko bulao.
          </p>
          <p className="mt-2 max-w-sm text-sm text-white/55">
            Local electrician service for Kanpur, Shuklaganj, Unnao aur nearby
            areas.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-yellow">
            Links
          </h2>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-white/75 transition hover:text-yellow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="footer-contact">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-yellow">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {CALL_NUMBERS.map((number) => (
              <li key={number.href}>
                <a
                  href={number.href}
                  className="inline-flex items-center gap-2 hover:text-yellow"
                  onClick={() =>
                    trackCta({
                      event: "call_clicked",
                      label: `Footer call ${number.display}`,
                      href: number.href,
                    })
                  }
                >
                  <Phone className="h-4 w-4 text-yellow" />
                  {number.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={DEFAULT_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-yellow"
                onClick={() =>
                  trackCta({
                    event: "whatsapp_clicked",
                    label: "Footer WhatsApp",
                    href: DEFAULT_WHATSAPP_HREF,
                  })
                }
              >
                <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" />
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={EMAIL_HREF}
                className="inline-flex items-center gap-2 hover:text-yellow"
              >
                <Mail className="h-4 w-4 text-yellow" />
                {EMAIL}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-yellow" />
              Kanpur, Shuklaganj & Unnao, Uttar Pradesh
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} BijliBhai. Electrician service in Kanpur,
        Shuklaganj & Unnao.
      </div>
    </footer>
  );
}
