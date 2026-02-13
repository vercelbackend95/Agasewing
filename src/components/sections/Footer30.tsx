// src/components/sections/Footer30.tsx
import { CircleArrowOutUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const NAVIGATION = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/Sewingataga/" },
];

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

interface Footer30Props {
  className?: string;
}

const Footer30 = ({ className }: Footer30Props) => {
  return (
    <section className={cn("pt-32 pb-0", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-15 lg:flex-row">
          <div className="flex flex-col gap-2">
            <a className="font-medium tracking-tight" href="">
              07514 776088
            </a>
            <a className="relative text-3xl font-semibold tracking-tight lg:text-4xl" href="">
              sewingataga@gmail.com
            </a>
          </div>
          <div className="flex gap-30">
            <ul className="space-y-1">
              <li className="mb-5 text-sm font-medium tracking-tight text-foreground/40">Navigate</li>
              {NAVIGATION.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-xl font-semibold tracking-tight">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              <li className="mb-5 text-sm font-medium tracking-tight text-foreground/40">Social</li>
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="group flex items-center gap-2 text-xl font-semibold tracking-tight">
                    {item.label}{" "}
                    <CircleArrowOutUpRight className="size-3.5 text-muted-foreground/50 group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-[clamp(2.5rem,13vw,10rem)] font-semibold leading-none tracking-tighter whitespace-nowrap">
          Sewing At Aga&apos;s
        </div>
        <div className="dark relative mt-20 flex h-24 w-full flex-col items-center justify-center gap-2 bg-background text-sm tracking-tight text-foreground lg:h-30 lg:flex-row lg:justify-between lg:gap-4 lg:text-base">
          <div className="relative z-2 flex items-center gap-4 lg:gap-10">
            <p className="text-foreground/50">&copy;2025 shadcnblocks All rights reserved</p>
          </div>
          <div className="relative z-2 flex items-center gap-4 lg:gap-10">
            {FOOTER_LINKS.map((item, index) => (
              <a href={item.href} className="text-foreground/50 transition-colors hover:text-foreground" key={index}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="absolute left-1/2 h-full w-screen -translate-x-1/2 bg-background" />
        </div>
      </div>
    </section>
  );
};

export { Footer30 };
