import React, { useState, useRef } from "react";
import styles from "./oneCoin.module.css";
import Image from "next/image";

// images
import viewMore from "../../../../public/static/assets/oneCoin/view_more_arrow.svg";

// helper functions

// components

// data
const coinInfo = [
  {
    coinName: "bitcoin",
    coinNameShort: "btc",
    coinImage: "minivan",
    coinPrice: "USD 48,234.34",
    coinMarketCap: 7,
  },
];

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  return (
    <section className={styles.oneCoinContainer}>
      <article className={styles.oneCoinFull}>
        <div>
          <p>image</p>
          <p>name</p>
          <p>name short</p>
        </div>
        <p className={styles.allCoins_titles}>Price</p>
        <p className={styles.allCoins_titles}>Market Cap</p>
        <p className={styles.allCoins_titles}>Highest Apy</p>
        {/* change to component later */}
        <button className={styles.allCoins_titles}>Update</button>
        <Image
          className={styles.hover}
          height={8}
          width={12}
          onClick={toggleAccordion}
          src={viewMore}
        />
      </article>
      {/* content of one coin */}
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={styles.accordion__content}
      >
        <div
          className={styles.accordion__text}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </section>
  );
}

export default Accordion;
