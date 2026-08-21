import { whatsappHref } from "@/lib/contact";

export const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#why", label: "Why BijliBhai" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    slug: "switch-socket",
    title: "Switch & Socket",
    price: "Starting ₹99",
    description: "Faulty switch, loose socket ya new board fitting.",
    message:
      "Namaste BijliBhai, mujhe switch aur socket ki electrician service chahiye.",
  },
  {
    slug: "fan",
    title: "Fan Installation & Repair",
    price: "Starting ₹199",
    description: "Ceiling fan lagwana, wobble, regulator ya servicing.",
    message:
      "Namaste BijliBhai, mujhe fan installation ya repair ke liye electrician chahiye.",
  },
  {
    slug: "light",
    title: "Light Installation",
    price: "Starting ₹149",
    description: "Bulb, tube, panel light aur fitting ka kaam.",
    message:
      "Namaste BijliBhai, mujhe light installation ke liye electrician chahiye.",
  },
  {
    slug: "mcb-db",
    title: "MCB / Fuse / DB",
    price: "Starting ₹199",
    description: "Trip ho rahi MCB, fuse change, DB check.",
    message:
      "Namaste BijliBhai, mujhe MCB, fuse ya DB ke liye electrician chahiye.",
  },
  {
    slug: "wiring",
    title: "Wiring & New Points",
    price: "Starting ₹499",
    description: "Naya power point, concealed wiring ya extra load.",
    message:
      "Namaste BijliBhai, mujhe wiring ya naya power point banana hai.",
  },
  {
    slug: "inverter",
    title: "Inverter",
    price: "Starting ₹299",
    description: "Inverter connection, wiring check aur setup help.",
    message:
      "Namaste BijliBhai, inverter connect ya check karwana hai.",
  },
  {
    slug: "inspection",
    title: "Electrical Inspection",
    price: "Visit from ₹199",
    description: "Safety check, diagnosis aur expected cost clear karna.",
    message:
      "Namaste BijliBhai, electrical inspection ke liye electrician chahiye.",
  },
  {
    slug: "emergency",
    title: "Emergency Electrical Help",
    price: "Visit from ₹399",
    description: "Sparking, burning smell, sudden power issue.",
    message:
      "Namaste BijliBhai, mujhe urgent electrical issue ke liye electrician chahiye.",
  },
] as const;

export const PROBLEMS = [
  {
    title: "MCB baar-baar trip ho rahi hai?",
    href: whatsappHref(
      "Namaste BijliBhai, meri MCB baar-baar trip ho rahi hai. Mujhe electrician service chahiye.",
    ),
  },
  {
    title: "Fan install karwana hai?",
    href: whatsappHref(
      "Namaste BijliBhai, mujhe fan install karwana hai. Electrician service chahiye.",
    ),
  },
  {
    title: "Switch kaam nahi kar raha?",
    href: whatsappHref(
      "Namaste BijliBhai, mera switch kaam nahi kar raha. Mujhe electrician service chahiye.",
    ),
  },
  {
    title: "Light fitting chahiye?",
    href: whatsappHref(
      "Namaste BijliBhai, mujhe light fitting chahiye. Electrician service chahiye.",
    ),
  },
  {
    title: "Short circuit ka doubt hai?",
    href: whatsappHref(
      "Namaste BijliBhai, short circuit ka doubt hai. Mujhe electrician service chahiye.",
    ),
  },
  {
    title: "Naya power point banana hai?",
    href: whatsappHref(
      "Namaste BijliBhai, naya power point banana hai. Mujhe electrician service chahiye.",
    ),
  },
  {
    title: "Inverter connect karwana hai?",
    href: whatsappHref(
      "Namaste BijliBhai, inverter connect karwana hai. Mujhe electrician service chahiye.",
    ),
  },
  {
    title: "Wiring issue hai?",
    href: whatsappHref(
      "Namaste BijliBhai, wiring issue hai. Mujhe electrician service chahiye.",
    ),
  },
] as const;

export const STEPS = [
  {
    step: "01",
    title: "Call ya WhatsApp karein",
    text: "Apni electrical problem batayein.",
  },
  {
    step: "02",
    title: "Electrician assign hoga",
    text: "Available local electrician aapke area ke liye coordinate kiya jayega.",
  },
  {
    step: "03",
    title: "Price clear karke kaam hoga",
    text: "Kaam shuru hone se pehle labour aur expected cost clear ki jayegi.",
  },
] as const;

export const TRUST_POINTS = [
  {
    title: "Clear Pricing",
    text: "Labour charges pehle se clear rakhne ki koshish.",
  },
  {
    title: "Local Electricians",
    text: "Kanpur, Shuklaganj aur Unnao ke local electrical professionals.",
  },
  {
    title: "Quick Response",
    text: "Call aur WhatsApp ke through fast coordination.",
  },
  {
    title: "Wide Service Coverage",
    text: "Switch se wiring aur inverter tak.",
  },
  {
    title: "Doorstep Service",
    text: "Electrician directly aapke location par.",
  },
  {
    title: "Human Support",
    text: "Direct phone aur WhatsApp support.",
  },
] as const;

export const PRICE_EXAMPLES = [
  { label: "Inspection", value: "₹199 se" },
  { label: "Switch replacement", value: "₹99 se" },
  { label: "Fan installation", value: "₹199 se" },
  { label: "MCB work", value: "₹199 se" },
  { label: "New electrical point", value: "₹499 se" },
  { label: "Emergency visit", value: "₹399 se" },
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
] as const;
