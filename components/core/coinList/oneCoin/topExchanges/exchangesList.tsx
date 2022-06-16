import React, { FC } from "react";
import styles from "./exchangeList.module.css";

// components
import OneExchange from "./oneExchange";

// data (replace with axios fetch later)
import { allExchangesInfo } from "../../../../../data/exchangesData";

const ExchangesList: FC = () => {
  return (
    <section className={styles.exchangesList_full}>
      <div className={styles.exchangesList_titles}>
        <p className={`${styles.ecxhangesList_defaultText} ${styles.allignLeft}`}>N°</p>
        <p className={`${styles.ecxhangesList_defaultText} ${styles.allignLeft}`}>Name</p>
        <p className={`${styles.ecxhangesList_defaultText} ${styles.allignRight}`}>Staking Link</p>
        <p className={`${styles.ecxhangesList_defaultText} ${styles.allignRight}`}>Total Value Locked</p>
        <p className={`${styles.ecxhangesList_defaultText} ${styles.allignRight}`}>APY</p>
        <p className={`${styles.ecxhangesList_defaultText} ${styles.allignRight}`}>Update</p>
        <p className={`${styles.ecxhangesList_defaultText} ${styles.allignRight}`}>LastUpdated</p>
      </div>

      <div className={styles.exchangesList}>
        {allExchangesInfo.map((oneExchange) => (
          <OneExchange key={oneExchange.id} oneExchangeData={oneExchange} placeExchange={allExchangesInfo.indexOf(oneExchange)} />
        ))}
      </div>
    </section>
  );
};

export default ExchangesList;
