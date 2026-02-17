// src/components/sections/About15.tsx
import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";

interface About15Props {
  className?: string;
}

const About15 = ({ className }: About15Props) => {
  const patternBackgroundStyle = {
    backgroundImage: "url('/pictures/fabric_1.webp')",
    backgroundRepeat: "repeat",
    backgroundSize: "400px 400px",
  };

  return (
    <section id="about" className={cn("bg-white py-32 text-[#2A2F3A]", className)} style={patternBackgroundStyle}>
      <div className="container mx-auto flex flex-col items-center justify-center gap-25 px-4 lg:flex-row lg:gap-[10vw]">
        <div className="w-xs rotate-[-6deg] border bg-white p-1">
          <img
            src="/pictures/aga.webp"
            alt="Portrait of sewing instructor"
            className="pointer-events-none h-110 w-full object-cover"
          />

          <div className="pt-2 pb-1">
            <p className="text-lg font-medium tracking-tight text-[#14161B]">Aga</p>
            <p className="text-sm text-[#5E6676]">
              <a href="https://www.facebook.com/Sewingataga/" target="_blank" rel="noreferrer">
                @sewingataga
              </a>
            </p>
          </div>
        </div>
        <div className="w-full max-w-[21.25rem] space-y-6">
          <h2 className="mb-15">
            <TextReveal>Your local tailor for the perfect fit.</TextReveal>
          </h2>
          <p className="text-sm text-[#2A2F3A] lg:text-base">
            I have been working in the tailoring industry for 30 years, during which I have crafted both women’s and
            men’s clothing. For 4 years, I specialized in sewing leather garments. Over the past 13 years, I have
            focused on clothing alterations, which bring me immense satisfaction and allow me to express my creativity
            by transforming dresses and other garments. However, my greatest joy comes from the happiness of my
            satisfied clients.
          </p>
        </div>
      </div>
    </section>
  );
};

export { About15 };
