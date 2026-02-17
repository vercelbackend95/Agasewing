import { useEffect, useMemo, useState } from "react";

type Review = {
  reviewId: string;
  starRating: string;
  ratingValue: number;
  comment: string;
  createTime: string;
  reviewer: string;
  profilePhotoUrl: string | null;
};

type ReviewsResponse = {
  fetchedAt: string;
  averageRating: number | null;
  totalReviewCount: number | null;
  reviews: Review[];
  error?: string;
  details?: string;
};

const STAR_COLOR = "rgba(255, 74, 1)";

const Stars = ({ value }: { value: number }) => (
  <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, index) => {
      const filled = index < value;
      return (
        <span
          key={index}
          className="text-lg leading-none"
          style={{ color: filled ? STAR_COLOR : "rgba(0,0,0,0.2)" }}
        >
          ★
        </span>
      );
    })}
  </div>
);

export function GoogleReviews() {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/reviews.json");
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.details || json?.error || "Could not load Google reviews.");
        }

        if (mounted) {
          setData(json);
          setError(null);
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || "Could not load Google reviews.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const recentReviews = useMemo(() => {
    if (!data?.reviews?.length) return [];
    return [...data.reviews]
      .sort((a, b) => Date.parse(b.createTime || "") - Date.parse(a.createTime || ""))
      .slice(0, 8);
  }, [data]);

  return (
    <section className="px-4 py-14 sm:px-6" aria-labelledby="google-reviews-heading">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Google reviews</p>
        <h2 id="google-reviews-heading" className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
          What clients say about Sewing at Aga&apos;s
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-black/70 sm:text-base">
          Real feedback from our Google Business Profile, updated regularly.
        </p>

        {loading && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="animate-pulse rounded-xl border border-black/10 bg-white p-4">
                <div className="h-4 w-24 rounded bg-black/10" />
                <div className="mt-3 h-3 w-full rounded bg-black/10" />
                <div className="mt-2 h-3 w-4/5 rounded bg-black/10" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-black/10 bg-white p-4">
              <Stars value={Math.round(data.averageRating || 0)} />
              <p className="text-sm text-black/80">
                <strong>{data.averageRating?.toFixed(1) ?? "N/A"}</strong> average from{" "}
                <strong>{data.totalReviewCount ?? recentReviews.length}</strong> reviews.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {recentReviews.map((review) => (
                <article key={review.reviewId} className="rounded-xl border border-black/10 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {review.profilePhotoUrl ? (
                        <img
                          src={review.profilePhotoUrl}
                          alt={`${review.reviewer} avatar`}
                          className="h-8 w-8 rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-black/10" />
                      )}
                      <p className="text-sm font-medium text-black">{review.reviewer}</p>
                    </div>
                    <Stars value={review.ratingValue} />
                  </div>
                  <p className="text-sm text-black/75">{review.comment || "No comment provided."}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
