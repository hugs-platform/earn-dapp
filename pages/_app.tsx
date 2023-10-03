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
import Script from "next/script";

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
                    <title>(Alpha) Earn Markets</title>
                    <link href="https://use.fontawesome.com/releases/v6.4.0/css/all.css" rel="stylesheet"/>
                    <Favicon url="/favicon.ico"/>
                </Head>
                <Component {...pageProps} />
                <Script src={widget}
                        strategy='beforeInteractive'/>
                <Script>
                    {`
                 if (!document.getElementById('widget-root')) {
        let HB = window.HB
        new HB({             
            position: 'bottom-left',             
            widgetId: 'f99a973a-4591-11ee-9dde-0a58a9feac02',             
            apiUrl: 'https://api.app.crtr.tech/',             
            appId: '63f32751fbb45d9b726276d9'         
        })}`}
                </Script>
            </Provider>
        </DAppProvider>
    );
}

export default App;
