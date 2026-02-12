import React from "react";

import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  className?: string;
  glow?: boolean;
  disabled?: boolean;
  spread?: number;
  proximity?: number;
  inactiveZone?: number;
}

const GlowingEffect = ({
  className,
  glow = true,
  disabled = false,
  spread = 40,
}: GlowingEffectProps) => {
  if (disabled || !glow) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-3xl",
        "bg-[radial-gradient(circle_at_top,rgba(255,74,1,0.2),transparent_60%)]",
        className,
      )}
      style={{
        filter: `blur(${Math.max(spread / 6, 4)}px)`,
      }}
    />
  );
};

export { GlowingEffect };
