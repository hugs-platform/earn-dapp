import React, { useState, useRef, FC } from "react";
import styles from "./oneCoin.module.css";
import Image from "next/image";
import Grid from "@material-ui/core/Grid/Grid";

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

  const { name, nameAbbreviation, price, marketCap, apy } = oneCoinInfo;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [isOpen, setIsOpen] = useState(false);

  const content = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
  };

  return (
    <>
      <article className={styles.oneCoinFull}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <div className={styles.coinName}>
              <Image className={styles.coinName_image} height={32} width={32} src={viewMore} />
              <p className={`${styles.oneCoin_defaultStyling} ${styles.coinName_name}`}>{name}</p>
              <p className={`${styles.oneCoin_defaultStyling} ${styles.coinNameShort}`}>{nameAbbreviation}</p>
            </div>
          </Grid>
          <Grid item xs={2}>
            <p className={`${styles.oneCoin_defaultStyling} ${styles.allignRight}`}>{!price ? "no price" : `USD ` + price}</p>
          </Grid>
          <Grid item xs={2}>
            <p className={`${styles.oneCoin_defaultStyling} ${styles.allignRight}`}>
              {!marketCap ? "no data available" : numberToCurrencyAbbreviation(marketCap, 1)}
            </p>
          </Grid>
          <Grid item xs={2}>
            <p
              style={{ color: Math.sign(apy) > 0 ? "#3ACC8A" : "#DF2F2F" }}
              className={`${styles.oneCoin_highestAPY} ${styles.allignRight}`}
            >
              {apy}%
            </p>
          </Grid>
          <Grid item xs={1}>
            <div className={styles.allignRight}>
              <button className={styles.oneCoin_updateButton}>Update</button>
            </div>
          </Grid>
          <Grid item xs={1}>
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
          </Grid>
        </Grid>
      </article>

      <div ref={content} style={{ maxHeight: `${setHeight}` }} className={styles.accordion__content}>
        <Exchanges />
      </div>
    </>
  );
};

export default OneCoin;
