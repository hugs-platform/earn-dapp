import React, { FC } from "react";
import styles from "./coinsList.module.css";

// images

// helper functions

// components
import OneCoin from "./oneCoin/oneCoin";

// data
import { coinInfo } from "../../../data/oneCoinData";

const CoinsList: FC = () => {
  return (
    <>
      <div className={styles.allCoins_container}>
        <p className={`${styles.allCoins_titles} ${styles.allCoins_titles_first}`}>Name</p>
        <p className={styles.allCoins_titles}>Price</p>
        <p className={styles.allCoins_titles}>Market Cap</p>
        <p className={styles.allCoins_titles}>Highest Apy</p>
        <p className={styles.allCoins_titles}>Update</p>
        <p className={styles.allCoins_titles}>Show more</p>
      </div>

      <div className={styles.allCoins_group}>
        {coinInfo.map((oneCoin) => (
          <OneCoin key={oneCoin.id} oneCoinInfo={oneCoin} />
        ))}
      </div>
    </>
  );
};

export default CoinsList;
