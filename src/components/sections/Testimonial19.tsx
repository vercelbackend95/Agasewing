"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Star } from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const testimonials = [
  {
    initials: "MC",
    content:
      "Aga did a great job of shortening my dress, she was fairly priced and got the work done in 3 days! She also recommended to shorten the straps which made the dress look even better.",
  },
  {
    initials: "RF",
    content:
      "I had my wedding dress adjusted by Aga and the whole experience was great. I'd bought my wedding dress online and it was too big for me. Her alterations were precise and ready on time. Aga knows what has to be done before you even ask. She even suggested what I didn't know I'd need: a system to lift the trail which came super in handy during the reception. She added a ribbon to the waist which was very elegant and exactly as I had in my mind. Cherry on the top, a wrist corsage I had in my mind and could find anywhere after searching a lot on the web. I described what I had in mind and sent a picture for inspiration, the result was perfect and exceeding my expectations. Lastly, she also adjusted my husband's trousers. The whole process was smooth and effective, she got it all right in a single session, no further adjustments were needed. You're brilliant. Thanks Aga!",
  },
  {
    initials: "AJ",
    content:
      "I had a pair of floor length chenille curtains shortened this week, a fantastic job was done and so quickly! They look wonderful up, will definitely use Aga again. Highly recommended.",
  },
  {
    initials: "SL",
    content:
      "Great quality work and fair price. Aga has done 4 or 5 items now for us & we're always happy with the standard of the finish. Thank you so much, we really appreciate you ❤️",
  },
  {
    initials: "CM",
    content:
      "Very happy with service, would recommend and will use again. Very helpful email exchange prior to me visiting. Took several pairs of curtains in to be shortened and I am pleased with the result. Thank you!",
  },
  {
    initials: "SK",
    content:
      "I went to Aga after recommendations to get my wedding dress altered with her. She was so efficient and knew exactly what she was doing. I'm very pleased with the end product and would go to her with other sewing needs. 100% recommend.",
  },
  {
    initials: "RG",
    content:
      "So helpful and knew exactly what I wanted with each of my dresses. They are perfect and am so pleased with them. Highly recommend Aga..!!!",
  },
  {
    initials: "CJ",
    content:
      "Amazing! Fast, competitive and good at what she does. Had a suit bought for me a few years back which was far too large. Aga, you turned a suit I never thought I'd wear into one I cannot wait to wear again.",
  },
  {
    initials: "CP",
    content:
      "Aga has made me many clothes now for over two years and made many alterations for me. Her work is first class and impeccable. I would gladly recommend her.",
  },
  {
    initials: "KA",
    content:
      "Aga made some alterations for me to a dress I bought for an event. I have never felt so good in an item of clothing! It fit absolutely perfectly. Will definitely be using again.",
  },
  {
    initials: "F",
    content:
      "Asked Aga to do some upholstery for the mattress and cushions on the back of my campervan. The result was outstanding, really pleased! Great efficiency and excellent customer service. Recommend 100%. Thanks, Fabio.",
  },
  {
    initials: "DF",
    content:
      "Brilliant first experience. Very tidy shop, extremely professional and lovely job done in tailoring a pair of off-the-peg trousers at a very reasonable price. Please note they accept cash only.",
  },
  {
    initials: "GT",
    content:
      "Great work, reasonably priced and fast turnaround! Can’t recommend the service enough, will definitely be returning.",
  },
  {
    initials: "GK",
    content:
      "Needed a dog collar shortening with a 15-minute repair. Great service, thanks. Will definitely use Aga's service again.",
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
          className="mb-8 w-full max-w-5xl rounded-[24px] border border-[rgba(78,100,235,0.12)] px-5 py-4 text-left backdrop-blur-[10px] md:mb-12 md:p-6 lg:px-10 lg:py-8"
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
            <p className="mt-3 text-[#2A2F3A]">Real feedback from customers who trusted us with their alterations.</p>
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
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-sm border border-[#5E6676]/30 bg-white text-base font-semibold tracking-[0.08em] text-[#14161B]">
                        {testimonial.initials}
                      </div>
                      <p className="font-medium text-[#14161B]">{testimonial.initials}</p>
                    </div>
                    <div className="flex gap-1" aria-label="5 out of 5 stars">
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                      <Star className="size-4 fill-amber-500 text-amber-500 md:size-5" />
                    </div>
                  </div>
                  <q className="leading-7 text-[#2A2F3A]">{testimonial.content}</q>
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
