import React, { useState, useRef, FC, useEffect } from "react";
import styles from "./oneCoin.module.css";
import oneMarketStyles from "../oneCoin/topProjects/oneProject.module.css";
import Select from "react-select";
import { Modal } from "react-bootstrap";

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
  const { coin_id, name, abbreviature, image, last_updated, price, market_cup, click } = oneCoinInfo;
  const [setActive, setActiveState] = useState("");
  const userAccess = useRef(false);
  const [setHeight, setHeightState] = useState("0px");
  const [list, setList] = useState([]);
  const [marketsList, setMarketsList] = useState([""]);
  const age = findTimeDelta(last_updated);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const content = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [apyValue, setApyValue] = useState(0.00);
  const [apyValueErr, setApyValueErr] = useState(false);
  const [marketValue, setMarketValue] = useState();
  const [marketValueErr, setMarketValueErr] = useState(false);
  const [stackingValue, setStackingValue] = useState(0);
  const [stackingValueErr, setStackingValueErr] = useState(true);
  const stakingTypes = [
    { value: true, label: "Locked" },
    { value: false, label: "Flexible" }
  ];

  const openModal = () => {
    const getData = async () => {
      const arr = new Array(0);
      new HugsApi().getMarketsList().then((res) => {
        const result = res.data.items;
        result.map((market: any) => {
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

  const closeSuccessModal = () => {
    setIsSuccess(false);
  }

  const toggleAccordion = async () => {
    setActiveState(setActive === "" ? "active" : "");
    if (setActive == "") {
      new HugsApi().getCoinMarketsList(coin_id)
        .then(response => {
          setList(response.data.items);
          userAccess.current = response.data.user_access;
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
    if (apyValue < 0) {
      setApyValueErr(true);
    } 
    if ((apyValueErr == false) && (marketValueErr == false) && (stackingValueErr == false)){
      new HugsApi().createCoinMarket(marketValue, coin_id, apyValue, stackingValue)
        .then(response => {
          setIsSuccess(true);
          setIsOpen(false);
        })
        .catch(error => {
          const error_msg = error.response.data.error;
          if (error_msg == 'Cant create existed connection') {
            setMarketValueErr(true);
          }
        })
    }
  }

  const marketListHandle = (selectedObject: any) => {
    setMarketValue(selectedObject.value);
    if ( selectedObject.value == undefined){
      setMarketValueErr(true)
    } else {
      setMarketValueErr(false)
    }
  }

  const stackingHandle = (selectedObject: any) => {
    setStackingValue(selectedObject.value);
    if ( selectedObject.value == undefined){
      setStackingValueErr(true)
    } else {
      setStackingValueErr(false)
    }
  }

  const apyHandle = (selectedObject: any) => {
    setApyValue(selectedObject.target.value);
    if (selectedObject.target.value){
      setApyValueErr(false);
    } else {
      setApyValueErr(true);
    }
  } 

  return (
    <section className={styles.oneCoinContainer}>
      <Modal show={isOpen}>
        <div className={styles.modal}>
          <div className={styles.modalDialog}>
            <div className={styles.modalContent}>
              <h2>Add new contribution for {name} <Image className={styles.coinName_image} height={32} width={32} src={image} /></h2> 
              <div className={styles.modalClose} onClick={closeModal}></div>
              <Select className={styles.modalContentSelect} placeholder="Select Market" options={marketsList} onChange={marketListHandle}/>
              { marketValueErr == true ? <label className={styles.modalCloseError}>Already exist</label>: <></>}
              <Select className={styles.modalContentSelect} placeholder="Select Staking type" options={stakingTypes} onChange={stackingHandle}/>
              <label>Annual Percentage Yield (APY)</label>
              <input type="number" placeholder="0.00" name="apy_value" value={apyValue} onChange={apyHandle}/>
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
              <div className={styles.modalSubmit}>
                <button className={styles.modalSubmitBtn} onClick={closeSuccessModal}>Close</button>
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
              <p className={oneMarketStyles.coinMarketsColumn}>{ coinMarkets.locked ? "Locked": "Flexible"}</p>
              <a id={coinMarkets.market.market_id} className={oneMarketStyles.coinMarketsColumn} href={coinMarkets.market.link} target="_blank" rel="noreferrer" onClick={linkHangler}>{coinMarkets.market.platform}</a>
              <p className={oneMarketStyles.coinMarketsColumn}>{coinMarkets.market.click}</p>
              {/* <p className={oneMarketStyles.coinMarketsColumn}>{coinMarkets.open_contribution ? "Open": "Closed"} - {userAccess.current}</p> */}
              {userAccess.current ? <p className={oneMarketStyles.coinMarketsColumn}>
                {coinMarkets.open_contribution ? "In Review": "Update"}</p>:
                <p className={oneMarketStyles.coinMarketsColumn}>Access Denied</p>
              }
              {/* <p className={oneMarketStyles.coinMarketsColumn}>{userAccess.current ? "Open": "Access Denied"}</p> */}
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
