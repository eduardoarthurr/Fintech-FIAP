"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-green-500",
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <Loader2
        color={color}
        className={cn(`animate-spin`, sizeClasses[size])}
      />
    </div>
  );
};

export { Spinner };
