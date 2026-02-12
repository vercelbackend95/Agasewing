import { cn } from "@/lib/utils";

interface HowItWorksProps {
  className?: string;
}

const steps = [
  {
    title: "Bring your garment",
    description: "From everyday trousers to a wedding dress, bring the item you want adjusted.",
  },
  {
    title: "Get a fitting and quote",
    description: "Aga checks the fit, pins where needed, and confirms the best alteration options.",
  },
  {
    title: "Collect perfectly finished work",
    description: "Pick up your garment with clean, precise tailoring that feels right and lasts.",
  },
];

const trustItems = ["30+ years of tailoring experience", "Bridal and wedding dress alterations", "Trusted local service in Milton Keynes"];

const HowItWorks = ({ className }: HowItWorksProps) => {
  return (
    <section id="how-it-works" className={cn("py-16 md:py-20", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-wide text-[rgba(255,74,1,1)]">How it works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Simple process, quality alterations</h2>
          <p className="mt-4 text-muted-foreground">
            Sewing at Aga&apos;s focuses mainly on clothing alterations, including bridal and wedding dress adjustments,
            with careful finishing in every detail.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[rgba(255,74,1,1)]">Step {index + 1}</p>
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-black px-2 text-xs font-semibold text-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-tight text-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/70">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center">
          {trustItems.map((item) => (
            <span key={item} className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HowItWorks };
