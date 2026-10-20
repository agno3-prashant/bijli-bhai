const START = import.meta.env.VITE_DIWALI_CAMPAIGN_START ?? "2026-10-01";
const END = import.meta.env.VITE_DIWALI_CAMPAIGN_END ?? "2026-11-20";

function parseFlag(value: string | undefined) {
  if (value === undefined || value === "") return null;
  const normalized = value.trim().toLowerCase();
  if (["false", "0", "off", "no"].includes(normalized)) return false;
  if (["true", "1", "on", "yes"].includes(normalized)) return true;
  return null;
}

function inDateWindow(now = new Date()) {
  const start = new Date(`${START}T00:00:00+05:30`);
  const end = new Date(`${END}T23:59:59+05:30`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return true;
  return now >= start && now <= end;
}

export function isDiwaliCampaignEnabled(now = new Date()) {
  const explicit = parseFlag(import.meta.env.VITE_DIWALI_CAMPAIGN_ENABLED);
  if (explicit === false) return false;
  if (explicit === true) return true;
  return inDateWindow(now);
}

export const DIWALI_CAMPAIGN = {
  path: "/diwali-lighting",
  title: "Diwali Lighting Installation in Kanpur, Shuklaganj & Unnao | BijliBhai",
  description:
    "Diwali jhalar, fairy lights, balcony lighting aur decorative light installation ke liye BijliBhai se contact karein. Serving Kanpur, Shuklaganj & Unnao.",
  start: START,
  end: END,
} as const;
