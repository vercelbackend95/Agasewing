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
      description: "Bring your garment. We’ll check what needs doing, discuss the finish you want, and take measurements.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img14.png",
    },
    {
      title: "We pin, measure & issue your ticket",
      subtitle: "Clear quote on the spot",
      description:
        "We mark the alterations, confirm the price before we start, and give you a collection ticket with your job details.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img10.png",
    },
    {
      title: "Collect your items",
      subtitle: "Ticket required for collection",
      description:
        "Return when it’s ready and show your collection ticket at the counter. We’ll hand over your finished items — neat, fitted, and properly done.",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png",
    },
  ];

  const [active, setActive] = useState<number | null>(0);

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <h1 className="text-5xl font-semibold tracking-tight lg:text-7xl">
              {" "}
              Process
              <sup className="align-top font-mono text-lg tracking-tight text-foreground/40">0003</sup>{" "}
            </h1>
            <p className="text-base text-foreground/50">
              Walk in with your item — we measure, confirm the price, and issue your collection ticket. Bring the ticket back when
              you return to collect.
            </p>
          </div>
          <ul className="relative col-span-4 w-full space-y-10">
            {process.map((step, index) => (
              <li
                onMouseEnter={() => setActive(index)}
                key={index}
                className={cn(
                  "relative mr-20 ml-auto flex w-full max-w-xl cursor-pointer flex-col justify-between gap-10 rounded-3xl bg-background p-10 md:flex-row lg:items-center",
                  index === active ? "bg-background" : "lg:bg-transparent",
                )}
              >
                <AnimatePresence mode="wait">
                  {index === active && (
                    <motion.img
                      key={step.image}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      src={step.image}
                      alt=""
                      className="absolute top-0 right-0 size-30 translate-x-1/4 -translate-y-1/2 rounded-2xl object-cover lg:size-40 lg:translate-x-1/2"
                    />
                  )}
                </AnimatePresence>
                <div>
                  <h2 className="mb-4 font-bold tracking-tight lg:text-3xl">Step {index + 1}</h2>
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-xl">{step.title}</h3>
                  <p className="mb-4 text-sm font-medium uppercase tracking-wide text-foreground/60">{step.subtitle}</p>
                  <p className="line-clamp-3 text-foreground/50">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Process4 };
