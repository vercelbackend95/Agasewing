import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingCategories = [
  {
    title: "Jeans & Trousers",
    image: "/pictures/pricing/jeans-bg.webp",
    prices: [
      ["Jeans: Shorten", "£14"],
      ["Jeans: Zip", "£18"],
      ["Jeans: Button", "£8"],
      ["Jeans: Tapered", "from £20"],
      ["Jeans: Waist Altered", "£22"],
      ["Jeans: Repairs", "from £8"],
      ["Jeans: Button Fly Exchange for Zip", "£18"],
      ["Jeans: Original Hem", "from £15"],
      ["Trousers: Shortened", "£14"],
      ["Trousers: Shortened w/ Tape", "£16"],
      ["Trousers: Zip", "£18"],
      ["Trousers: Lengthened", "£16"],
      ["Trousers: Turn Ups", "£28"],
      ["Trousers: Tapered", "£22"],
      ["Trousers: Waist", "£20"],
      ["Trousers: Insert V", "£28"],
      ["Trousers: Half Pocket", "£14"],
      ["Trousers: Full Pocket", "£22"],
    ],
  },
  {
    title: "Shirts & Blouses",
    image: "/pictures/pricing/shirts-bg.webp",
    prices: [
      ["T-Shirt Length", "£14"],
      ["Sleeve Shortening", "£22"],
      ["Side Adjustment", "£12"],
      ["Shirt Length", "£14"],
      ["Shirt Sleeves", "£20"],
      ["Shirt Sides", "£20"],
    ],
  },
  {
    title: "Eve Dress / Bridal",
    image: "/pictures/pricing/bridal-bg.webp",
    prices: [
      ["Shorten", "£28"],
      ["Shorten Straps", "£12"],
      ["Zip", "£20"],
      ["Taking In", "£28"],
    ],
  },
  {
    title: "Skirts",
    image: "/pictures/pricing/skirts-bg.webp",
    prices: [
      ["Shortening", "£14"],
      ["Zip Replacement", "£18"],
      ["Waist Adjustment", "£18"],
    ],
  },
  {
    title: "Jackets & Coats",
    image: "/pictures/pricing/jackets-bg.webp",
    prices: [
      ["Zip", "£32"],
      ["Zip in Pocket", "£22"],
      ["Zip in Leather Jacket", "£45"],
      ["Shorten Sleeves", "£26"],
      ["Shorten Length", "£34"],
      ["Jacket Relined", "£70"],
      ["Coat Relined", "£80"],
      ["Shorten Leather Jacket", "£36"],
      ["Shorten Leather Sleeve", "£32"],
    ],
  },
  {
    title: "Curtains",
    image: "/pictures/pricing/curtains-bg.webp",
    prices: [
      ["46\" Wide", "£38"],
      ["66\" Wide", "£45"],
      ["90\" Wide", "£50"],
      ["Net per Metre", "£6"],
    ],
  },
];

interface PricingAccordionProps {
  className?: string;
}

const PricingAccordion = ({ className }: PricingAccordionProps) => {
  return (
    <section className={cn("py-20 md:py-24", className)} id="pricing">
      <div className="container mx-auto px-4">
        <div
          className="mb-8 w-full max-w-5xl min-h-[150px] rounded-[24px] border border-[rgba(78,100,235,0.12)] px-5 py-4 text-left backdrop-blur-[10px] md:min-h-[190px] md:p-6 lg:min-h-[220px] lg:px-10 lg:py-8"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(167,180,241,0.18), rgba(167,180,241,0) 45%), rgba(246,248,247,0.72)",
          }}
        >
          <div className="max-w-[64ch]">
            <span className="inline-flex rounded-full border border-[#FF4A01]/25 bg-[#FF4A01]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF4A01]">
              PRICE GUIDE
            </span>
            <h2 className="mt-3 max-w-[22ch] text-3xl font-bold tracking-tight text-[#14161B] md:max-w-none md:text-5xl">
              Clothing Alterations
            </h2>
            <p className="mt-3 text-[#2A2F3A]">
              Clear starting prices for common alterations. Final cost confirmed at the fitting.
            </p>
            <p className="mt-2 text-xs text-[#5E6676]">All prices are “from” and may change depending on fabric and complexity.</p>
          </div>
        </div>

        <Accordion type="single" className="space-y-4">
          {pricingCategories.map((category, index) => (
            <AccordionItem
              key={category.title}
              value={`pricing-${index}`}
              className="overflow-hidden rounded-xl border border-white/30 bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0.2)), url(${category.image})` }}
            >
              <AccordionTrigger className="px-4 text-left text-2xl text-white md:px-6">
                {category.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 md:px-6">
                <div className="max-w-xl origin-top rounded-2xl bg-white/85 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-[2px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-open:rounded-md group-open:bg-white/95 group-open:shadow-[0_14px_40px_rgba(0,0,0,0.2)] group-open:backdrop-blur-sm">
                  <ul className="divide-y opacity-0 -translate-y-1 transition-[opacity,transform,filter] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none group-open:opacity-100 group-open:translate-y-0">
                    {category.prices.map(([name, price]) => (
                      <li key={name} className="flex items-center justify-between py-3 text-base">
                        <span className="text-[#2A2F3A]">{name}</span>
                        <span className="font-semibold text-[rgba(255,74,1,1)]">{price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { PricingAccordion };
