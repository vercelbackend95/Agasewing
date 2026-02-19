import * as React from "react";

import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
  collapsible: boolean;
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  type: "multiple",
  collapsible: false,
  openItem: null,
  setOpenItem: () => undefined,
});

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

interface AccordionProps {
  children: React.ReactNode;
  type?: AccordionType;
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  collapsible?: boolean;
}

const Accordion = ({
  children,
  type = "multiple",
  className,
  value,
  defaultValue,
  onValueChange,
  collapsible = false,
}: AccordionProps) => {
  const [internalOpenItem, setInternalOpenItem] = React.useState<string | null>(defaultValue ?? null);
  const openItem = value ?? internalOpenItem;

  const setOpenItem = React.useCallback(
    (nextValue: string | null) => {
      if (value === undefined) {
        setInternalOpenItem(nextValue);
      }

      if (onValueChange) {
        onValueChange(nextValue);
      }
    },
    [onValueChange, value],
  );

  return (
    <AccordionContext.Provider value={{ type, collapsible, openItem, setOpenItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDetailsElement> {
  children: React.ReactNode;
  value: string;
}

const AccordionItem = ({ children, className, ...props }: AccordionItemProps) => {
  const { type, openItem } = React.useContext(AccordionContext);
  const isSingle = type === "single";
  const isOpen = openItem === props.value;

  return (
    <AccordionItemContext.Provider value={{ value: props.value, isOpen }}>
      <details className={cn("group", className)} open={isSingle ? isOpen : undefined} {...props}>
        {children}
      </details>
    </AccordionItemContext.Provider>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = ({ children, className }: AccordionTriggerProps) => {
  const accordionContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error("AccordionTrigger must be used within AccordionItem");
  }

  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    if (accordionContext.type !== "single") {
      return;
    }

    event.preventDefault();

    if (itemContext.isOpen) {
      if (accordionContext.collapsible) {
        accordionContext.setOpenItem(null);
      }

      return;
    }

    accordionContext.setOpenItem(itemContext.value);
  };

  return (
    <summary
      onClick={handleClick}
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
      className="grid grid-rows-[0fr] opacity-0 -translate-y-1 transition-[grid-template-rows,opacity,transform] duration-300 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none group-open:grid-rows-[1fr] group-open:opacity-100 group-open:translate-y-0"
    >
      <div className={cn("overflow-hidden pb-5", className)}>{children}</div>
    </div>
  );
};

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
