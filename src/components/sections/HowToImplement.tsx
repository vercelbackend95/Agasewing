import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface HowToImplementProps {
  className?: string;
}

const HowToImplement = ({ className }: HowToImplementProps) => {
  return (
    <section className={cn("overflow-hidden bg-background py-16 text-foreground md:py-20", className)}>
      <div className="container relative z-20 mx-auto flex flex-col items-center justify-center gap-8 px-4">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">3-step process</h2>

        <div className="relative grid w-full grid-cols-1 md:grid-cols-3">
          <div className="relative space-y-5 border p-8 md:p-10">
            <div className="inline-flex size-12 items-center justify-center rounded-lg border bg-muted/40">
              <img src="/pictures/hanger-towel-2-svgrepo-com.svg" alt="Hanger and towel icon" className="size-6" />
            </div>
            <h3 className="text-xl font-semibold tracking-tighter">Bring your items</h3>
            <p className="text-muted-foreground">Drop off what needs altering — we’ll take it from here.</p>
            <div className="absolute right-1/2 -bottom-5 z-10 flex size-10 translate-x-1/2 rotate-90 items-center justify-center rounded-full border bg-background md:top-1/2 md:-right-5 md:translate-x-0 md:-translate-y-1/2 md:rotate-0">
              <ArrowRight className="size-6" />
            </div>
          </div>

          <div className="relative space-y-5 border p-8 md:p-10">
            <div className="inline-flex size-12 items-center justify-center rounded-lg border bg-muted/40">
              <img src="/pictures/measuring-tape-svgrepo-com.svg" alt="Measuring tape icon" className="size-6" />
            </div>
            <h3 className="text-xl font-semibold tracking-tighter">Fitting &amp; quote</h3>
            <p className="text-muted-foreground">We measure, pin, confirm the details — and you get a ticket.</p>
            <div className="absolute right-1/2 -bottom-5 z-10 flex size-10 translate-x-1/2 rotate-90 items-center justify-center rounded-full border bg-background md:top-1/2 md:-right-5 md:translate-x-0 md:-translate-y-1/2 md:rotate-0">
              <ArrowRight className="size-6" />
            </div>
          </div>

          <div className="space-y-5 border p-8 md:p-10">
            <div className="inline-flex size-12 items-center justify-center rounded-lg border bg-muted/40">
              <img src="/pictures/ticket-svgrepo-com.svg" alt="Ticket icon" className="size-6" />
            </div>
            <h3 className="text-xl font-semibold tracking-tighter">Collect with your ticket</h3>
            <p className="text-muted-foreground">Come back with your ticket and pick up your finished pieces.</p>
          </div>

          <div className="pointer-events-none absolute left-0 h-full w-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 h-full w-10 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { HowToImplement };
