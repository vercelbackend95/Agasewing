import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function InteractiveHoverButton({
  children,
  className,
  mobileActive = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { mobileActive?: boolean }) {
  return (
    <button
      className={cn(
        "group bg-background relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "bg-primary h-2 w-2 rounded-full transition-all duration-300",
            mobileActive
              ? "scale-[100.8] md:scale-100 md:group-hover:scale-[100.8]"
              : "group-hover:scale-[100.8]",
          )}
        />
        <span
          className={cn(
            "inline-block transition-all duration-300",
            mobileActive
              ? "translate-x-12 opacity-0 md:translate-x-0 md:opacity-100 md:group-hover:translate-x-12 md:group-hover:opacity-0"
              : "group-hover:translate-x-12 group-hover:opacity-0",
          )}
        >
          {children}
        </span>
      </div>
      <div
        className={cn(
          "text-primary-foreground absolute top-0 z-10 flex h-full w-full items-center justify-center gap-2 transition-all duration-300",
          mobileActive
            ? "-translate-x-5 opacity-100 md:translate-x-12 md:opacity-0 md:group-hover:-translate-x-5 md:group-hover:opacity-100"
            : "translate-x-12 opacity-0 group-hover:-translate-x-5 group-hover:opacity-100",
        )}
      >
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
}
