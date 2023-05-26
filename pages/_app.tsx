import "../public/static/styles/vars.css";
import "../public/static/styles/fonts.css";
import "../public/static/styles/reset.css";
import "../public/static/styles/globals.css";
import React from "react";
import type {AppProps} from "next/app";
import {DAppProvider, Config, Mainnet} from "@usedapp/core"
import {Provider} from "react-redux";
import store from "../services/store/store";
import Favicon from "react-favicon";
import Head from "next/head";

/**
 * Configuration for connect to Infura network
 */
const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: `https://mainnet.infura.io/v3/` + process.env.NEXT_PUBLIC_INFURA_ID,
    },
}

const widget = process.env.NEXT_PUBLIC_HUGBUNTERS_WIDGET_URL

/**
 * @class
 * @ignore
 */
function App({Component, pageProps}: AppProps) {
    return (
        <DAppProvider config={config}>
            <Provider store={store}>
                <Head>
                    <script type="module" src={widget}/>
                    <title>(Alpha) Earn Markets</title>
                    <link href="https://use.fontawesome.com/releases/v6.4.0/css/all.css" rel="stylesheet"/>
                    <Favicon url="/favicon.ico"/>
                </Head>
                <Component {...pageProps} />
            </Provider>
        </DAppProvider>
    );
}

export default App;
