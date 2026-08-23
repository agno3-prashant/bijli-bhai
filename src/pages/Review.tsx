import { type FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck, Star } from "lucide-react";

import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { SiteShell } from "@/components/layout/SiteShell";
import { trackCta } from "@/lib/contact";
import {
  FEEDBACK_TAGS,
  REVIEW_SERVICES,
  submitReview,
} from "@/lib/reviews";
import { cn } from "@/lib/utils";

const RATING_HINT = ["", "Kharaab", "Theek nahi", "Theek", "Achha", "Bahut achha"] as const;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export default function Review() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [locality, setLocality] = useState("");
  const [service, setService] = useState<(typeof REVIEW_SERVICES)[number] | "">("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [electrician, setElectrician] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const firstErrorRef = useRef<HTMLDivElement>(null);

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
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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

  function validate() {
    const next: Record<string, string> = {};
    if (rating < 1) next.rating = "Star rating select karein.";
    if (!service) next.service = "Service select karein.";
    if (reviewText.trim().length < 8) next.review = "Review thoda detail me likhein.";
    if (!name.trim()) next.name = "Apna naam likhein.";
    if (!/^[6-9]\d{9}$/.test(mobile)) next.mobile = "Sahi 10-digit mobile number likhein.";
    if (!locality.trim()) next.locality = "Area / locality likhein.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) {
      requestAnimationFrame(() => {
        firstErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    setSubmitting(true);
    try {
      await submitReview({
        customer_name: name,
        mobile,
        locality,
        service: service as (typeof REVIEW_SERVICES)[number],
        rating,
        review_text: reviewText,
        electrician_name: electrician,
        feedback_tags: tags,
      });
      trackCta({ event: "review_submitted", label: service });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFormError("Review submit nahi ho paya. Thodi der baad try karein.");
    } finally {
      setSubmitting(false);
    }
  }

  const firstError = Object.keys(errors)[0];

  return (
    <SiteShell compact>
      {done ? (
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-yellow/15 blur-3xl" />
          <div className="page-wrap relative max-w-xl py-16 text-center sm:py-24">
            <div className="relative mx-auto mb-6 h-20 w-20">
              <span className="absolute inset-0 rounded-full bg-yellow/30 blur-2xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-yellow/40 bg-navy-900">
                <CheckCircle2 className="h-10 w-10 text-yellow" strokeWidth={1.75} />
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow">
              Review received
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              Dhanyavaad!
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/70">
              Aapka review receive ho gaya hai. Verify hone ke baad website par
              dikhaya ja sakta hai.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                to="/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-yellow font-semibold text-navy-950"
              >
                Back to Home
              </Link>
              <CallCta className="w-full" />
              <WhatsAppCta className="w-full" />
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="relative overflow-hidden bg-navy-950 text-white">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-yellow/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-0 h-40 w-40 rounded-full bg-yellow/5 blur-3xl" />
            <div className="page-wrap relative max-w-xl pb-16 pt-10 sm:pb-20 sm:pt-14">
              <p className="inline-flex rounded-full border border-yellow/25 bg-yellow/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow">
                Kanpur • Shuklaganj • Unnao
              </p>
              <h1 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                Service kaisi lagi?
              </h1>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70 sm:text-base">
                Aapka feedback BijliBhai ko better banane aur dusre customers ko
                decision lene me help karta hai.
              </p>
            </div>
          </section>

          <section className="relative z-10 -mt-10 pb-16 sm:-mt-12">
            <div className="page-wrap max-w-xl">
              <form
                onSubmit={onSubmit}
                noValidate
                className="overflow-hidden rounded-[1.6rem] border border-navy-100 bg-white shadow-[0_24px_70px_rgba(7,24,44,0.12)]"
              >
                <div className="border-b border-navy-50 bg-mist/70 px-5 py-4 sm:px-7">
                  <p className="text-sm font-medium text-navy-700">
                    1 minute. Mobile number website par nahi dikhega.
                  </p>
                </div>

                <div className="space-y-7 px-5 py-6 sm:px-7 sm:py-8">
                  <fieldset ref={firstError === "rating" ? firstErrorRef : undefined}>
                    <legend className="field-label">Rating *</legend>
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setRating(value);
                            setErrors((current) => ({ ...current, rating: "" }));
                          }}
                          className={cn(
                            "flex min-h-14 flex-col items-center justify-center rounded-2xl border transition",
                            value <= rating
                              ? "border-yellow bg-yellow/15 shadow-[0_0_0_3px_rgba(255,212,0,0.18)]"
                              : "border-navy-100 bg-mist",
                          )}
                          aria-label={`${value} star`}
                          aria-pressed={rating === value}
                        >
                          <Star
                            className={cn(
                              "h-7 w-7",
                              value <= rating
                                ? "fill-yellow text-yellow"
                                : "text-navy-300",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-center text-sm font-medium text-navy-600">
                      {rating ? RATING_HINT[rating] : "Tap karke rating dein"}
                    </p>
                    {errors.rating ? (
                      <p className="mt-1 text-sm font-medium text-red-600" role="alert">
                        {errors.rating}
                      </p>
                    ) : null}
                  </fieldset>

                  <fieldset
                    ref={firstError === "service" ? firstErrorRef : undefined}
                  >
                    <legend className="field-label">Service Taken *</legend>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {REVIEW_SERVICES.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setService(option);
                            setErrors((current) => ({ ...current, service: "" }));
                          }}
                          className={cn(
                            "min-h-11 rounded-xl px-3 text-sm font-semibold transition",
                            service === option
                              ? "bg-navy-950 text-white"
                              : "bg-mist text-navy-700 hover:bg-navy-100",
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {errors.service ? (
                      <p className="mt-2 text-sm font-medium text-red-600" role="alert">
                        {errors.service}
                      </p>
                    ) : null}
                  </fieldset>

                  <fieldset>
                    <legend className="field-label">Quick feedback</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {FEEDBACK_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={cn(
                            "chip",
                            tags.includes(tag)
                              ? "bg-yellow text-navy-950"
                              : "bg-mist text-navy-700 hover:bg-navy-100",
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div ref={firstError === "review" ? firstErrorRef : undefined}>
                    <label className="field-label" htmlFor="review-text">
                      Review *
                    </label>
                    <textarea
                      id="review-text"
                      value={reviewText}
                      onChange={(e) => {
                        setReviewText(e.target.value.slice(0, 600));
                        if (errors.review) setErrors((current) => ({ ...current, review: "" }));
                      }}
                      rows={4}
                      placeholder="Kaam kaisa raha? Time, price aur behaviour ke baare me likhein."
                      className={cn(
                        "field-input h-auto min-h-[8rem] py-3",
                        errors.review && "field-input-error",
                      )}
                    />
                    <p className="mt-1 text-right text-xs text-slate">
                      {reviewText.length}/600
                    </p>
                    {errors.review ? (
                      <p className="text-sm font-medium text-red-600" role="alert">
                        {errors.review}
                      </p>
                    ) : null}
                  </div>

                  <div
                    className="grid gap-4 sm:grid-cols-2"
                    ref={
                      firstError === "name" || firstError === "mobile"
                        ? firstErrorRef
                        : undefined
                    }
                  >
                    <div>
                      <label className="field-label" htmlFor="review-name">
                        Name *
                      </label>
                      <input
                        id="review-name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value.slice(0, 60));
                          if (errors.name) setErrors((current) => ({ ...current, name: "" }));
                        }}
                        autoComplete="name"
                        className={cn("field-input", errors.name && "field-input-error")}
                      />
                      {errors.name ? (
                        <p className="mt-1 text-sm font-medium text-red-600" role="alert">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label className="field-label" htmlFor="review-mobile">
                        Mobile Number *
                      </label>
                      <div
                        className={cn(
                          "field-input mt-2 flex items-center px-0",
                          errors.mobile && "field-input-error",
                        )}
                      >
                        <span className="pl-4 pr-2 text-sm font-semibold text-navy-500">
                          +91
                        </span>
                        <input
                          id="review-mobile"
                          type="tel"
                          inputMode="numeric"
                          value={mobile}
                          onChange={(e) => {
                            setMobile(digitsOnly(e.target.value));
                            if (errors.mobile)
                              setErrors((current) => ({ ...current, mobile: "" }));
                          }}
                          autoComplete="tel"
                          placeholder="98765 43210"
                          className="h-full w-full bg-transparent pr-4 outline-none"
                        />
                      </div>
                      {errors.mobile ? (
                        <p className="mt-1 text-sm font-medium text-red-600" role="alert">
                          {errors.mobile}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div ref={firstError === "locality" ? firstErrorRef : undefined}>
                    <label className="field-label" htmlFor="review-locality">
                      Area / Locality *
                    </label>
                    <input
                      id="review-locality"
                      value={locality}
                      onChange={(e) => {
                        setLocality(e.target.value.slice(0, 80));
                        if (errors.locality)
                          setErrors((current) => ({ ...current, locality: "" }));
                      }}
                      placeholder="Kanpur / Shuklaganj / Unnao"
                      className={cn("field-input", errors.locality && "field-input-error")}
                    />
                    {errors.locality ? (
                      <p className="mt-1 text-sm font-medium text-red-600" role="alert">
                        {errors.locality}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="review-electrician">
                      Electrician Name <span className="font-normal text-slate">(optional)</span>
                    </label>
                    <input
                      id="review-electrician"
                      value={electrician}
                      onChange={(e) => setElectrician(e.target.value.slice(0, 60))}
                      className="field-input"
                    />
                  </div>

                  {formError ? (
                    <p className="text-sm font-medium text-red-600" role="alert">
                      {formError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-yellow text-base font-bold text-navy-950 shadow-[0_10px_28px_rgba(255,212,0,0.28)] transition hover:-translate-y-0.5 hover:bg-yellow-400 disabled:translate-y-0 disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Review Submit Karein"}
                  </button>

                  <p className="flex items-start gap-2 text-xs leading-relaxed text-slate">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
                    Mobile number sirf verification ke liye hai. Public review par
                    sirf first name, area aur service dikhegi.
                  </p>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </SiteShell>
  );
}
