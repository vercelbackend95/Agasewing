import * as React from "react";

import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
}

const AccordionContext = React.createContext<AccordionContextValue>({ type: "multiple" });

interface AccordionProps {
  children: React.ReactNode;
  type?: AccordionType;
  className?: string;
}

const Accordion = ({ children, type = "multiple", className }: AccordionProps) => {
  return (
    <AccordionContext.Provider value={{ type }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDetailsElement> {
  children: React.ReactNode;
  value: string;
}

const AccordionItem = ({ children, className, ...props }: AccordionItemProps) => {
  const { type } = React.useContext(AccordionContext);

  return (
    <details className={cn("group", className)} open={type === "single" ? false : undefined} {...props}>
      {children}
    </details>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = ({ children, className }: AccordionTriggerProps) => {
  return (
    <summary
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-3 py-5 font-semibold",
        "[&::-webkit-details-marker]:hidden",
        className,
      )}
    >
      {children}
      <span className="text-lg transition-transform duration-200 group-open:rotate-180">▾</span>
    </summary>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps) => {
  return <div className={cn("pb-5", className)}>{children}</div>;
};

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
