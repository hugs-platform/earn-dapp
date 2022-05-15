import type { NextPage } from "next";
import React from "react";
import styles from "./homepage.module.css";
import ConnectOrDisconnectWallet from "../components/core/solanaLogInAndLogout/connectAndDisconnectView";

const Home: NextPage = () => {
  return (
    <div className={styles.index_full}>
      <ConnectOrDisconnectWallet />
    </div>
  );
};

export default Home;
