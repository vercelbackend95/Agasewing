import * as React from "react";

import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
  openItem: string | null;
  setOpenItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  type: "multiple",
  openItem: null,
  setOpenItem: () => null,
});

interface AccordionProps {
  children: React.ReactNode;
  type?: AccordionType;
  className?: string;
}

const Accordion = ({ children, type = "multiple", className }: AccordionProps) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ type, openItem, setOpenItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDetailsElement> {
  children: React.ReactNode;
  value: string;
}

const AccordionItem = ({ children, className, ...props }: AccordionItemProps) => {
  const { type, openItem, setOpenItem } = React.useContext(AccordionContext);
  const isSingle = type === "single";
  const isOpen = openItem === props.value;

  const handleToggle: React.DetailsHTMLAttributes<HTMLDetailsElement>["onToggle"] = (event) => {
    if (!isSingle) {
      return;
    }

    const element = event.currentTarget;
    setOpenItem(element.open ? props.value : null);
  };

  return (
    <details
      className={cn("group", className)}
      open={isSingle ? isOpen : undefined}
      onToggle={handleToggle}
      {...props}
    >
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
      <span className="text-lg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-open:rotate-180">
        ▾
      </span>
    </summary>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps) => {
  return (
    <div
      className="grid grid-rows-[0fr] opacity-0 blur-[2px] -translate-y-1 transition-[grid-template-rows,opacity,transform,filter] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:blur-none motion-reduce:transition-none group-open:grid-rows-[1fr] group-open:opacity-100 group-open:translate-y-0 group-open:blur-none"
    >
      <div className={cn("overflow-hidden pb-5", className)}>{children}</div>
    </div>
  );
};

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
