import type { NextPage } from "next";
import React from "react";
import styles from "./homePage.module.css";

// components
import ConnectOrDisconnectWallet from "../components/core/solanaLogInAndLogout/connectAndDisconnectView/connectAndDisconnectView";
import PoweredByHugs from "../components/feature/poweredByHugs";
import CoinsList from "../components/core/coinList/coinsList";

// types
import { HomePageProps } from "../core/types/types";

// prismaClient
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// eslint-disable-next-line require-jsdoc
export async function getServerSideProps() {
  // opschrijven in welke vollegorde we best fetchen
  // first fetch from coinGecko?

  const coins = await prisma.coin.findMany();
  return {
    props: {
      initialCoins: coins,
    },
  };
}

const Home: NextPage<HomePageProps> = (props) => {
  console.log(props);
  return (
    <div className={styles.index_full}>
      <div className={styles.coinsInfo_full}>
        <p>Change with coinData later</p>
      </div>
      <ConnectOrDisconnectWallet />

      <PoweredByHugs />

      <h1 className={styles.earnDapp_title}>Lorem ipsum slogan dimsum</h1>
      <p className={styles.earnDapp_slogan}>Dimsum your own lorum ipsum</p>

      <section className={styles.cryptoList}>
        <h1 className={styles.cryptoList_title}>CryptoCurrencies by Market Cap</h1>

        <CoinsList />
      </section>
    </div>
  );
};

export default Home;
