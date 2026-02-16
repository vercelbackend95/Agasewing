import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

import { GlowingEffect } from "@/components/aceternity/glowing-effect";

const featureData = [
  {
    desc: "Perfect fit, without the fuss. We adjust hems, waists and seams so your clothes sit exactly the way they should.",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg",
    title: "Tailoring alterations",
    gridClass: "md:col-span-1",
  },
  {
    desc: "From split seams to missing buttons — we bring your favourites back to life. Neat, durable repairs that look right and last.",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
    title: "Clothing repairs",
    gridClass: "lg:col-span-2",
  },
  {
    desc: "Made to measure for your space. Clean lines, beautiful drape, and finishing details that make a room feel finished.",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
    title: "Custom curtains",
    gridClass: "md:col-span-1 lg:row-span-2",
  },
  {
    desc: "Small pieces, big difference. Cushions, covers and home textiles sewn with care — tidy edges, strong stitching, lovely finish.",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg",
    title: "Pillowcases & textile décor",
    gridClass: "lg:col-span-2",
  },
  {
    desc: "Refresh and revive worn pieces with tailored fabric work. Ideal for seats, cushions and small upholstery fixes that make furniture feel new again.",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg",
    title: "Furniture upholstery",
    gridClass: "md:col-span-1",
  },
];

interface Feature284Props {
  className?: string;
}

const Feature284 = ({ className }: Feature284Props) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={cn("h-full overflow-hidden py-32", className)}>
      <div className="container mx-auto flex h-full w-full items-center justify-center px-4">
        <div className="w-full">
          <div className="mb-10 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              TAILORING SERVICES
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Alterations, repairs, and custom adjustments — done properly.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Walk-ins welcome. No booking needed. Clear pricing, honest advice.
            </p>
          </div>

          <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 lg:h-[800px] lg:grid-cols-4">
            {featureData.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "relative flex flex-col gap-2 rounded-3xl border p-4",
                  feature.gridClass,
                )}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 0.5, delay: index * 0.08, ease: "easeOut" }
                }
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  />
                <div className={cn("w-full flex-1 overflow-hidden rounded-3xl bg-muted")}>
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="pointer-events-none h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature284 };
