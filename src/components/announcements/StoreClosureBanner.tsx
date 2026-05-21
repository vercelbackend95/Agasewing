import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

import { isClosureBannerVisible } from "@/lib/store-closure";
import { cn } from "@/lib/utils";

const contactLinkClass =
  "shrink-0 self-center rounded-full px-1 py-0.5 text-sm font-semibold underline underline-offset-4 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:self-auto";

export default function StoreClosureBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isClosureBannerVisible());
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <section
      role="region"
      aria-label="Store closure notice"
      className="border-b border-primary-foreground/20 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 py-3 md:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 items-start justify-center gap-2 sm:justify-start">
            <CalendarDays className="mt-0.5 hidden size-4 shrink-0 sm:block" aria-hidden />
            <p className="min-w-0 text-center text-sm leading-relaxed sm:text-left">
              <span className="font-semibold">Temporary closure. </span>
              <span className="sm:hidden">
                Closed 27 May–2 June 2026. Reopens Wed 3 June.
              </span>
              <span className="hidden sm:inline">
                We&apos;re closed from Tuesday 27 May to Tuesday 2 June 2026. We&apos;ll reopen on
                Wednesday 3 June.
              </span>
            </p>
          </div>
          <a href="/#contact" className={cn(contactLinkClass)}>
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
