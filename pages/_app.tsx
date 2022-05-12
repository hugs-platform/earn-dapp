import "../public/static/styles/vars.css";
import "../public/static/styles/fonts.css";
import "../public/static/styles/reset.css";
import "../public/static/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

// const SOLANA_NETWORK = WalletAdapterNetwork.Mainnet;
const SOLANA_NETWORK = WalletAdapterNetwork.Devnet;
const network = SOLANA_NETWORK;

// set custom RPC server endpoint for the final website
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT ? process.env.NEXT_PUBLIC_ENDPOINT : "http://127.0.0.1:8899";

const WalletProvider = dynamic(
    () => import("../contexts/ClientWalletProvider"),
    {
        ssr: false,
    }
);

function MyApp({ Component, pageProps }: AppProps) {
    //const endpoint = useMemo(() => clusterApiUrl(network), []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider>
                <Component {...pageProps} />
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default MyApp;
