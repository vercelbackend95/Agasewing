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
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Jeans Shortening", "£13"],
      ["Original Hem", "£14"],
      ["Button Replacement", "£8"],
      ["Taper Legs", "£16"],
      ["Waist Adjustment", "£20"],
      ["Zip Replacement", "£16"],
    ],
  },
  {
    title: "Shirts & Blouses",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Shorten Sleeves", "£12"],
      ["Take In Sides", "£14"],
      ["Collar Repair", "£10"],
      ["Button Replacement", "£8"],
    ],
  },
  {
    title: "Bridal Dresses",
    image:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Dress Shortening", "from £45"],
      ["Take In Bodice", "from £55"],
      ["Bustle", "from £35"],
      ["Lace Repair", "from £28"],
    ],
  },
  {
    title: "Skirts",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Skirt Shortening", "£12"],
      ["Zip Replacement", "£14"],
      ["Take In Waist", "£16"],
      ["Lining Repair", "£14"],
    ],
  },
  {
    title: "Jackets & Coats",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Sleeve Shortening", "from £20"],
      ["Zip Replacement", "from £22"],
      ["Lining Repair", "from £24"],
      ["Button Replacement", "£10"],
    ],
  },
  {
    title: "Curtains",
    image:
      "https://images.unsplash.com/photo-1616628182509-6c9818611434?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Shorten Curtains", "from £18"],
      ["Add Lining", "from £20"],
      ["Repair Hem", "£12"],
      ["Tape Replacement", "£14"],
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
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-[rgba(255,74,1,1)]">
          A price guide for the perfect fit.
        </p>
        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-5xl">Clothing Alterations</h1>

        <Accordion type="multiple" className="space-y-4">
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
                  <ul className="divide-y transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none">
                    {category.prices.map(([name, price]) => (
                      <li key={name} className="flex items-center justify-between py-3 text-base">
                        <span className="text-neutral-700">{name}</span>
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
