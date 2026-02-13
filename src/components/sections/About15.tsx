import { TextAnimate } from "@/registry/magicui/text-animate";
import { cn } from "@/lib/utils";

interface About15Props {
  className?: string;
}

const About15 = ({ className }: About15Props) => {
  return (
    <section id="about" className={cn("bg-neutral-950 py-32 text-white", className)}>
      <div className="container mx-auto flex flex-col items-center justify-center gap-25 px-4 lg:flex-row lg:gap-[10vw]">
        <div className="w-xs rotate-[-6deg] border bg-white p-1">
          <img
            src="/pictures/aga.webp"
            alt="Portrait of sewing instructor"
            className="pointer-events-none h-110 w-full object-cover"
          />

          <div className="pt-2 pb-1">
            <p className="text-lg font-medium tracking-tight text-neutral-950">Aga</p>
            <p className="text-sm text-neutral-950/50">
              <a href="https://www.facebook.com/Sewingataga/" target="_blank" rel="noreferrer">
                @sewingataga
              </a>
            </p>
          </div>
        </div>
        <div className="w-full max-w-[21.25rem] space-y-6">
          <h2 className="mb-15 text-5xl font-medium tracking-tight">
            <TextAnimate animation="blurInUp" by="word" once>
              Your local tailor for the perfect fit.
            </TextAnimate>
          </h2>
          <p className="text-sm lg:text-base">
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
