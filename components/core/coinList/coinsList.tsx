import React, { FC } from "react";
import styles from "./coinsList.module.css";

// store
import { useStore } from "../../../store/store";

// components
import OneCoin from "./oneCoin/oneCoin";

const CoinsList: FC = () => {
  // state
  const coinInfo = useStore((state) => state.coins.coinInfo);

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
        {coinInfo.map((oneCoin: any) => (
          <OneCoin key={oneCoin.id} oneCoinInfo={oneCoin} />
        ))}
      </div>
    </>
  );
};

export default CoinsList;
