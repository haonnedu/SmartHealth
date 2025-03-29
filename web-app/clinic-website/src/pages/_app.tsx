// src/pages/_app.tsx (ví dụ Pages Router)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DatesProvider } from "@mantine/dates";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";

import "../styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "dayjs/locale/vi";

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </DatesProvider>
    </MantineProvider>
  );
}
