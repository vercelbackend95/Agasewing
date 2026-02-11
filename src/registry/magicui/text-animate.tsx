import { cn } from "@/lib/utils";

interface TextAnimateProps {
  children: string;
  animation?: "blurInUp";
  by?: "character" | "word";
  once?: boolean;
  className?: string;
}

const getSegments = (text: string, by: "character" | "word") => {
  if (by === "word") {
    return text.split(" ").map((segment, index, array) => (index < array.length - 1 ? `${segment} ` : segment));
  }

  return Array.from(text);
};

export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "character",
  once = true,
  className,
}: TextAnimateProps) {
  const segments = getSegments(children, by);

  return (
    <>
      <span className={cn("inline-block", className)} aria-label={children}>
        {segments.map((segment, index) => (
          <span
            key={`${segment}-${index}`}
            aria-hidden="true"
            className={cn("inline-block whitespace-pre", animation === "blurInUp" && "text-animate-blur-in-up")}
            style={{
              animationDelay: `${index * 0.04}s`,
              animationFillMode: once ? "both" : "both",
            }}
          >
            {segment}
          </span>
        ))}
      </span>

      <style>{`
        .text-animate-blur-in-up {
          opacity: 0;
          filter: blur(8px);
          transform: translateY(12px);
          animation: text-animate-blur-in-up 0.55s ease-out forwards;
        }

        @keyframes text-animate-blur-in-up {
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
