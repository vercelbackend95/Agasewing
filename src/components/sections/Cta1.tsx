import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

interface Cta1Props {
  className?: string;
}

const Cta1 = ({ className }: Cta1Props) => {
  const bannerBackgroundStyle = {
    background:
      "radial-gradient(circle at top right, rgba(167,180,241,0.18), rgba(167,180,241,0) 45%), rgba(255,255,255,1)",
  } as const;

  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div
          className="mx-auto flex flex-col items-center justify-between rounded-xl border border-[rgba(78,100,235,0.12)] bg-white pb-0 text-center shadow-sm md:flex-row md:py-6"
          style={bannerBackgroundStyle}
        >
          <div className="p-6 md:max-w-96">
            <div className="mb-2 flex items-center justify-center gap-2">
              <h4 className="text-2xl font-bold text-[#14161B]">Quick question? Message us.</h4>
            </div>
            <p className="text-[#2A2F3A]">
              Quick questions welcome. Walk-ins for fittings — pricing
              confirmed in person.
            </p>
            <div className="mt-8 h-17 w-full rounded-2xl bg-muted md:w-auto">
              <InteractiveHoverButton
                type="button"
                onClick={() => window.open("https://wa.me/447514776088", "_blank", "noopener,noreferrer")}
                mobileActive
                className="h-full w-full rounded-2xl border-0 bg-transparent text-sm text-[#5E6676]"
              >
                Message
              </InteractiveHoverButton>
            </div>
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
