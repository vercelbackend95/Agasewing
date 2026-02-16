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
      ["Taper Trousers Legs", "£22"],
      ["Taper Jeans Legs", "£24"],
      ["Waist Adjustment", "£22"],
      ["Repairs", "£8"],
      ["Zip Replacement", "£16"],
      ["Trousers Shortening", "£14"],
      ["Suit Trousers", "£14"],
      ["With Tape", "£15"],
      ["Turn Ups", "£18"],
      ["New Pocket (½)", "£14"],
      ["New Full Pocket", "£22"],
    ],
  },
  {
    title: "Shirts & Blouses",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=2000&q=80",
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
    title: "Bridal Dresses",
    image:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Hem Shortening", "£30"],
      ["Side Adjustment", "£26"],
      ["Strap Shortening", "£14"],
    ],
  },
  {
    title: "Skirts",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Shortening", "£14"],
      ["Zip Replacement", "£18"],
      ["Waist Adjustment", "£18"],
    ],
  },
  {
    title: "Jackets & Coats",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=2000&q=80",
    prices: [
      ["Zip Replacement", "£32"],
      ["Pocket Zip", "£22"],
      ["Sleeve Shortening", "£42"],
      ["Coat Shortening", "£40"],
      ["Length Adjustment", "£25"],
      ["Side Adjustment", "£26"],
      ["Back Adjustment", "£20"],
    ],
  },
  {
    title: "Curtains",
    image:
      "https://images.unsplash.com/photo-1616628182509-6c9818611434?auto=format&fit=crop&w=2000&q=80",
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
        <p className="text-center text-sm font-medium uppercase tracking-[0.12em] text-[rgba(255,74,1,1)]">
          A price guide for the perfect fit.
        </p>
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-5xl">Clothing Alterations</h2>

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
