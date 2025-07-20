import { DatesProvider } from "@mantine/dates";
import type { AppProps } from "next/app";
import { QueryProvider } from "@/providers/query-provider";
import LoadingProvider from "@/providers/LoadingProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ChatBotProvider } from "@/components/ChatBot/ChatBotProvider";

import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "dayjs/locale/vi";
import "../styles/globals.css";
import '@mantine/notifications/styles.css';
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import 'mantine-react-table/styles.css'; //import MRT styles

export default function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as any).getLayout || ((page: React.ReactNode) => page);

  return (
    <QueryProvider>
      <ThemeProvider>
        <LoadingProvider>
          <DatesProvider
            settings={{
              locale: "en",
              firstDayOfWeek: 1,
            }}
          >
            <MantineProvider>
              <Notifications
                position="top-right"
                autoClose={5000}
                zIndex={2077}
                transitionDuration={200}
                limit={5}
              />
              <ModalsProvider>
                <ChatBotProvider>
                  {getLayout(<Component {...pageProps} />)}
                </ChatBotProvider>
              </ModalsProvider>
            </MantineProvider>
          </DatesProvider>
        </LoadingProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
