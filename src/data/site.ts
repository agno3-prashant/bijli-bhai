import { serviceWhatsAppMessage, whatsappHref } from "@/lib/contact";

export const NAV_LINKS = [
  { href: "/#diwali", label: "Diwali Lights" },
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
  { href: "/#partner", label: "Partner" },
] as const;

export const SERVICES = [
  {
    slug: "switch-socket",
    title: "Switch & Socket",
    price: "Starting ₹99",
    description: "Faulty switch, loose socket ya new board fitting.",
    message: serviceWhatsAppMessage("Switch & Socket"),
  },
  {
    slug: "fan",
    title: "Fan Installation & Repair",
    price: "Starting ₹199",
    description: "Ceiling fan lagwana, wobble, regulator ya servicing.",
    message: serviceWhatsAppMessage("Fan"),
  },
  {
    slug: "light",
    title: "Light Installation",
    price: "Starting ₹149",
    description: "Bulb, tube, panel light aur fitting ka kaam.",
    message: serviceWhatsAppMessage("Light"),
  },
  {
    slug: "diwali-lights",
    title: "Diwali Jhalar & Lights",
    price: "Starting ₹149",
    description:
      "Jhalar, fairy lights, balcony lights — lagwana, theek karwana ya extra point.",
    message: serviceWhatsAppMessage("Diwali jhalar / decoration lights"),
  },
  {
    slug: "mcb-db",
    title: "MCB / Fuse / DB",
    price: "Starting ₹199",
    description: "Trip ho rahi MCB, fuse change, DB check.",
    message: serviceWhatsAppMessage("MCB / electrical fault"),
  },
  {
    slug: "wiring",
    title: "Wiring & New Points",
    price: "Starting ₹499",
    description: "Naya power point, concealed wiring ya extra load.",
    message: serviceWhatsAppMessage("Wiring"),
  },
  {
    slug: "inverter",
    title: "Inverter",
    price: "Starting ₹299",
    description: "Inverter connection, wiring check aur setup help.",
    message: serviceWhatsAppMessage("Inverter"),
  },
  {
    slug: "inspection",
    title: "Electrical Inspection",
    price: "Visit from ₹199",
    description: "Safety check, diagnosis aur expected cost clear karna.",
    message: serviceWhatsAppMessage("Electrical Inspection"),
  },
  {
    slug: "emergency",
    title: "Emergency Electrical Help",
    price: "Visit from ₹399",
    description: "Sparking, burning smell, sudden power issue.",
    message: serviceWhatsAppMessage("Emergency Electrical Help"),
  },
] as const;

export const PROBLEMS = [
  {
    title: "MCB baar-baar trip ho rahi hai?",
    href: whatsappHref(serviceWhatsAppMessage("MCB / electrical fault")),
  },
  {
    title: "Fan install karwana hai?",
    href: whatsappHref(serviceWhatsAppMessage("Fan")),
  },
  {
    title: "Switch kaam nahi kar raha?",
    href: whatsappHref(serviceWhatsAppMessage("Switch")),
  },
  {
    title: "Light fitting chahiye?",
    href: whatsappHref(serviceWhatsAppMessage("Light")),
  },
  {
    title: "Diwali pe jhalar lagwani hai?",
    href: whatsappHref(serviceWhatsAppMessage("Diwali jhalar / decoration lights")),
  },
  {
    title: "Decoration lights kaam nahi kar rahi?",
    href: whatsappHref(serviceWhatsAppMessage("Diwali light repair")),
  },
  {
    title: "Jhalar ke liye extra point chahiye?",
    href: whatsappHref(serviceWhatsAppMessage("Wiring")),
  },
  {
    title: "Short circuit ka doubt hai?",
    href: whatsappHref(serviceWhatsAppMessage("Emergency Electrical Help")),
  },
  {
    title: "Naya power point banana hai?",
    href: whatsappHref(serviceWhatsAppMessage("Wiring")),
  },
  {
    title: "Inverter connect karwana hai?",
    href: whatsappHref(serviceWhatsAppMessage("Inverter")),
  },
  {
    title: "Wiring issue hai?",
    href: whatsappHref(serviceWhatsAppMessage("Wiring")),
  },
] as const;

