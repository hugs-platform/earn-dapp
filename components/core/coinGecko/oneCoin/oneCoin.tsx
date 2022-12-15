import React, { useState, useRef, FC, useMemo, useEffect } from "react";

import styles from "./oneCoin.module.css";
import market_styles from "../oneCoin/topProjects/projectList.module.css";
import one_market_styles from "../oneCoin/topProjects/oneProject.module.css";

// import styles from "./projectList.module.css";
import Image from "next/image";
import { findTimeDelta } from "../../../../core/utils/converters/timeDelta";

// data
import { getCoinMarketsList } from "../../../../services/coinMarketsList";
import { marketClick} from "../../../../services/marketClick";

// images
import viewMore from "../../../../public/static/assets/oneCoin/view_more_arrow.svg";

// helper functions

// components
import Exchanges from "./topProjects/projectList";
import OneProject from "./topProjects/oneProject";
import CoinMarketsList from "./topProjects/marketsList";

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

  const { coin_id, name, abbreviature, image, last_updated, price, market_cup, click } = oneCoinInfo;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [list, setList] = useState([]);
  const age = findTimeDelta(last_updated);

  const content = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toggleAccordion = async () => {
    setActiveState(setActive === "" ? "active" : "");

    if (setActive == "") {
      getCoinMarketsList(coin_id)
        .then(response => {
          setList(response['items']);
        }) 
        return () => [];
    }
  };

  const linkHangler = (selectedObject) => {
    marketClick(selectedObject.target.id);
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
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter}`}>{numberToCurrencyAbbreviation(market_cup, 1)}</p>
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
        <section className={one_market_styles.coinMarketsTable}>
          <div className={one_market_styles.coinMarketsRow}>
            <p className={one_market_styles.coinMarketsColumn}>Platform</p>
            <p className={one_market_styles.coinMarketsColumn}>APY</p>
            <p className={one_market_styles.coinMarketsColumn}>Age</p>
            <p className={one_market_styles.coinMarketsColumn}>Type</p>
            <p className={one_market_styles.coinMarketsColumn}>Link</p>
            <p className={one_market_styles.coinMarketsColumn}>Clicks</p>
            <p className={one_market_styles.coinMarketsColumn}>Contribute</p>
          </div>

          {list.map((coinMarkets: CoinMarkets) => (
            <div className={one_market_styles.coinMarketsRow}>
              <div className={`${one_market_styles.coinMarketsColumn} ${one_market_styles.oneProject_stakingLinkName_full} ${one_market_styles.allignLeft}`}>
                <Image className={one_market_styles.oneProject_coinLogo} height={24} width={24} src={coinMarkets.market.logo} />
                <p className={`${one_market_styles.oneProject_name} ${one_market_styles.projectList_fontSize}`}>{coinMarkets.market.platform}</p>
              </div>
              <p className={one_market_styles.coinMarketsColumn}>{coinMarkets.apy}%</p>
              <p className={one_market_styles.coinMarketsColumn}>{findTimeDelta(coinMarkets.last_updated)}</p>
              <p className={one_market_styles.coinMarketsColumn}>Locked</p>
              <a id={coinMarkets.market.market_id} className={one_market_styles.coinMarketsColumn} href={coinMarkets.market.link} target="_blank" onClick={linkHangler}>{coinMarkets.market.platform}</a>
              <p className={one_market_styles.coinMarketsColumn}>{coinMarkets.market.click}</p>
              <p className={one_market_styles.coinMarketsColumn}>Yea | Not</p>
            </div>
          ))};
        </section>
      </div>
    </section>
  );
};

export default OneCoin;
