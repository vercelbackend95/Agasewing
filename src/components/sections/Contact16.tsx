// src/components/sections/Contact16.tsx
import { CornerDownRight, Mail, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";

interface Contact16Props {
  className?: string;
}

const Contact16 = ({ className }: Contact16Props) => {
  return (
    <section className={cn("dark bg-background py-32 text-foreground", className)} id="contact">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-semibold tracking-tight lg:text-8xl">
          Let’s get your fit right.
        </h1>
        <div className="mt-20 flex flex-col justify-between gap-10 lg:flex-row">
          <div className="w-full max-w-md">
            <p className="tracking-tight text-muted-foreground/50">
              Bring your piece to life again. Share a few details — we’ll guide you from fitting to collection.
            </p>
            <div className="mt-10 flex justify-between">
              <a className="flex items-center gap-1 text-foreground/40 hover:text-foreground" href="tel:07514776088">
                <Smartphone className="h-4 w-4" /> 07514 776088
              </a>
              <a className="flex items-center gap-1 text-foreground/40 hover:text-foreground" href="mailto:sewingataga@gmail.com">
                <Mail className="h-4 w-4" /> sewingataga@gmail.com
              </a>
            </div>
          </div>
          <form action="/api/contact" className="col-span-4 flex w-full flex-col gap-2 lg:pl-30" method="POST">
            <input
              type="text"
              name="name"
              required
              placeholder="Name*"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email*"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <input
              type="text"
              name="message"
              required
              placeholder="Message (Tell us about your project)"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <button type="submit" className="mt-15 flex h-15 items-center justify-start gap-2 text-base">
              <CornerDownRight className="size-6" />
              Let’s get your fit right.
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Contact16 };
