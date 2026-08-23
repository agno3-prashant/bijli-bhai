import { type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { SiteShell } from "@/components/layout/SiteShell";
import { trackCta } from "@/lib/contact";
import {
  FEEDBACK_TAGS,
  REVIEW_SERVICES,
  submitReview,
} from "@/lib/reviews";
import { cn } from "@/lib/utils";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export default function Review() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [locality, setLocality] = useState("");
  const [service, setService] = useState<(typeof REVIEW_SERVICES)[number]>("Switch & Socket");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [electrician, setElectrician] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const robots = document.querySelector('meta[name="robots"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    const previousRobots = robots?.getAttribute("content") ?? "";
    document.title = "Share a review | BijliBhai";
    meta?.setAttribute(
      "content",
      "Service kaisi lagi? BijliBhai ke liye apna experience share karein.",
    );
    robots?.setAttribute("content", "noindex,follow");
    trackCta({ event: "review_started", label: "Review page" });
    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
      if (robots) robots.setAttribute("content", previousRobots);
    };
  }, []);

  function toggleTag(tag: string) {
    setTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return setError("Name likhein.");
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Sahi 10-digit mobile number likhein.");
    if (!locality.trim()) return setError("Area / locality likhein.");
    if (rating < 1) return setError("Rating select karein.");
    if (reviewText.trim().length < 8) return setError("Review thoda detail me likhein.");

    setError("");
    setSubmitting(true);
    try {
      await submitReview({
        customer_name: name,
        mobile,
        locality,
        service,
        rating,
        review_text: reviewText,
        electrician_name: electrician,
        feedback_tags: tags,
      });
      trackCta({ event: "review_submitted", label: service });
      setDone(true);
    } catch {
      setError("Review submit nahi ho paya. Thodi der baad try karein.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteShell>
      <section className="section-pad bg-canvas pb-16">
        <div className="page-wrap max-w-xl">
          {done ? (
            <div className="surface-card p-8 text-center">
              <p className="text-3xl" aria-hidden>
                ⚡
              </p>
              <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">
                Dhanyavaad!
              </h1>
              <p className="mt-3 text-slate">
                Aapka review receive ho gaya hai. Verify hone ke baad website par
                dikhaya ja sakta hai.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  to="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-navy-950 font-semibold text-white"
                >
                  Back to Home
                </Link>
                <CallCta />
                <WhatsAppCta />
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="surface-card p-5 sm:p-8" noValidate>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow">
                Feedback
              </p>
              <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">
                Service kaisi lagi?
              </h1>
              <p className="mt-2 text-sm text-slate">
                Aapka feedback BijliBhai ko better banane aur dusre customers ko
                decision lene me help karta hai.
              </p>

              <label className="mt-6 block text-sm font-semibold text-navy-800">
                Name *
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 60))}
                  className="mt-2 h-12 w-full rounded-xl border border-navy-200 bg-mist px-4"
                  autoComplete="name"
                />
              </label>

              <label className="mt-4 block text-sm font-semibold text-navy-800">
                Mobile Number *
                <input
                  type="tel"
                  inputMode="numeric"
                  value={mobile}
                  onChange={(e) => setMobile(digitsOnly(e.target.value))}
                  className="mt-2 h-12 w-full rounded-xl border border-navy-200 bg-mist px-4"
                  autoComplete="tel"
                  placeholder="9876543210"
                />
              </label>

              <label className="mt-4 block text-sm font-semibold text-navy-800">
                Area / Locality *
                <input
                  value={locality}
                  onChange={(e) => setLocality(e.target.value.slice(0, 80))}
                  className="mt-2 h-12 w-full rounded-xl border border-navy-200 bg-mist px-4"
                  placeholder="Kanpur / Shuklaganj / Unnao"
                />
              </label>

              <fieldset className="mt-5">
                <legend className="text-sm font-semibold text-navy-800">
                  Service Taken *
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {REVIEW_SERVICES.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setService(option)}
                      className={cn(
                        "rounded-full px-3 py-2 text-sm font-semibold",
                        service === option
                          ? "bg-navy-950 text-white"
                          : "bg-mist text-navy-700",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-5">
                <legend className="text-sm font-semibold text-navy-800">Rating *</legend>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className="min-h-12 min-w-12 rounded-xl border border-navy-100 bg-mist"
                      aria-label={`${value} star`}
                      aria-pressed={rating === value}
                    >
                      <Star
                        className={cn(
                          "mx-auto h-7 w-7",
                          value <= rating ? "fill-yellow text-yellow" : "text-navy-300",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="mt-5 block text-sm font-semibold text-navy-800">
                Review *
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value.slice(0, 600))}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-navy-200 bg-mist px-4 py-3"
                />
              </label>

              <label className="mt-4 block text-sm font-semibold text-navy-800">
                Electrician Name (optional)
                <input
                  value={electrician}
                  onChange={(e) => setElectrician(e.target.value.slice(0, 60))}
                  className="mt-2 h-12 w-full rounded-xl border border-navy-200 bg-mist px-4"
                />
              </label>

              <fieldset className="mt-5">
                <legend className="text-sm font-semibold text-navy-800">
                  Quick feedback
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {FEEDBACK_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "rounded-full px-3 py-2 text-sm font-medium",
                        tags.includes(tag)
                          ? "bg-yellow text-navy-950"
                          : "bg-mist text-navy-700",
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </fieldset>

              {error ? (
                <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-yellow font-semibold text-navy-950 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Review Submit Karein"}
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
