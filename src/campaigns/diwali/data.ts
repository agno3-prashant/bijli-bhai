import { PRICE_EXAMPLES, SERVICES } from "@/data/site";

export const DIWALI_LIGHT_LABOUR =
  SERVICES.find((item) => item.slug === "light")?.price ?? "Starting ₹149";

export const DIWALI_POINT_LABOUR =
  PRICE_EXAMPLES.find((item) => item.label === "New electrical point")?.value ??
  "₹499 se";

const lightLabour = DIWALI_LIGHT_LABOUR;
const pointLabour = DIWALI_POINT_LABOUR;

export const DIWALI_SERVICES = [
  {
    slug: "jhalar",
    title: "Jhalar Installation",
    text: "Ghar, gate, terrace par jhalar seedha aur safe.",
    cta: "Get Estimate",
    rate: `Labour ${lightLabour}`,
    catalogue: "light",
  },
  {
    slug: "fairy-lights",
    title: "Fairy Lights Setup",
    text: "Warm fairy lights balcony, railing aur room ke liye.",
    cta: "Get Estimate",
    rate: `Labour ${lightLabour}`,
    catalogue: "light",
  },
  {
    slug: "balcony",
    title: "Balcony Lighting",
    text: "Apartment / balcony decorative lighting.",
    cta: "Get Estimate",
    rate: "Quote Required",
    catalogue: "light",
  },
  {
    slug: "led-strip",
    title: "LED Strip Installation",
    text: "LED strip, cove ya accent lighting.",
    cta: "Get Estimate",
    rate: "Quote Required",
    catalogue: "light",
  },
  {
    slug: "shopfront",
    title: "Shopfront Decoration",
    text: "Dukaan / shutter front festive lighting.",
    cta: "Quote Required",
    rate: "Quote Required",
    catalogue: "light",
  },
  {
    slug: "outdoor",
    title: "Outdoor Decorative Lighting",
    text: "Outdoor / garden decorative lights.",
    cta: "Quote Required",
    rate: "Quote Required",
    catalogue: "light",
  },
  {
    slug: "extra-point",
    title: "Extra Electrical Point",
    text: "Decoration load ke liye naya point. Material alag.",
    cta: "Book",
    rate: `Labour ${pointLabour}`,
    catalogue: "wiring",
  },
  {
    slug: "complete-setup",
    title: "Complete Decorative Lighting Setup",
    text: "Poora ghar / shop festive lighting plan + install.",
    cta: "Quote Required",
    rate: "Quote Required",
    catalogue: "inspection",
  },
] as const;

export const DIWALI_PROPERTIES = [
  "Home",
  "Shop",
  "Office",
  "Apartment/Balcony",
] as const;

export const DIWALI_STEPS = [
  {
    step: "01",
    title: "Service aur property batao",
    text: "Jhalar, balcony, shopfront — jo chahiye select karo.",
  },
  {
    step: "02",
    title: "Call ya WhatsApp",
    text: "Location aur preferred date share karo. Availability confirm hogi.",
  },
  {
    step: "03",
    title: "Labour clear, phir kaam",
    text: "Expected labour pehle. Lights/jhalar material alag ho sakta hai.",
  },
] as const;

export const DIWALI_FAQS = [
  {
    q: "Lights/jhalar BijliBhai laayega?",
    a: "Labour installation ke liye hai. Decorative lights / jhalar material usually customer ke ya alag charge. Expected cost kaam se pehle clear hota hai.",
  },
  {
    q: "Exact price WhatsApp pe mil jayegi?",
    a: "Area, property aur kaam dekh ke estimate share hota hai. Koi guaranteed discount ya fixed festival package nahi dikhate.",
  },
  {
    q: "Kanpur, Shuklaganj, Unnao — teeno jagah?",
    a: "Haan, teenon primary markets. Exact availability electrician aur distance par depend karti hai.",
  },
  {
    q: "Sparking / overload ho to?",
    a: "Lights touch na karein. Extra load ke liye point / inspection recommend karte hain. DIY festival wiring mat karo.",
  },
] as const;
