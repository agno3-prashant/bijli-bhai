import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import { SiteShell } from "@/components/layout/SiteShell";
import {
  formatReviewDate,
  listApprovedReviews,
  publicCustomerName,
  type PublicReview,
} from "@/lib/reviews";
import { trackCta } from "@/lib/contact";

function ReviewCard({ review }: { review: PublicReview }) {
  return (
    <article className="surface-card flex h-full flex-col p-5">
      <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "fill-yellow text-yellow" : "text-navy-200"}`}
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">
        {review.review_text}
      </p>
      <p className="mt-4 text-sm font-semibold text-ink">
        {publicCustomerName(review.customer_name)}
      </p>
      <p className="text-xs text-slate">
        {review.locality} · {review.service}
        {review.created_at ? ` · ${formatReviewDate(review.created_at)}` : ""}
      </p>
    </article>
  );
}

function ReviewInvite({ source }: { source: string }) {
  return (
    <div className="surface-card px-6 py-10 text-center sm:px-10 sm:py-12">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        BijliBhai abhi grow kar raha hai.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate sm:text-base">
        Service li hai? Apna experience share karein. Approved reviews yahan
        dikhte hain — koi fake rating nahi.
      </p>
      <Link
        to="/review"
        onClick={() => trackCta({ event: "review_started", label: source })}
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-yellow px-7 font-semibold text-navy-950"
      >
        Review Dein
      </Link>
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<PublicReview[] | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = "Customer Reviews | BijliBhai";
    meta?.setAttribute(
      "content",
      "Real BijliBhai customer reviews from Kanpur, Shuklaganj and Unnao. Only approved service experiences are shown.",
    );
    listApprovedReviews()
      .then(setReviews)
      .catch(() => setReviews([]));
    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
    };
  }, []);

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-navy-950 py-14 text-white sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow/10 blur-3xl" />
        <div className="page-wrap relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow">
            Reviews
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            BijliBhai Customers Kya Kehte Hain
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Real service experiences from customers across Kanpur, Shuklaganj &
            Unnao.
          </p>
        </div>
      </section>

      <section className="section-pad bg-canvas">
        <div className="page-wrap">
          {reviews === null ? (
            <p className="text-slate">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <div className="mx-auto max-w-xl">
              <ReviewInvite source="Empty reviews CTA" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
          <p className="mt-10 text-center">
            <Link
              to="/review"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-navy-950 px-5 text-sm font-semibold text-white"
            >
              Review Dein
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
