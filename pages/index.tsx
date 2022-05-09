import type { NextPage } from "next";
import React from "react";
import styles from "./homePage.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <p className={styles.test_1}>Inter</p>
      <p className={styles.test_2}>
        Almost before we knew it, we had left the ground.
      </p>
    </div>
  );
};

export default Home;
