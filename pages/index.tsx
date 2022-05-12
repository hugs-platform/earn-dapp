import type { NextPage } from "next";
import React from "react";
import styles from "./homePage.module.css";
import LogIn from "../components/core/solanaLogIn";

const Home: NextPage = () => {
  return (
    <div className={styles.index_full}>
      <LogIn />
    </div>
  );
};

export default Home;
