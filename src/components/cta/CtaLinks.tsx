import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Phone } from "lucide-react";

import {
  CALL_HREF,
  DEFAULT_WHATSAPP_HREF,
  trackCta,
  type CtaEvent,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5 shrink-0", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.04 2.05c-5.46 0-9.9 4.43-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.37a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01a9.82 9.82 0 0 0-7.01-2.89Zm0 18.07h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.81.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.53 3.69-8.21 8.22-8.21 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.24-8.21 8.24Zm4.5-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.19 3.7.59.25 1.04.41 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.67-1.17.21-.58.21-1.07.14-1.17-.06-.11-.23-.16-.48-.29Z" />
    </svg>
  );
}

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: CtaEvent;
  label: string;
  children: ReactNode;
};

export function TrackedLink({
  href,
  event,
  label,
  className,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        trackCta({ event, label, href });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

const yellowCta =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow px-5 text-base font-semibold text-navy-950 shadow-[0_8px_24px_rgba(255,214,0,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-[0_10px_28px_rgba(255,214,0,0.38)] active:translate-y-0";

const navyCta =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy-950 px-5 text-base font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-navy-800 active:translate-y-0";

const outlineCta =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-base font-semibold text-white transition duration-200 hover:border-yellow/70 hover:bg-white/10";

const whatsappCta =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#20bd5a] active:translate-y-0";

export function CallCta({
  className,
  label = "Electrician Bulayein",
  children = "Electrician Bulayein",
}: {
  className?: string;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <TrackedLink
      href={CALL_HREF}
      event={label.toLowerCase().includes("partner") ? "partner_clicked" : "call_clicked"}
      label={label}
      className={cn(yellowCta, className)}
    >
      <Phone className="h-4 w-4" aria-hidden />
      {children}
    </TrackedLink>
  );
}

export function WhatsAppCta({
  href = DEFAULT_WHATSAPP_HREF,
  className,
  label = "WhatsApp Karein",
  children = "WhatsApp Karein",
  event = "whatsapp_clicked",
}: {
  href?: string;
  className?: string;
  label?: string;
  children?: ReactNode;
  event?: CtaEvent;
}) {
  return (
    <TrackedLink
      href={href}
      event={event}
      label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(whatsappCta, className)}
    >
      <WhatsAppGlyph />
      {children}
    </TrackedLink>
  );
}

export function OutlineCta({
  href,
  className,
  label,
  children,
  event = "whatsapp_clicked",
}: {
  href: string;
  className?: string;
  label: string;
  children: ReactNode;
  event?: CtaEvent;
}) {
  return (
    <TrackedLink
      href={href}
      event={event}
      label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(outlineCta, className)}
    >
      {children}
    </TrackedLink>
  );
}

export function NavyCta({
  href,
  className,
  label,
  children,
  event = "call_clicked",
}: {
  href: string;
  className?: string;
  label: string;
  children: ReactNode;
  event?: CtaEvent;
}) {
  return (
    <TrackedLink
      href={href}
      event={event}
      label={label}
      className={cn(navyCta, className)}
    >
      {children}
    </TrackedLink>
  );
}
