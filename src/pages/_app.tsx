import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "../wagmi";
import "../globals.css";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <NextHead>
          <title>destroyer</title>
        </NextHead>
        {mounted && <Component {...pageProps} />}
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;
