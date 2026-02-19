import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-background text-foreground border border-border rounded-sm shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Card };
