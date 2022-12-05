import React, { FC, useEffect, useState } from "react";
import styles from "./coinsList.module.css";

// helper functions

// components
import OneCoin from "../coinGecko/oneCoin/oneCoin";

// data
import { getCoinsList } from "../../../services/coinsList";


// export default CoinsList;

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCoinsList()
      .then(items => {
        if(mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])

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
        {list.map((oneCoin) => (
          <OneCoin key={oneCoin.id} oneCoinInfo={oneCoin} />
        ))}
      </div>
    </>
  );
}

export default App;