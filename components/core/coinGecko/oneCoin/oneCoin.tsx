import React, { useState, useRef, FC, useEffect } from "react";

import styles from "./oneCoin.module.css";
import oneMarketStyles from "../oneCoin/topProjects/oneProject.module.css";

// import styles from "./projectList.module.css";
import Image from "next/image";
import { findTimeDelta } from "../../../../core/utils/converters/timeDelta";

// data
import { HugsApi } from "../../../../services/hugsApi";

// images
import viewMore from "../../../../public/static/assets/oneCoin/view_more_arrow.svg";

// types
import { CoinTypes, CoinMarkets } from "../../../../core/types/types";

// converters functions
import { numberToCurrencyAbbreviation } from "../../../../core/utils/converters/numberToCurrencyAbbreviation";

// types
export interface OneCoinProps {
  key: number;
  oneCoinInfo: CoinTypes;
}

const OneCoin: FC<OneCoinProps> = (props: OneCoinProps) => {
  const { oneCoinInfo } = props;

  const { coinId, name, abbreviature, image, lastUpdated, price, marketCup, click } = oneCoinInfo;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [list, setList] = useState([]);
  const age = findTimeDelta(lastUpdated);

  const content = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toggleAccordion = async () => {
    setActiveState(setActive === "" ? "active" : "");
    if (setActive == "") {
      new HugsApi().getCoinMarketsList(coinId)
        .then(response => {
          setList(response['items']);
        }) 
        return () => [];
    }
  };

  const linkHangler = (selectedObject: any) => {
    new HugsApi().marketClick(selectedObject.target.id);
  };

  useEffect(() => {
    setHeightState(setActive === "" ? "0px" : `${content.current.scrollHeight}px`);
  })

  return (
    <section className={styles.oneCoinContainer}>
      <article className={styles.oneCoinFull}>
        <div className={styles.coinName}>
          <Image className={styles.coinName_image} height={32} width={32} src={image} />
          <p className={`${styles.oneCoin_defaultStyling} ${styles.coinName_name}`}>{name}</p>
        </div>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter}`}>{abbreviature}</p>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter}`}>USD {price}</p>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter}`}>{numberToCurrencyAbbreviation(marketCup, 1)}</p>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter}`}>{click}</p>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter}`}>{age}</p>
        <div className={styles.allignCenter}>
          <Image
            style={{ transition: ".5s", transform: setActive === "active" ? "rotate(180deg)" : "rotate(0deg)" }}
            height={8}
            width={12}
            onClick={toggleAccordion}
            src={viewMore}
            className={styles.accordeonSVG}
          />
        </div>
      </article>
      
      <div ref={content} style={{ maxHeight: `${setHeight}` }} className={styles.accordion__content}>
        <section className={oneMarketStyles.coinMarketsTable}>
          <div className={oneMarketStyles.coinMarketsRow}>
            <p className={oneMarketStyles.coinMarketsColumn}>Platform</p>
            <p className={oneMarketStyles.coinMarketsColumn}>APY</p>
            <p className={oneMarketStyles.coinMarketsColumn}>Age</p>
            <p className={oneMarketStyles.coinMarketsColumn}>Type</p>
            <p className={oneMarketStyles.coinMarketsColumn}>Link</p>
            <p className={oneMarketStyles.coinMarketsColumn}>Clicks</p>
            <p className={oneMarketStyles.coinMarketsColumn}>Contribute</p>
          </div>

          {list.map((coinMarkets: CoinMarkets) => (
            <div key={coinMarkets.market.market_id} className={oneMarketStyles.coinMarketsRow}>
              <div className={`${oneMarketStyles.coinMarketsColumn} ${oneMarketStyles.oneProject_stakingLinkName_full} ${oneMarketStyles.allignLeft}`}>
                <Image className={oneMarketStyles.oneProject_coinLogo} height={24} width={24} src={coinMarkets.market.logo} />
                <p className={`${oneMarketStyles.oneProject_name} ${oneMarketStyles.projectList_fontSize}`}>{coinMarkets.market.platform}</p>
              </div>
              <p className={oneMarketStyles.coinMarketsColumn}>{coinMarkets.apy}%</p>
              <p className={oneMarketStyles.coinMarketsColumn}>{findTimeDelta(coinMarkets.last_updated)}</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Locked</p>
              <a id={coinMarkets.market.market_id} className={oneMarketStyles.coinMarketsColumn} href={coinMarkets.market.link} target="_blank" rel="noreferrer" onClick={linkHangler}>{coinMarkets.market.platform}</a>
              <p className={oneMarketStyles.coinMarketsColumn}>{coinMarkets.market.click}</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Yea | Not</p>
            </div>
          ))};
        </section>
      </div>
    </section>
  );
};

export default OneCoin;
