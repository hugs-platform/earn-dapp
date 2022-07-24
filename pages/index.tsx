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

// store
import { useStore } from "../store/store";

const prisma = new PrismaClient();

// eslint-disable-next-line require-jsdoc
export async function getServerSideProps() {

  const coins = await prisma.coin.findMany({
    take: 50, // max limit 50 coins
    include: {
      apys: {
        take: 5,
        orderBy: {
          apy: "desc",
        },
        include: {
          project: true,
        },
      },
    }, // max-limit to 5 apy's
  });

  return {
    props: {
      initialCoins: JSON.parse(JSON.stringify(coins)),
    },
  };
}

const Home: NextPage<HomePageProps> = (props) => {
  const { initialCoins } = props;

  // error -> geeft in het begin nog 100 coins mee + geeft coins mee op basis van de render
  // adds this to state
  // addCoinInfo(props.initialCoins);

  const updateObject = useStore((state) => state.updateObject);
  updateObject("coins", "coinInfo", initialCoins);

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
