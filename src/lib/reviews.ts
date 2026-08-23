import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export const REVIEW_SERVICES = [
  "Switch & Socket",
  "Fan",
  "Light",
  "MCB / Fuse / DB",
  "Wiring",
  "Inverter",
  "Inspection",
  "Emergency",
  "Other",
] as const;

export const FEEDBACK_TAGS = [
  "Professional Behaviour",
  "Time Par Aaye",
  "Price Clear Tha",
  "Problem Solve Hui",
  "Good Work",
  "Recommended",
] as const;

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export type PublicReview = {
  id: string;
  customer_name: string;
  locality: string;
  service: string;
  rating: number;
  review_text: string;
  created_at: string;
};

export type ReviewDraft = {
  customer_name: string;
  mobile: string;
  locality: string;
  service: string;
  rating: number;
  review_text: string;
  electrician_name?: string;
  feedback_tags: string[];
};

const LOCAL_KEY = "bijlibhai_pending_reviews";

export async function listApprovedReviews(): Promise<PublicReview[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("id, customer_name, locality, service, rating, review_text, created_at")
    .eq("status", "APPROVED")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as PublicReview[];
}

export function publicCustomerName(name: string) {
  return name.trim().split(/\s+/)[0] || "Customer";
}

export function formatReviewDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function submitReview(draft: ReviewDraft): Promise<void> {
  const row = {
    customer_name: draft.customer_name.trim(),
    mobile: draft.mobile.trim(),
    locality: draft.locality.trim(),
    service: draft.service,
    electrician_name: draft.electrician_name?.trim() || null,
    rating: draft.rating,
    review_text: draft.review_text.trim(),
    feedback_tags: draft.feedback_tags,
    status: "PENDING" as const,
  };

  if (isSupabaseConfigured) {
    const { error } = await supabase.from("reviews").insert(row);
    if (error) throw error;
    return;
  }

  if (typeof window === "undefined") return;
  const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as unknown[];
  existing.push({
    ...row,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  });
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
}
