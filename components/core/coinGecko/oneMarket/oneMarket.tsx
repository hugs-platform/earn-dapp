import React, { useState, useRef, FC, useEffect } from "react";
import styles from "../oneMarket/oneMarket.module.css";
import oneMarketStyles from "../oneCoin/topProjects/oneProject.module.css";
import Select from "react-select";
import { Modal } from "react-bootstrap";

import OneCoinMarket from "../oneMarket/oneMarketCoin";
// import styles from "./projectList.module.css";
import Image from "next/image";

// data
import { HugsApi } from "../../../../services/hugsApi";

// images
import viewMore from "../../../../public/static/assets/oneCoin/view_more_arrow.svg";

// types
import { MarketTypes, CoinMarkets } from "../../../../core/types/types";


// types
export interface OneMarketProps {
  key: string;
  oneMarketInfo: MarketTypes;
}

const OneMarket: FC<OneMarketProps> = (props: OneMarketProps) => {
  const { oneMarketInfo } = props;
  const { market_id, highest_apy, click, link, logo, platform, earn_coins } = oneMarketInfo;
  const [setActive, setActiveState] = useState("");
  const userAccess = useRef(false);
  const [setHeight, setHeightState] = useState("0px");
  const [list, setList] = useState([]);
  const [ coinsList, setCoinsList] = useState([""]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');
  const content = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [apyValue, setApyValue] = useState(0.00);
  const [apyValueErr, setApyValueErr] = useState(false);
  const [coinValue, setCoinValue] = useState("");
  const [coinValueErr, setCoinValueErr] = useState("");
  const stackingValue = useRef("");
  const [stackingValueErr, setStackingValueErr] = useState(false);
  const validation = useRef(true);
  const stakingTypes = [
    { value: NaN, label: "Unknown" },
    { value: true, label: "Locked" },
    { value: false, label: "Flexible" }
  ];

  const openModal = () => {
    const getData = async () => {
      const arr = new Array(0);
      new HugsApi().getCoinsList().then((res) => {
        const result = res.data.items;
        result.map((coin: any) => {
          return arr.push({value: coin.coin_id, label: coin.name});
        });
        setCoinsList(arr);
      });
    };
    getData();
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const closeSuccessModal = () => {
    setIsSuccess(false);
  }

  const toggleAccordion = async () => {
    setActiveState(setActive === "" ? "active" : "");
    if (setActive == "") {
      new HugsApi().getMarketCoinsList(market_id)
        .then(response => {
          setList(response.data.items);
          userAccess.current = response.data.user_access;
          setHeightState(setActive === "" ? "0px" : `${content.current.scrollHeight}px`);
        }) 
        return () => [];
    }
  };

  useEffect(() => {
    setHeightState(setActive === "" ? "0px" : `${content.current.scrollHeight}px`);
  })

  const validate = () => {
    validation.current = true;
    if (coinValue == ""){
      setCoinValueErr("Select one");
      validation.current = false;
    }
    if (apyValue < 0) {
      setApyValueErr(true);
      validation.current = false;
    }
    if (stackingValue.current == ""){
      setStackingValueErr(true);
      validation.current = false;
    }
    if (validation.current){
      new HugsApi().createCoinMarket(market_id, coinValue, apyValue, stackingValue.current)
        .then(response => {
            setIsSuccess(true);
            setTxHash(response.data.result);
            setIsOpen(false);
        })
        .catch(error => {
          const error_msg = error.response.data.error;
          if (error_msg == 'Cant create existed connection') {
            setCoinValueErr("Alredy exist!");
          }
        })
    }
  }

  const coinListHandle = (selectedObject: any) => {
    setCoinValue(selectedObject.value);
    if ( selectedObject.value == undefined){
      setCoinValueErr("Select one");
    } else {
      setCoinValueErr("");
    }
  }

  const stackingHandle = (selectedObject: any) => {
    stackingValue.current = selectedObject.value;
    setStackingValueErr(false);
  }

  const apyHandle = (selectedObject: any) => {
    setApyValue(selectedObject.target.value);
    if (selectedObject.target.value){
      setApyValueErr(false);
    } else {
      setApyValueErr(true);
    }
  } 

  const linkHangler = (selectedObject: any) => {
    new HugsApi().marketClick(selectedObject.target.id);
  };

  return (
    <section className={styles.oneCoinContainer}>
      <Modal show={isOpen}>
        <div className={styles.modal}>
          <div className={styles.modalDialog}>
            <div className={styles.modalContent}>
              <h2>Add new contribution for {platform} <Image className={styles.coinName_image} height={32} width={32} src={logo} /></h2> 
              <div className={styles.modalClose} onClick={closeModal}></div>
              <Select className={styles.modalContentSelect} placeholder="Select Coin" options={coinsList} onChange={coinListHandle}/>
              { coinValueErr ? <label className={styles.modalCloseError}>{coinValueErr}</label>: <></>}
              <Select className={styles.modalContentSelect} placeholder="Select Staking type" options={stakingTypes}  onChange={stackingHandle}/>
              { stackingValueErr ? <label className={styles.modalCloseError}>Select one</label>: <></>}
              <label>Annual Percentage Yield (APY)</label>
              <input type="number" placeholder="0.00" name="apy_value" value={apyValue} onChange={apyHandle}/>
              { apyValueErr ? <label className={styles.modalCloseError}>Please input number</label>: <></>}
              <div className={styles.modalSubmit}>
                <button className={styles.modalSubmitBtn} onClick={validate}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={isSuccess}>
        <div className={styles.modal}>
          <div className={styles.modalDialog}>
            <div className={styles.modalContent}>
              <p>Thank you for contributing to the Earn dApp. Please note that your contribution will not be visible in the app right away.</p>
              <p>This will be sent to a number of Reviewers first, who will the decide whether your entry should be accepted or rejected.</p>
              <p> Please do net attempt to submit the same staking opportunity more than once and do not try to make fake entries, as both actions will result in lower Reputation Score for you as a user.</p>
              <p>Also, you will noy be eligible for rewards then.</p>
              <p>You can see your transaction on <a rel="noreferrer" target="_blank" href={`https://mumbai.polygonscan.com/tx/${txHash}`}>Ploygon Scan</a></p>
              <div className={styles.modalSubmit}>
                <button className={styles.modalSubmitBtn} onClick={closeSuccessModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <article className={styles.oneMarketFull}>
        <div className={styles.marketName}>
          <Image className={styles.marketName_image} height={32} width={32} src={logo} />
          <p className={`${styles.oneMarketDefaultStyling} ${styles.marketName_name}`}>{platform}</p>
        </div>
        <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter}`}>{highest_apy}</p>
        <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter}`}>{earn_coins}</p>
        <a id={oneMarketInfo.market_id} className={oneMarketStyles.coinMarketsColumn} href={link} target="_blank" rel="noreferrer" onClick={linkHangler}>{platform}</a>
        <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter}`}>{click}</p>
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
            <p className={oneMarketStyles.coinMarketsColumn}>Clicks</p>
            <p className={oneMarketStyles.coinMarketsColumn}>Contribute</p>
          </div>
          {list.map((coinMarkets: CoinMarkets) => (
            <OneCoinMarket key={coinMarkets.market.platform} coinMarketsData={coinMarkets}/>
          ))};
          <div className={oneMarketStyles.coinMarketsRow}>
            <p className={oneMarketStyles.coinMarketsColumn} onClick={openModal}>Add new</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OneMarket;
