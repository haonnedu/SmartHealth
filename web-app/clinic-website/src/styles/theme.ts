import { MantineThemeOverride, MantineTheme } from "@mantine/core";

export type ThemeMode = "light" | "dark";
export type ThemeColor = "pink" | "blue" | "teal" | "violet" | "navbar";

const baseTheme: MantineThemeOverride = {
  fontFamily: "Roboto Slab, sans-serif",
  headings: {
    fontFamily: "Roboto Slab, sans-serif",
    sizes: {
      h1: { fontSize: "2.5rem" },
      h2: { fontSize: "2rem" },
      h3: { fontSize: "1.75rem" },
      h4: { fontSize: "1.5rem" },
      h5: { fontSize: "1.25rem" },
      h6: { fontSize: "1rem" },
    },
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        padding: "lg",
      },
    },
    NavLink: {
      styles: {
        root: {
          fontWeight: 500,
        },
      },
    },
    Navbar: {
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor:
            (theme as any).colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
        },
      }),
    },
  },
};

const themeColors = {
  pink: {
    colors: {
      pink: [
        "#FFF0F7",
        "#FFE3EE",
        "#FFB8D2",
        "#FF8CBA",
        "#F364A2",
        "#E8368F",
        "#DA127D",
        "#BC0A6F",
        "#A30664",
        "#870557",
      ] as const,
    },
    primaryColor: "pink" as const,
  },
  blue: {
    colors: {
      blue: [
        "#E6F6FF",
        "#BAE3FF",
        "#7CC4FA",
        "#47A3F3",
        "#2186EB",
        "#0967D2",
        "#0552B5",
        "#03449E",
        "#01337D",
        "#002159",
      ] as const,
    },
    primaryColor: "blue" as const,
  },
  teal: {
    colors: {
      teal: [
        "#E6FCF5",
        "#C3FAE8",
        "#96F2D7",
        "#63E6BE",
        "#38D9A9",
        "#20C997",
        "#12B886",
        "#0CA678",
        "#099268",
        "#087F5B",
      ] as const,
    },
    primaryColor: "teal" as const,
  },
  violet: {
    colors: {
      violet: [
        "#F3F0FF",
        "#E5DBFF",
        "#D0BFFF",
        "#B197FC",
        "#9775FA",
        "#845EF7",
        "#7950F2",
        "#7048E8",
        "#6741D9",
        "#5F3DC4",
      ] as const,
    },
    primaryColor: "violet" as const,
  },
  navbar: {
    colors: {
      navbar: [
        "#F3F0FF",
        "#E5DBFF",
        "#D0BFFF",
        "#B197FC",
        "#9775FA",
        "#845EF7",
        "#7950F2",
        "#7048E8",
        "#6741D9",
        "#5F3DC4",
      ] as const,
    },
    primaryColor: "navbar" as const,
  },
};

const themeModes = {
  light: {
    white: "#ffffff",
    black: "#2C3E50",
    colors: {
      gray: [
        "#F8F9FA",
        "#F1F3F5",
        "#E9ECEF",
        "#DEE2E6",
        "#CED4DA",
        "#ADB5BD",
        "#868E96",
        "#495057",
        "#343A40",
        "#212529",
      ] as const,
    },
  },
  dark: {
    white: "#1A1B1E",
    black: "#C1C2C5",
    colors: {
      dark: [
        "#C1C2C5",
        "#A6A7AB",
        "#909296",
        "#5C5F66",
        "#373A40",
        "#2C2E33",
        "#25262B",
        "#1A1B1E",
        "#141517",
        "#101113",
      ] as const,
    },
  },
};

export const getTheme = (
  color: ThemeColor = "blue",
  mode: ThemeMode = "light"
): MantineThemeOverride => {
  return {
    ...baseTheme,
    ...themeColors[color],
    ...themeModes[mode],
  };
};

export const defaultTheme = getTheme("blue", "light");
