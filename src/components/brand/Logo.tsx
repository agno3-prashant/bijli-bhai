import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="BijliBhai home"
    >
      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl",
          isLight ? "bg-yellow shadow-glow" : "bg-navy-950 shadow-glow",
        )}
      >
        <Zap
          className={cn(
            "h-5 w-5",
            isLight ? "fill-navy-950 text-navy-950" : "fill-yellow text-yellow",
          )}
          aria-hidden
        />
      </span>
      <span
        className={cn(
          "font-display text-[1.15rem] font-bold tracking-tight",
          isLight ? "text-white" : "text-navy-950",
        )}
      >
        BijliBhai
      </span>
    </Link>
  );
}
