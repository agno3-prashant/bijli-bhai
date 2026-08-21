export const CALL_NUMBERS = [
  {
    e164: "+919335641377",
    display: "+91 9335641377",
    href: "tel:+919335641377",
  },
  {
    e164: "+919565610183",
    display: "+91 9565610183",
    href: "tel:+919565610183",
  },
] as const;

export const PHONE_E164 = CALL_NUMBERS[0].e164;
export const PHONE_DISPLAY = CALL_NUMBERS[0].display;
export const CALL_HREF = CALL_NUMBERS[0].href;

export const EMAIL = "support.bijlibhai@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const WHATSAPP_NUMBER = "919565610183";
export const WHATSAPP_DISPLAY = "+91 9565610183";

export const DEFAULT_WHATSAPP_TEXT =
  "Namaste BijliBhai, mujhe electrician service chahiye.";

export function whatsappHref(text: string = DEFAULT_WHATSAPP_TEXT) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const DEFAULT_WHATSAPP_HREF = whatsappHref();

export const EMERGENCY_WHATSAPP_HREF = whatsappHref(
  "Namaste BijliBhai, mujhe urgent electrical issue ke liye electrician chahiye.",
);

export const PARTNER_WHATSAPP_HREF = whatsappHref(
  "Namaste BijliBhai, main electrician hoon aur BijliBhai ke saath partner banna chahta hoon.",
);

export const PRICE_WHATSAPP_HREF = whatsappHref(
  "Namaste BijliBhai, mujhe electrician service ki price puchhni hai.",
);

export const AREA_WHATSAPP_HREF = whatsappHref(
  "Namaste BijliBhai, kya aap Kanpur / Shuklaganj / Unnao / mere nearby area me electrician service dete hain? Area confirm karna hai.",
);

export type CtaEvent =
  | "call_clicked"
  | "whatsapp_clicked"
  | "service_clicked"
  | "partner_clicked";

type TrackPayload = {
  event: CtaEvent;
  label?: string;
  href?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackCta({ event, label, href }: TrackPayload) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("bijlibhai:cta", { detail: { event, label, href } }),
  );

  window.dataLayer?.push({ event, label, href });
  window.gtag?.("event", event, { event_label: label, href });
}
