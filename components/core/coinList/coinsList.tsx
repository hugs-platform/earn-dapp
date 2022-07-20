import React, { FC } from "react";
import styles from "./coinsList.module.css";
import Grid from "@material-ui/core/Grid/Grid";

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
        <Grid container>
          <Grid item xs={4}>
            <p className={styles.allCoins_titles_first}>Name</p>
          </Grid>
          <Grid item xs={2}>
            <p className={styles.allCoins_titles}>Price</p>
          </Grid>
          <Grid item xs={2}>
            <p className={styles.allCoins_titles}>Market Cap</p>
          </Grid>
          <Grid item xs={2}>
            <p className={styles.allCoins_titles}>Highest Apy</p>
          </Grid>
          <Grid item xs={1}>
            <p className={styles.allCoins_titles}>Update</p>
          </Grid>
          <Grid item xs={1}>
            <p className={styles.allCoins_titles}>Show more</p>
          </Grid>
        </Grid>
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
