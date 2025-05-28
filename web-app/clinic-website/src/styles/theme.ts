import { MantineThemeOverride, MantineColorsTuple } from "@mantine/core";

export type ThemeMode = "light" | "dark";
export type ThemeColor = "pink" | "blue" | "teal" | "violet";

const baseTheme: MantineThemeOverride = {
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
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
  },
};

const pinkColors: MantineColorsTuple = [
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
];

const blueColors: MantineColorsTuple = [
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
];

const tealColors: MantineColorsTuple = [
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
];

const violetColors: MantineColorsTuple = [
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
];

const grayColors: MantineColorsTuple = [
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
];

export const getTheme = (
  color: ThemeColor = "pink",
  mode: ThemeMode = "light"
): MantineThemeOverride => {
  const colorMap = {
    pink: pinkColors,
    blue: blueColors,
    teal: tealColors,
    violet: violetColors,
  };

  return {
    ...baseTheme,
    colors: {
      gray: grayColors,
      [color]: colorMap[color],
    },
    primaryColor: color,
    white: mode === "light" ? "#ffffff" : "#1A1B1E",
    black: mode === "light" ? "#2C3E50" : "#C1C2C5",
  };
};

export const defaultTheme = getTheme("pink", "light");
