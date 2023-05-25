import "../public/static/styles/vars.css";
import "../public/static/styles/fonts.css";
import "../public/static/styles/reset.css";
import "../public/static/styles/globals.css";
import React from "react";
import type {AppProps} from "next/app";
import {DAppProvider, Config, Mainnet} from "@usedapp/core"
import {Provider} from "react-redux";
import store from "../services/store/store";

/**
 * Configuration for connect to Infura network
 */
const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: `https://mainnet.infura.io/v3/` + process.env.NEXT_PUBLIC_INFURA_ID,
    },
}

/**
 * @class
 * @ignore
 */
function App({Component, pageProps}: AppProps) {
    return (
        <DAppProvider config={config}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </DAppProvider>
    );
}

export default App;
