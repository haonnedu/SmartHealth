import { useTheme } from "@/providers/ThemeProvider";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ThemedContainerProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "navbar" | "button";
}

export function ThemedContainer({
  children,
  className,
  variant = "primary",
}: ThemedContainerProps) {
  const { tenantTheme, isThemeChanging, themeStyles } = useTheme();

  const baseStyles = cn(
    "transition-all duration-300 ease-in-out",
    themeStyles.borderRadius,
    isThemeChanging && "opacity-0 scale-95",
    className
  );

  const variants = {
    primary: cn("bg-gradient-to-br", themeStyles.primaryGradient),
    secondary: cn(
      "bg-gradient-to-r",
      themeStyles.secondaryGradient,
      "text-white"
    ),
    accent: cn(
      "bg-gradient-to-br",
      `from-${themeStyles.accentColor}`,
      "to-transparent"
    ),
    navbar: cn(
      "navbar-gradient",
      "bg-gradient-to-r",
      themeStyles.navbarGradient,
      "text-black"
    ),
    button: cn(
      themeStyles.buttonColor,
      "text-black",
    ),
  };

  return <div className={cn(baseStyles, variants[variant])}>{children}</div>;
}
