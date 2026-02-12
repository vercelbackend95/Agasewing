"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const testimonials1 = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    content:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "Jane Doe",
    role: "CTO",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    content:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "John Smith",
    role: "COO",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    content:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "Jane Smith",
    role: "Tech Lead",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    content:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "Richard Doe",
    role: "Designer",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    content:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
  {
    name: "Gordon Doe",
    role: "Developer",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    content:
      "Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.",
  },
];

const testimonials2 = [...testimonials1];

interface Testimonial7Props {
  className?: string;
}

const TestimonialRow = ({
  items,
  reverse = false,
}: {
  items: typeof testimonials1;
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
  return (
    <section className={cn("py-32", className)} id="reviews">
      <div className="container flex flex-col items-center gap-6">
        <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">Meet our happy clients</h2>
        <p className="text-muted-foreground lg:text-lg">All of our 1000+ clients are happy</p>
        <button className="mt-6 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
          Get started for free
        </button>
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
