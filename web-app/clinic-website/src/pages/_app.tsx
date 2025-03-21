// src/pages/_app.tsx (ví dụ Pages Router)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { KeycloakProvider } from "@/contexts/KeycloakContext";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KeycloakProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </KeycloakProvider>
  );
}
