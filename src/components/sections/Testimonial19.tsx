"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Star } from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    content:
      "This platform has revolutionized the way we manage projects. It is incredibly user-friendly and efficient.",
  },
  {
    name: "David Lee",
    role: "CTO",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    content:
      "I have been impressed with the seamless integration and functionality. It has made our tech operations much smoother.",
  },
  {
    name: "Mark Thompson",
    role: "COO",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    content:
      "Managing our day-to-day tasks has never been easier. The interface is intuitive and saves us a lot of time.",
  },
  {
    name: "Emily Carter",
    role: "Tech Lead",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    content:
      "The tools provided have significantly improved our team's workflow and collaboration. Highly recommend it!",
  },
  {
    name: "Sophia Turner",
    role: "Designer",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    content:
      "From a design perspective, the flexibility and ease of use are outstanding. This has become an indispensable tool for our team.",
  },
  {
    name: "James Wilson",
    role: "Developer",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    content:
      "As a developer, I appreciate the robust features and simplicity. It has streamlined our processes considerably.",
  },
];

interface Testimonial19Props {
  className?: string;
}

const Testimonial19 = ({ className }: Testimonial19Props) => {
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
    }),
  );

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div
          className="mx-auto mb-8 w-full max-w-5xl rounded-[24px] border border-[rgba(78,100,235,0.12)] px-5 py-4 text-left backdrop-blur-[10px] md:mb-12 md:p-6 lg:px-10 lg:py-8"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(167,180,241,0.18), rgba(167,180,241,0) 45%), rgba(246,248,247,0.72)",
          }}
        >
          <div className="max-w-[64ch]">
            <span className="inline-flex rounded-full border border-[#FF4A01]/25 bg-[#FF4A01]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF4A01]">
              REVIEWS
            </span>
            <h2 id="google-reviews-heading" className="mt-3 max-w-[22ch] text-3xl font-bold tracking-tight text-[#14161B] md:max-w-none md:text-5xl">
              Meet our happy clients
            </h2>
            <p className="mt-3 text-[#2A2F3A]">Join a global network of thought leaders, product developers,</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#5E6676]">View all testimonials</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[plugin.current]}
          onMouseLeave={() => plugin.current.play()}
          className="relative before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-12 before:bg-linear-to-r before:from-background before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-12 after:bg-linear-to-l after:from-background after:to-transparent md:before:w-24 md:after:w-24"
          aria-labelledby="google-reviews-heading"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="basis-auto">
                <Card className="max-w-96 select-none rounded-sm p-6">
                  <div className="flex justify-between gap-4">
                    <div className="mb-4 flex gap-4">
                      <Avatar className="size-14 rounded-sm ring-1 ring-input">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                    </div>
                  </div>
                  <q className="leading-7 text-muted-foreground">{testimonial.content}</q>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Testimonial19 };
