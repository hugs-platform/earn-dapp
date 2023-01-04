import type { NextPage } from "next";
import React from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";

import styles from "./homePage.module.css";

// components
import CoinsList from "../components/core/coinGecko/coinMarket/coinList";
import ConnectButton from "../components/core/metaMask/authentications";
import AccountModal from "../components/core/metaMask/accountModal";
import Layout from "../components/core/Layout";


// types
import { HomePageProps } from "../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.index_full}>
      <ChakraProvider>
        <Layout>
          <ConnectButton handleOpenModal={onOpen}/>
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Layout>
      </ChakraProvider>

      <section className={styles.cryptoList}>
        <CoinsList />
      </section>
    </div>
  );
};

export default Home;
