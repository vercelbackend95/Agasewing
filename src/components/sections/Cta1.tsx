import { Sparkles } from "lucide-react";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

interface Cta1Props {
  className?: string;
}

const Cta1 = ({ className }: Cta1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between rounded-xl border border-muted bg-card pb-0 text-center shadow-sm md:flex-row md:py-6 md:text-left">
          <div className="p-6 md:max-w-96">
            <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
              <span className="flex size-7 items-center justify-center rounded-full bg-muted">
                <Sparkles className="size-4" strokeWidth={1.5} />
              </span>
              <h4 className="text-2xl font-bold">Quick question? Message us.</h4>
            </div>
            <p className="text-muted-foreground">
              Quick questions welcome. Walk-ins for fittings — pricing
              confirmed in person.
            </p>
            <InteractiveHoverButton
              type="button"
              onClick={() => window.open("https://wa.me/447514776088", "_blank", "noopener,noreferrer")}
              className="mt-8 w-full border-white/70 bg-white/90 text-sm text-black md:w-auto"
            >
              Message
            </InteractiveHoverButton>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="aspect-video object-cover md:max-w-96"
          />
        </div>
      </div>
    </section>
  );
};

export { Cta1 };
