import * as React from "react";
import { cn } from "@/lib/utils"; // Hàm tiện ích ghép class

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        variant?: "default" | "outline" | "solid";
    }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children , variant= "default", ...props }, ref) => {
      return (
          <button
              className={cn(
                  "inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium",
                  className
              )}
              ref={ref}
              {...props}
          >
            {children}
          </button>
      );
    }
);

Button.displayName = "Button";
