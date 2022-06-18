import React, { FC } from "react";
import styles from "./oneExchange.module.css";
import Image from "next/image";

// images
import exchangeLogo from "../../../../../public/static/assets/oneCoin/exchanges/exchange_logo.svg";
import stakingLink from "../../../../../public/static/assets/oneCoin/exchanges/staking_link_image.svg";

// converters
import { toAmericanCurrencyNotation } from "../../../../../core/utils/converters/numberToAmericanCurrencyNotation";
import { toTimeAgo } from "../../../../../core/utils/converters/databaseTimeToTimeAgo";

const OneExchange: FC = ({ oneExchangeData, placeExchange }) => {
  return (
    <div className={styles.oneEchange_full}>
      <p className={`${styles.ecxhangesList_number} ${styles.allignLeft}`}>{placeExchange + 1}</p>
      <div className={`${styles.oneEchange_stakingLinkName_full} ${styles.allignLeft}`}>
        <Image className={styles.ecxhangesList_coinLogo} height={24} width={24} src={exchangeLogo} />
        <p className={`${styles.ecxhangesList_name} ${styles.exchangeList_fontSize}`}>{oneExchangeData.name}</p>
      </div>
      <div className={`${styles.oneEchange_stakingLink_full} ${styles.allignRight}`}>
        <a className={`${styles.ecxhangesList_stakingLink} ${styles.exchangeList_fontSize}`}>{oneExchangeData.stakingLink}</a>
        <Image className={styles.ecxhangesList_stakingLink} height={10} width={10} src={stakingLink} />
      </div>
      <p className={`${styles.ecxhangesList_totalValue} ${styles.exchangeList_fontSize} ${styles.allignRight}`}>
        {toAmericanCurrencyNotation(oneExchangeData.totalValue)}
      </p>
      <p className={`${styles.ecxhangesList_apy} ${styles.exchangeList_fontSize} ${styles.allignRight}`}>{oneExchangeData.totalApy} %</p>
      <div className={styles.allign_updateButton}>
        <button className={styles.ecxhangesList_updateButton}>update</button>
      </div>
      <p className={`${styles.ecxhangesList_lastUpdated} ${styles.exchangeList_fontSize} ${styles.allignRight}`}>
        {toTimeAgo(oneExchangeData.lastUpdated)}
      </p>
    </div>
  );
};

export default OneExchange;
