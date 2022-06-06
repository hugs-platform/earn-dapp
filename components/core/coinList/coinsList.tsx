import React from "react";
import styles from "./coinsList.module.css";

// images

// helper functions

// components
import OneCoin from "./oneCoin/oneCoin";

// data

const CoinsList = () => {
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
      <OneCoin
        title="Bitcoin"
        content="Hier komen de top 5 exchanges van Bitcoin"
      />
      <OneCoin
        title="Ethereum"
        content="Hier komen de top 5 exchanges van Ethereum"
      />
      <OneCoin
        title="Solana"
        content="Hier komen de top 5 exchanges van Solana"
      />
    </>
  );
};

export default CoinsList;
