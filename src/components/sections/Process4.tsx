import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface Process4Props {
  className?: string;
}

const Process4 = ({ className }: Process4Props) => {
  const process = [
    {
      title: "Walk in with your item",
      subtitle: "No booking needed",
      description: "Bring your item. We’ll take a quick look, measure if needed, and get you sorted.",
      image: "/pictures/step1.webp",
    },
    {
      title: "We pin, measure & issue your ticket",
      subtitle: "Clear quote on the spot",
      description:
        "We mark the alterations, confirm the price before we start, and give you a collection ticket with your job details.",
      image: "/pictures/step2.webp",
    },
    {
      title: "Collect your items",
      subtitle: "Ticket required for collection",
      description:
        "Return when it’s ready and show your collection ticket at the counter. We’ll hand over your finished items — neat, fitted, and properly done.",
      image: "/pictures/step3.webp",
    },
  ];

  const [active, setActive] = useState<number | null>(0);
  const [seenOnMobile, setSeenOnMobile] = useState<Set<number>>(new Set());

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <h1 className="text-5xl font-semibold tracking-tight text-[#14161B] lg:text-7xl">
              {" "}
              Process
            </h1>
            <p className="text-base leading-relaxed text-[#2A2F3A]">
              Walk in with your item — we measure, confirm the price, and issue your collection ticket. Bring the ticket back when
              you return to collect.
            </p>
          </div>
          <ul className="relative col-span-4 w-full space-y-10">
            {process.map((step, index) => (
              <motion.li
                onMouseEnter={() => setActive(index)}
                onViewportEnter={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
                    setActive(index);
                    setSeenOnMobile((prev) => new Set(prev).add(index));
                  }
                }}
                key={index}
                viewport={{ amount: 0.6 }}
                className={cn(
                  "relative mx-auto flex w-full max-w-xl cursor-pointer flex-col justify-between gap-10 rounded-3xl bg-background p-10 md:flex-row lg:items-center",
                  index === active ? "bg-background" : "lg:bg-transparent",
                )}
              >
                <AnimatePresence mode="wait">
                  {(index === active || seenOnMobile.has(index)) && (
                    <motion.img
                      key={step.image}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      src={step.image}
                      alt=""
                      className="absolute top-0 right-4 size-28 translate-x-0 -translate-y-1/3 rounded-2xl object-cover lg:right-0 lg:size-40 lg:translate-x-1/2 lg:-translate-y-1/2"
                    />
                  )}
                </AnimatePresence>
                <div>
                  <h2 className="mb-4 font-bold tracking-tight text-[#14161B] lg:text-3xl">Step {index + 1}</h2>
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter text-[#14161B] lg:text-xl">{step.title}</h3>
                  <p className="mb-4 text-sm font-medium uppercase tracking-wide text-[#5E6676]">{step.subtitle}</p>
                  <p className="line-clamp-3 leading-relaxed text-[#2A2F3A]">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Process4 };
