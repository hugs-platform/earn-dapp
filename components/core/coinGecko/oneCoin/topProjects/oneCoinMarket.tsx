import React, { FC } from "react";
import styles from "./oneProject.module.css";
import Image from "next/image";

// images
import stakingLink from "../../../../../public/static/assets/oneCoin/projects/staking_link_image.svg";

// types
import { CoinMarkets } from "../../../../../core/types/types";

export interface OneProjectProps {
  oneProjectData: CoinMarkets
}

const OneCoinMarket: FC<OneProjectProps> = (props: OneProjectProps) => {
  const { oneProjectData } = props;

  return (
    <div className={styles.oneProject_full}>
      <div className={`${styles.oneProject_stakingLinkName_full} ${styles.allignLeft}`}>
        <Image className={styles.oneProject_coinLogo} height={24} width={24} src={oneProjectData.market.logo} />
        <p className={`${styles.oneProject_name} ${styles.projectList_fontSize}`}>{oneProjectData.market.platform}</p>
      </div>
      <div className={`${styles.oneProject_stakingLink_full} ${styles.allignRight}`}>
        <a className={`${styles.oneProject_stakingLink} ${styles.projectList_fontSize}`}>{oneProjectData.market.link}</a>
        <Image className={styles.oneProject_stakingLink} height={10} width={10} src={stakingLink} />
      </div>
      <p className={`${styles.oneProject_totalValue} ${styles.projectList_fontSize} ${styles.allignRight}`}>
        {1000000}
      </p>
      <p className={`${styles.oneProject_apy} ${styles.projectList_fontSize} ${styles.allignRight}`}>{oneProjectData.apy} %</p>
      <div className={styles.allign_updateButton}>
        <button className={styles.oneProject_updateButton}>update</button>
      </div>
      <p className={`${styles.oneProject_lastUpdated} ${styles.projectList_fontSize} ${styles.allignRight}`}>
        {oneProjectData.last_updated}
      </p>
      <p className={`${styles.oneProject_number} ${styles.allignLeft}`}>Contibute or not</p>
    </div>
  );
};

export default OneCoinMarket;
