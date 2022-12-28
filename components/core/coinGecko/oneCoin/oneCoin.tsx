import React, { useState, useRef, FC, useEffect } from "react";
import styles from "./oneCoin.module.css";
import oneMarketStyles from "../oneCoin/topProjects/oneProject.module.css";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";

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

import { valideApyTime } from "../../../../core/validators/newContribution";


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
  const [marketsList, setMarketsList] = useState([""]);
  const age = findTimeDelta(last_updated);
  const [isOpen, setIsOpen] = useState(false);
  const content = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [apyTime, setApyTime] = useState("00:00:00");
  const [apyTimeErr, setApyTimeErr] = useState(false);
  const stakingTypes = [
    { value: true, label: "Locked" },
    { value: false, label: "Flexible" }
  ];

  const openModal = () => {
    const getData = async () => {
      let arr = [];
      new HugsApi().getMarketsList().then((res) => {
        let result = res.data.items;
        result.map((market) => {
          return arr.push({value: market.market_id, label: market.platform});
        });
        setMarketsList(arr);
      });
    };
    getData();
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const toggleAccordion = async () => {
    setActiveState(setActive === "" ? "active" : "");
    if (setActive == "") {
      new HugsApi().getCoinMarketsList(coin_id)
        .then(response => {
          let items = response.data.items;
          setList(items);
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

  const validate = () => {
    if (!valideApyTime.test(apyTime)) {
      setApyTimeErr(true);
    }
  }

  return (
    <section className={styles.oneCoinContainer}>
      <Modal show={isOpen}>
        <div className={styles.modal}>
          <div className={styles.modalDialog}>
            <div className={styles.modalContent}>
              <h2>Add new contribution for {name}</h2>
              <div className={styles.modalClose} onClick={closeModal}></div>
              <Select id="marketListIdSelect" className={styles.modalContentSelect} placeholder="Select Market" options={marketsList} />
              <Select id="stakingTypesIdSelect" className={styles.modalContentSelect} placeholder="Select Staking type" options={stakingTypes} />
              <label>APY age:</label>
              <input type="text" placeholder="(HH:MM:SS)" name="name" value={apyTime} onChange={(e) => setApyTime(e.target.value)}/>
              {apyTimeErr && <p>Your APY time is invalid</p>}
              <div className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis a sed impedit explicabo accusantium nihil doloremque consequuntur.</div>
              <div className="actions">
                <button className="toggle-button" onClick={validate}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
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
              <p className={oneMarketStyles.coinMarketsColumn}>Choose your destiny</p>
            </div>
          ))};
          <div className={oneMarketStyles.coinMarketsRow}>
            <p className={oneMarketStyles.coinMarketsColumn} onClick={openModal}>Add new</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OneCoin;
