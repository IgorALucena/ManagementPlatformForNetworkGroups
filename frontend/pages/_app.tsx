import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
