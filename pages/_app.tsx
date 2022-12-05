import "../public/static/styles/vars.css";
import "../public/static/styles/fonts.css";
import "../public/static/styles/reset.css";
import "../public/static/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { DAppProvider, Config, Mainnet } from "@usedapp/core"
import { getDefaultProvider } from 'ethers'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: `https://mainnet.infura.io/v3/` + process.env.NEXT_PUBLIC_INFURA_ID,
    },
  }

function App({ Component, pageProps }: AppProps) {

    return (
        <DAppProvider config={config}>
            <Component {...pageProps} />
        </DAppProvider>
    );
}

export default App;
