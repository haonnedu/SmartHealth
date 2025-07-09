import { ThemeColor, ThemeMode } from "@/styles/theme";

export interface TenantTheme {
  primaryColor: ThemeColor;
  mode: ThemeMode;
  logo?: string;
  brandName: string;
}

// This would typically come from your backend API
const tenantThemes: Record<string, TenantTheme> = {
  clinic1: {
    primaryColor: "pink",
    mode: "light",
    brandName: "SmartHealth Pink",
    logo: "/images/Health_care.png",
  },
  clinic2: {
    primaryColor: "blue",
    mode: "light",
    brandName: "SmartHealth Blue",
    logo: "/images/Health_care_blue.png",
  },
  clinic3: {
    primaryColor: "teal",
    mode: "dark",
    brandName: "SmartHealth Teal",
    logo: "/images/Health_care_teal.png",
  },
};

const defaultTheme: TenantTheme = {
  primaryColor: "blue",
  mode: "light",
  brandName: "SmartHealth",
  logo: "/images/Health_care.png",
};

export function getTenantFromSubdomain(hostname: string): string {
  console.log("Parsing hostname:", hostname);

  // Development environments
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    // Check if using format: clinic1.localhost:3000
    const parts = hostname.split(".");
    if (parts.length > 1) {
      const subdomain = parts[0];
      if (tenantThemes[subdomain]) {
        console.log("Development subdomain detected:", subdomain);
        return subdomain;
      }
    }

    // For localhost without subdomain, check URL path
    // This allows testing with localhost:3000/clinic1, localhost:3000/clinic2, etc.
    if (typeof window !== "undefined") {
      const path = window.location.pathname.split("/")[1];
      if (tenantThemes[path]) {
        console.log("Development path tenant detected:", path);
        return path;
      }
    }
  }

  // Production environment
  const parts = hostname.split(".");
  if (parts.length > 2) {
    const subdomain = parts[0];
    console.log("Production subdomain detected:", subdomain);
    return subdomain;
  }

  console.log("No tenant detected, using default");
  return "default";
}

export function getTenantTheme(hostname: string): TenantTheme {
  const tenant = getTenantFromSubdomain(hostname);
  const theme = tenantThemes[tenant] || defaultTheme;
  console.log("Selected theme for tenant:", tenant, theme);
  return theme;
}

// Helper function to get theme-specific styles
export function getThemeStyles(theme: TenantTheme) {
  const colorMap = {
    pink: {
      gradient: "from-pink-100 to-pink-50",
      accent: "pink-600",
      secondary: "from-pink-500 to-violet-500",
      navbar: "from-pink-400 to-pink-50",
      button: "bg-pink-500 text-white",
    },
    blue: {
      gradient: "from-blue-100 to-blue-50",
      accent: "blue-600",
      secondary: "from-blue-500 to-indigo-500",
      navbar: "from-blue-400 to-blue-50",
      button: "bg-blue-500 text-white",
    },
    teal: {
      gradient:
        theme.mode === "dark"
          ? "from-teal-900 to-teal-800"
          : "from-teal-100 to-teal-50",
      accent: theme.mode === "dark" ? "teal-400" : "teal-600",
      secondary: "from-teal-500 to-emerald-500",
      navbar: "from-teal-400 to-teal-50",
      button: "bg-teal-500 text-white",
    },
    violet: {
      gradient: "from-violet-100 to-violet-50",
      accent: "violet-600",
      secondary: "from-violet-500 to-purple-500",
      navbar: "from-violet-400 to-violet-50",
      button: "bg-violet-500 text-white",
    },
  };

  return {
    primaryGradient: colorMap[theme.primaryColor as keyof typeof colorMap].gradient,
    secondaryGradient: colorMap[theme.primaryColor as keyof typeof colorMap].secondary,
    navbarGradient: colorMap[theme.primaryColor as keyof typeof colorMap].navbar,
    accentColor: colorMap[theme.primaryColor as keyof typeof colorMap].accent,
    borderRadius: "rounded-lg",
    buttonColor: colorMap[theme.primaryColor as keyof typeof colorMap].button,
    buttonVariant: theme.mode === "dark" ? "outline" : "filled",
  };
}
