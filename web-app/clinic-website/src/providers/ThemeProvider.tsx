import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MantineProvider, LoadingOverlay } from "@mantine/core";
import { ThemeColor, ThemeMode, getTheme } from "@/styles/theme";
import {
  getTenantTheme,
  TenantTheme,
  getThemeStyles,
} from "@/lib/tenant/tenant-theme.service";

interface ThemeContextType {
  themeColor: ThemeColor;
  themeMode: ThemeMode;
  tenantTheme: TenantTheme;
  isThemeChanging: boolean;
  themeStyles: ReturnType<typeof getThemeStyles>;
  setTenantTheme: (theme: TenantTheme) => void;
  setIsThemeChanging: (isChanging: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [tenantTheme, setTenantTheme] = useState<TenantTheme>({
    primaryColor: "pink",
    mode: "light",
    brandName: "SmartHealth",
    logo: "/images/Health_care.png",
  });
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [themeStyles, setThemeStyles] = useState(getThemeStyles(tenantTheme));

  // Update theme styles when tenant theme changes
  useEffect(() => {
    setThemeStyles(getThemeStyles(tenantTheme));
  }, [tenantTheme]);

  useEffect(() => {
    const updateTheme = () => {
      if (typeof window !== "undefined") {
        console.log(
          "Updating theme based on hostname:",
          window.location.hostname
        );
        setIsThemeChanging(true);

        const newTheme = getTenantTheme(window.location.hostname);
        console.log("New theme:", newTheme);

        setTenantTheme(newTheme);

        // Add a small delay to ensure smooth transition
        setTimeout(() => setIsThemeChanging(false), 300);
      }
    };

    // Initial theme setup
    updateTheme();

    // Listen for subdomain changes (if using client-side routing)
    window.addEventListener("popstate", updateTheme);

    return () => {
      window.removeEventListener("popstate", updateTheme);
    };
  }, []);

  const value = {
    themeColor: tenantTheme.primaryColor,
    themeMode: tenantTheme.mode,
    tenantTheme,
    isThemeChanging,
    themeStyles,
    setTenantTheme,
    setIsThemeChanging,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MantineProvider
        theme={{
          ...getTheme(tenantTheme.primaryColor, tenantTheme.mode),
          other: {
            colorTransition: "all 0.3s ease",
          },
        }}
      >
        <div style={{ position: "relative" }}>
          <LoadingOverlay
            visible={isThemeChanging}
            zIndex={1000}
            overlayProps={{ blur: 2 }}
            loaderProps={{ variant: "bars", color: tenantTheme.primaryColor }}
          />
          {children}
        </div>
      </MantineProvider>
    </ThemeContext.Provider>
  );
}
