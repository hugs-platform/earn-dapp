import React, { useState, useRef, FC } from "react";
import styles from "./oneCoin.module.css";
import Image from "next/image";
import { findTimeDelta } from "../../../../core/utils/converters/timeDelta";

// images
import viewMore from "../../../../public/static/assets/oneCoin/view_more_arrow.svg";

// helper functions

// components
import Exchanges from "./topProjects/projectList";

// types
import { CoinTypes } from "../../../../core/types/types";

// converters functions
import { numberToCurrencyAbbreviation } from "../../../../core/utils/converters/numberToCurrencyAbbreviation";

// types
export interface OneCoinProps {
  key: number;
  oneCoinInfo: CoinTypes;
}

const OneCoin: FC<OneCoinProps> = (props: OneCoinProps) => {
  const { oneCoinInfo } = props;

  const { cg_coin_id, name, abbreviature, image, last_updated, price, market_cup, click } = oneCoinInfo;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [isOpen, setIsOpen] = useState(false);
  const age = findTimeDelta(last_updated);

  const content = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
  };

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
            onClickCapture={() => setIsOpen(!isOpen)}
            style={{ transition: ".5s", transform: isOpen === true ? "rotate(180deg)" : "rotate(0deg)" }}
            height={8}
            width={12}
            onClick={toggleAccordion}
            src={viewMore}
            className={styles.accordeonSVG}
          />
        </div>
      </article>

      <div ref={content} style={{ maxHeight: `${setHeight}` }} className={styles.accordion__content}>
        <Exchanges />
      </div>
    </section>
  );
};

export default OneCoin;
