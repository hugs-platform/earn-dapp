import React, { useState, useRef, FC } from "react";
import styles from "./oneCoin.module.css";
import Image from "next/image";

// images
import viewMore from "../../../../public/static/assets/oneCoin/view_more_arrow.svg";

// helper functions

// components
import Exchanges from "../oneCoin/topExchanges/exchangesList";

// types
import { OneCoinTypes } from "../../../../types/coinListTypes";

// data
import { ApyData } from "../../../../data/ApyData";

const OneCoin: FC<OneCoinTypes> = ({ oneCoinInfo }: OneCoinTypes) => {
  const { name, nameShort, price, marketCap } = oneCoinInfo;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  };

  return (
    <section className={styles.oneCoinContainer}>
      <article className={styles.oneCoinFull}>
        <div className={styles.coinName}>
          <Image
            className={styles.coinName_image}
            height={32}
            width={32}
            src={viewMore}
          />
          <p
            className={`${styles.oneCoin_defaultStyling} ${styles.coinName_name}`}
          >
            {name}
          </p>
          <p
            className={`${styles.oneCoin_defaultStyling} ${styles.coinNameShort}`}
          >
            {nameShort}
          </p>
        </div>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignRight}`}>
          {price}
        </p>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignRight}`}>
          {marketCap}
        </p>
        <p className={`${styles.oneCoin_highestAPY} ${styles.allignRight}`}>
          23,55%
        </p>
        {/* change to component later */}
        <div className={styles.allignRight}>
          <button className={styles.oneCoin_updateButton}>Update</button>
        </div>
        <div className={styles.allignCenter}>
          <Image
            height={8}
            width={12}
            onClick={toggleAccordion}
            src={viewMore}
          />
        </div>
      </article>

      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={styles.accordion__content}
      >
        <Exchanges typeCoin={name} />
      </div>
    </section>
  );
};

export default OneCoin;

// hier fetchen we de data van APY
// hier fetchen we de data van exchanges
