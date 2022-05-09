import "../public/static/styles/vars.css";
import "../public/static/styles/fonts.css";
import "../public/static/styles/reset.css";
import "../public/static/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";

// eslint-disable-next-line require-jsdoc
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
