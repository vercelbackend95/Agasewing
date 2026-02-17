import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";


const featureData = [
  {
    desc: "Clean hems, precise waists, smooth seams — a fit that feels made for you.",
    img: "/pictures/services%20pics/Tailoring%20alterations.webp",
    title: "Tailoring alterations",
    gridClass: "md:col-span-1",
  },
  {
    desc: "From split seams to missing buttons — we bring your favourites back to life. Neat, durable repairs that look right and last.",
    img: "/pictures/services%20pics/Clothing%20repairs.webp",
    title: "Clothing repairs",
    gridClass: "lg:col-span-2",
  },
  {
    desc: "Made-to-measure curtains with beautiful drape, clean lines, and a polished finish.",
    img: "/pictures/services%20pics/Custom%20curtains.webp",
    title: "Custom curtains",
    gridClass: "md:col-span-1 lg:row-span-2",
  },
  {
    desc: "Small pieces, big difference. Cushions, covers and home textiles sewn with care — tidy edges, strong stitching, lovely finish.",
    img: "/pictures/services%20pics/Pillowcases.webp",
    title: "Pillowcases & textile décor",
    gridClass: "lg:col-span-2",
  },
  {
    desc: "Freshen seats and cushions with tailored upholstery repairs and neat fabric finishes.",
    img: "/pictures/services%20pics/Furniture%20upholstery.webp",
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
          <div
            className="mb-10 w-full max-w-5xl min-h-[150px] rounded-[24px] border border-[rgba(255,74,1,0.12)] px-5 py-4 text-left backdrop-blur-[10px] md:min-h-[190px] md:p-6 lg:min-h-[220px] lg:px-10 lg:py-8"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(167,180,241,0.18), rgba(167,180,241,0) 45%), rgba(246,248,247,0.72)",
            }}
          >
            <div className="max-w-[64ch]">
              <span className="inline-flex rounded-full border border-[#FF4A01]/25 bg-[#FF4A01]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF4A01]">
                TAILORING SERVICES
              </span>
              <h2 className="mt-3 max-w-[22ch] text-3xl font-semibold tracking-tight text-[#14161B] sm:text-4xl md:max-w-none">
                Alterations & repairs — done properly.
              </h2>
              <p className="mt-3 text-[#2A2F3A]">Walk-ins welcome. No booking.</p>
            </div>
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
                <div className={cn("w-full flex-1 overflow-hidden rounded-3xl bg-muted")}>
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="pointer-events-none h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#14161B]">{feature.title}</h3>
                <p className="text-[#2A2F3A]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature284 };
