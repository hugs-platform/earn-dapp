import React, { useState, useRef } from "react";
import styles from "./oneCoin.module.css";
import Image from "next/image";

// images
import viewMore from "../../../../public/static/assets/oneCoin/view_more_arrow.svg";

// helper functions

// components

// data
import { allExchangesInfo } from "../../../../data/exchanges";

// eslint-disable-next-line require-jsdoc
function Accordion({ oneCoinInfo, contentOneCoin }) {
  console.log(oneCoinInfo);
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);

  // eslint-disable-next-line require-jsdoc
  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

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
            {oneCoinInfo.name}
          </p>
          <p
            className={`${styles.oneCoin_defaultStyling} ${styles.coinNameShort}`}
          >
            {oneCoinInfo.nameShort}
          </p>
        </div>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignRight}`}>
          {oneCoinInfo.price}
        </p>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignRight}`}>
          {oneCoinInfo.marketCap}
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
      {/* content of one coin */}
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={styles.accordion__content}
      >
        <div
          className={styles.accordion__text}
          dangerouslySetInnerHTML={{ __html: contentOneCoin }}
        />
      </div>
    </section>
  );
}

export default Accordion;
