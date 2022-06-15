import "../public/static/styles/vars.css";
import "../public/static/styles/fonts.css";
import "../public/static/styles/reset.css";
import "../public/static/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

// set custom RPC server endpoint for the final website
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT ? process.env.NEXT_PUBLIC_ENDPOINT : "http://127.0.0.1:8899";
// ERROR -> NEXT_PUBLIC_ENDPOINT not in .env variables !!

const WalletProvider = dynamic(
    () => import("../contexts/ClientWalletProvider"),
    {
        ssr: false,
    }
);

// eslint-disable-next-line require-jsdoc
function MyApp({ Component, pageProps }: AppProps) {
    // const endpoint = useMemo(() => clusterApiUrl(network), []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider>
                <Component {...pageProps} />
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default MyApp;
