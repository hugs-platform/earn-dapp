import type { NextPage } from "next";
import React from "react";
import styles from "./homePage.module.css";
import SolanaLogin from "../components/core/solanaLogIn";

const Home: NextPage = () => {
  return (
    <div className={styles.index_full}>
      <SolanaLogin />
    </div>
  );
};

export default Home;
