"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface GoogleReview {
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
  rating?: number;
  text?: {
    text?: string;
  };
  relativePublishTimeDescription?: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  avatar: string;
  content: string;
}

const FALLBACK_REVIEWS: TestimonialItem[] = [
  {
    name: "Google reviewer",
    role: "5-star review",
    avatar:
      "https://ui-avatars.com/api/?name=Google+Reviewer&background=f3f4f6&color=111827&size=128",
    content: "Friendly, professional service and great alterations quality.",
  },
  {
    name: "Google reviewer",
    role: "5-star review",
    avatar:
      "https://ui-avatars.com/api/?name=Happy+Customer&background=f3f4f6&color=111827&size=128",
    content: "Very helpful advice and excellent attention to detail.",
  },
  {
    name: "Google reviewer",
    role: "4-star review",
    avatar:
      "https://ui-avatars.com/api/?name=Satisfied+Client&background=f3f4f6&color=111827&size=128",
    content: "Quick turnaround and a welcoming, local service.",
  },
  {
    name: "Google reviewer",
    role: "5-star review",
    avatar:
      "https://ui-avatars.com/api/?name=Local+Customer&background=f3f4f6&color=111827&size=128",
    content: "Reliable work and great communication throughout.",
  },
];

interface Testimonial7Props {
  className?: string;
}

const mapGoogleReviewToTestimonial = (review: GoogleReview): TestimonialItem | null => {
  const name = review.authorAttribution?.displayName;
  const content = review.text?.text;
  if (!name || !content) return null;

  return {
    name,
    role: `${review.rating ?? 5}-star review${review.relativePublishTimeDescription ? ` • ${review.relativePublishTimeDescription}` : ""}`,
    avatar:
      review.authorAttribution?.photoUri ??
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3f4f6&color=111827&size=128`,
    content,
  };
};

const TestimonialRow = ({
  items,
  reverse = false,
}: {
  items: TestimonialItem[];
  reverse?: boolean;
}) => {
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
      direction: reverse ? "backward" : "forward",
    }),
  );

  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [plugin.current]);

  return (
    <div className="overflow-hidden" ref={emblaRef} onMouseLeave={() => plugin.current.play()}>
      <div className="flex gap-4">
        {items.map((testimonial, index) => (
          <article
            key={`${testimonial.name}-${index}`}
            className="max-w-96 shrink-0 select-none rounded-xl border bg-white p-6"
          >
            <div className="mb-4 flex gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="size-9 rounded-full ring-1 ring-input"
                loading="lazy"
              />
              <div className="text-sm">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
            <q>{testimonial.content}</q>
          </article>
        ))}
      </div>
    </div>
  );
};

const Testimonial7 = ({ className }: Testimonial7Props) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(FALLBACK_REVIEWS);

  useEffect(() => {
    const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
    const placeId = import.meta.env.PUBLIC_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) return;

    const loadReviews = async () => {
      try {
        const response = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount`,
          {
            headers: {
              "X-Goog-Api-Key": apiKey,
            },
          },
        );

        if (!response.ok) return;

        const data = (await response.json()) as { reviews?: GoogleReview[] };
        const mapped = (data.reviews ?? []).map(mapGoogleReviewToTestimonial).filter(Boolean) as TestimonialItem[];

        if (mapped.length > 0) {
          setTestimonials(mapped);
        }
      } catch {
        // Keep fallback reviews.
      }
    };

    void loadReviews();
  }, []);

  const testimonials1 = testimonials;
  const testimonials2 = [...testimonials];

  return (
    <section className={cn("py-32", className)} id="reviews">
      <div className="container flex flex-col items-center gap-6">
        <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">Real reviews from Google</h2>
        <p className="text-center text-muted-foreground lg:text-lg">
          Sewing at Aga&apos;s • 4 Victoria Rd, Poole BH12 3BB • Rated 4.5/5 from 27 Google ratings.
        </p>
        <a
          href="https://www.google.com/search?q=Sewing+at+Aga+Poole"
          target="_blank"
          rel="noreferrer"
          className="mt-6 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          See all on Google
        </a>
      </div>
      <div className="lg:container">
        <div className="mt-16 space-y-4">
          <TestimonialRow items={testimonials1} />
          <TestimonialRow items={testimonials2} reverse />
        </div>
      </div>
    </section>
  );
};

export { Testimonial7 };
