import { whatsappHref } from "@/lib/contact";

export function diwaliBookingMessage({
  property = "",
  service = "",
  location = "",
}: {
  property?: string;
  service?: string;
  location?: string;
}) {
  return `Namaste BijliBhai! Mujhe Diwali lighting installation karwani hai.

Property: ${property}
Service: ${service}
Location: ${location}
Preferred Date:
Please share availability and estimated charges.`;
}

export function diwaliWhatsAppHref(details?: {
  property?: string;
  service?: string;
  location?: string;
}) {
  return whatsappHref(diwaliBookingMessage(details ?? {}));
}
