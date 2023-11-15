import { InfoProvider } from "@/context/info";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InfoProvider>
      <Component {...pageProps} />
    </InfoProvider>
  );
}