export const STEPS = [
  {
    step: "01",
    title: "Call ya WhatsApp karein",
    text: "Problem aur location share karein.",
  },
  {
    step: "02",
    title: "Electrician coordinate hoga",
    text: "Available local electrician request handle karega.",
  },
  {
    step: "03",
    title: "Price clear → kaam start",
    text: "Expected labour/material cost clear hone ke baad kaam proceed karega.",
  },
] as const;

export const TRUST_POINTS = [
  {
    title: "Clear Pricing",
    text: "Expected labour cost pehle clear.",
  },
  {
    title: "Local Electricians",
    text: "Kanpur, Shuklaganj & Unnao coverage.",
  },
  {
    title: "Quick Coordination",
    text: "Direct call aur WhatsApp support.",
  },
  {
    title: "Doorstep Service",
    text: "Electrician customer location par.",
  },
  {
    title: "Wide Service Range",
    text: "Basic fitting se wiring/inverter tak.",
  },
  {
    title: "Human Support",
    text: "Direct communication when required.",
  },
] as const;

export const PRICE_EXAMPLES = [
  { label: "Inspection", value: "₹199 se" },
  { label: "Switch replacement", value: "₹99 se" },
  { label: "Fan installation", value: "₹199 se" },
  { label: "MCB work", value: "₹199 se" },
  { label: "New electrical point", value: "₹499 se" },
  { label: "Emergency visit", value: "₹399 se" },
  { label: "Diwali jhalar / lights", value: "₹149 se" },
] as const;

export const PRIMARY_AREAS = [
  "Kanpur",
  "Shuklaganj",
  "Unnao",
  "Gangaghat",
  "Rishi Nagar",
  "Subhash Nagar",
  "Kanchan Nagar",
  "Shuklaganj nearby residential areas",
  "Unnao city nearby localities",
] as const;

export const EXTENDED_AREAS = [
  "Kakadeo",
  "Kalyanpur",
  "Swaroop Nagar",
  "Kidwai Nagar",
  "Govind Nagar",
  "Barra",
] as const;

export const FAQS = [
  {
    q: "Visit charge kitna hai?",
    a: "Normal inspection/visit approximately ₹199 se start hota hai.",
  },
  {
    q: "Material ka charge alag hota hai?",
    a: "Haan, replacement parts aur material usually labour charge se separate hote hain.",
  },
  {
    q: "Final price kaise pata chalega?",
    a: "Expected labour/material cost kaam start hone se pehle customer ko clear ki jayegi.",
  },
  {
    q: "Kanpur, Shuklaganj aur Unnao me kahan service available hai?",
    a: "Service Kanpur, Shuklaganj, Unnao, Gangaghat aur nearby residential areas jaise Rishi Nagar, Subhash Nagar aur Kanchan Nagar me available hai. Availability electrician aur distance par depend karegi. Exact area call ya WhatsApp par confirm karein.",
  },
  {
    q: "Emergency electrician mil sakta hai?",
    a: "Availability electrician aur time par depend karegi. Call/WhatsApp karke confirm karein.",
  },
  {
    q: "Payment kaise hoga?",
    a: "Initial launch me cash ya direct UPI coordination supported ho sakta hai.",
  },
  {
    q: "Diwali jhalar aur decoration lights bhi lagwa sakte hain?",
    a: "Haan. Jhalar, fairy lights, balcony lights, extra point aur light repair Diwali se pehle coordinate hota hai. Labour Light / Wiring rates se start. Lights/jhalar material usually alag. Expected cost kaam se pehle clear ki jayegi.",
  },
] as const;
