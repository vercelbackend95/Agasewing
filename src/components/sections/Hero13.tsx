// src/components/sections/Hero13.tsx
import { Bell, PlayCircle } from "lucide-react";

import { TextAnimate } from "@/registry/magicui/text-animate";
import { cn } from "@/lib/utils";

interface Hero13Props {
  className?: string;
}

const Hero13 = ({ className }: Hero13Props) => {
  return (
    <section className={cn("py-20 md:py-32", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border px-2 py-1 text-sm font-normal lg:mb-10 lg:py-2 lg:pr-5 lg:pl-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(255,74,1,1)] text-white">
            <Bell className="size-4" />
          </span>
          <p className="truncate whitespace-nowrap">
            New classes now open for beginners and hobby sewists in Milton Keynes.
          </p>
        </div>

        <h1 className="mb-6 text-4xl leading-none font-bold tracking-tighter md:text-[7vw] lg:text-8xl">
          <TextAnimate animation="blurInUp" by="character" once>
            Sewing at Aga&apos;s
          </TextAnimate>
        </h1>

        <p className="max-w-2xl text-muted-foreground md:text-[2vw] lg:text-xl">
          <TextAnimate animation="blurInUp" by="word" once>
            Choosen by you, Fitted by me - Aga.
          </TextAnimate>
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-10">
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:w-auto"
          >
            Book a lesson
          </a>
          <a
            href="#about"
            className="inline-flex w-full items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent md:w-auto"
          >
            <PlayCircle className="mr-2 size-4" />
            See how classes work
          </a>
        </div>
      </div>
    </section>
  );
};

export { Hero13 };
