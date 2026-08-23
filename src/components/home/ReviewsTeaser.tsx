import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { trackCta } from "@/lib/contact";
import {
  formatReviewDate,
  listApprovedReviews,
  publicCustomerName,
  type PublicReview,
} from "@/lib/reviews";

export function ReviewsTeaser() {
  const [reviews, setReviews] = useState<PublicReview[] | null>(null);

  useEffect(() => {
    listApprovedReviews()
      .then((items) => setReviews(items.slice(0, 6)))
      .catch(() => setReviews([]));
  }, []);

  return (
    <Section id="reviews" className="bg-mist">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-navy-600">
            Reviews
          </p>
          <h2 className="section-title mt-2">Customers ka Experience</h2>
        </div>
        <Link
          to="/reviews"
          className="text-sm font-semibold text-navy-800 hover:underline"
        >
          Sabhi Reviews Dekhein
        </Link>
      </div>

      {reviews === null ? (
        <p className="mt-8 text-slate">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <div className="surface-card mt-8 p-6 sm:p-8">
          <p className="text-base font-semibold text-ink">
            BijliBhai abhi grow kar raha hai.
          </p>
          <p className="mt-2 text-sm text-slate">
            Service li hai? Apna experience share karein.
          </p>
          <Link
            to="/review"
            onClick={() =>
              trackCta({ event: "review_started", label: "Homepage review invite" })
            }
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-yellow px-5 font-semibold text-navy-950"
          >
            Review Dein
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="surface-card p-5">
              <div
                className="flex items-center gap-1"
                aria-label={`${review.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow text-yellow" : "text-navy-200"}`}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">
                {review.review_text}
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">
                {publicCustomerName(review.customer_name)}
              </p>
              <p className="text-xs text-slate">
                {review.locality} · {review.service} ·{" "}
                {formatReviewDate(review.created_at)}
              </p>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
