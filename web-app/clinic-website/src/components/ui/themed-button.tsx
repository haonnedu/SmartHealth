import { useTheme } from "@/providers/ThemeProvider";
import { Button, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ThemedButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

export function ThemedButton({
  children,
  className,
  variant = "primary",
  ...props
}: ThemedButtonProps) {
  const { tenantTheme, isThemeChanging, themeStyles } = useTheme();

  const baseStyles = cn(
    "transition-all duration-300 ease-in-out transform",
    themeStyles.borderRadius,
    isThemeChanging && "opacity-0 scale-95",
    "hover:scale-105",
    className
  );

  const getGradient = (variant: string) => {
    switch (variant) {
      case "primary":
        return { from: tenantTheme.primaryColor, to: tenantTheme.primaryColor };
      case "secondary":
        return {
          from: themeStyles.secondaryGradient.split(" ")[1],
          to: themeStyles.secondaryGradient.split(" ")[3],
        };
      case "accent":
        return {
          from: themeStyles.accentColor,
          to: `${tenantTheme.primaryColor}-700`,
        };
      default:
        return { from: tenantTheme.primaryColor, to: tenantTheme.primaryColor };
    }
  };

  return (
    <Button
      className={baseStyles}
      variant={themeStyles.buttonVariant}
      gradient={getGradient(variant)}
      {...props}
    >
      {children}
    </Button>
  );
}
