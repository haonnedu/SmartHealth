import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import type { AppProps } from "next/app";
import { QueryProvider } from "@/providers/query-provider";

import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "dayjs/locale/vi";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as any).getLayout || ((page: React.ReactNode) => page);

  return (
    <MantineProvider>
      <DatesProvider
        settings={{
          locale: "en",
          firstDayOfWeek: 1,
        }}
      >
        <QueryProvider>{getLayout(<Component {...pageProps} />)}</QueryProvider>
      </DatesProvider>
    </MantineProvider>
  );
}
