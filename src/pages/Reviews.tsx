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
    <article className="surface-card p-5">
      <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "fill-yellow text-yellow" : "text-navy-200"}`}
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-navy-700">{review.review_text}</p>
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
      <section className="bg-navy-950 py-14 text-white sm:py-20">
        <div className="page-wrap max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow">
            Reviews
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            BijliBhai Customers Kya Kehte Hain
          </h1>
          <p className="mt-4 text-white/70">
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
            <div className="surface-card mx-auto max-w-xl p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-ink">
                BijliBhai abhi grow kar raha hai.
              </h2>
              <p className="mt-3 text-slate">
                Service li hai? Apna experience share karein.
              </p>
              <Link
                to="/review"
                onClick={() =>
                  trackCta({ event: "review_started", label: "Empty reviews CTA" })
                }
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-yellow px-5 font-semibold text-navy-950"
              >
                Review Dein
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
          <p className="mt-10 text-center text-sm">
            <Link to="/review" className="font-semibold text-navy-800 hover:underline">
              Review Dein
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
