import React, { useState, useRef, FC } from "react";
import styles from "./oneCoin.module.css";
import oneMarketStyles from "../oneCoin/topProjects/oneProject.module.css";
import Select from "react-select";
import TextField from "@mui/material/TextField";

import OneCoinMarket from "../oneCoin/topProjects/oneCoinMarket";
// import styles from "./projectList.module.css";
import Image from "next/image";
import { findTimeDelta } from "../../../../core/utils/converters/timeDelta";

// data
import { HugsApi } from "../../../../services/hugsApi";

// types
import { CoinTypes, CoinMarkets } from "../../../../core/types/types";

// types
export interface OneCoinProps {
  key: number;
  oneCoinInfo: CoinTypes;
}

const OneCoin: FC<OneCoinProps> = (props: OneCoinProps) => {
  const { oneCoinInfo } = props;
  const { coin_id, name, abbreviature, image, last_updated, highest_apy } = oneCoinInfo;
  const [setActive, setActiveState] = useState("");
  const userAccess = useRef(false);
  const [list, setList] = useState([]);
  const [isOpenList, setIsOpenList] = useState(false);
  const [marketsList, setMarketsList] = useState([""]);
  const age = findTimeDelta(last_updated);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const content = useRef() as React.MutableRefObject<HTMLInputElement>;
  const apyValue = useRef(-1);
  const [apyValueErr, setApyValueErr] = useState(false);
  const marketValue = useRef("");
  const [marketValueErr, setMarketValueErr] = useState(false);
  const [validation, setValidtion] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

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

  const toggleAccordion = async () => {
    setActiveState(setActive === "" ? "active" : "");
    if (setActive == "") {
      setIsOpenList(true);
      new HugsApi().getCoinMarketsList(coin_id)
        .then(response => {
          setList(response.data.items);
          userAccess.current = response.data.user_access;
        }) 
        return () => [];
    } else {
      setIsOpenList(false);
    }
  };

  const validate = () => {
    setValidtion(true);
    if (apyValue.current < 0) {
      setValidtion(false);
      setApyValueErr(true);
    }
    if (marketValue.current == ""){
      setValidtion(false);
      setMarketValueErr(true);
    }
    if (validation){
      new HugsApi().createCoinMarket(marketValue.current, coin_id, apyValue.current)
        .then(response => {
            setIsSuccess(true);
            setIsOpen(false);
        })
        .catch(error => {
          setErrorMsg(error.response.data);
        })
    }
  }

  const apyChange = (selectedObject: any) => {
    apyValue.current = selectedObject.target.value;
    if (selectedObject.target.value == "") {
      setApyValueErr(true);
    } else {
      setApyValueErr(false);
    }
  };

  const marketListHandle = (selectedObject: any) => {
    marketValue.current = selectedObject.value;
    if ( selectedObject.value === undefined){
      setMarketValueErr(true)
    } else {
      setMarketValueErr(false)
    }
  }

  return (
    <section className={styles.oneCoinContainer}>
      <article className={styles.oneCoinFull}>
        <div className={styles.coinName}>
          <Image className={styles.coinName_image} height={32} width={32} src={image} />
          <div>
            <p className={`${styles.oneCoin_defaultStyling} ${styles.coinName_name}`}>{abbreviature}</p>
            <p className={`${styles.oneCoin_defaultStyling} ${styles.coinName_abbreviature}`}>{name}</p>
          </div>
        </div>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}>{highest_apy}%</p>
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter}`}>{age}</p>
        {setActive === "active" ? <p className={`${styles.close} ${styles.allignRight}`} onClick={toggleAccordion}>Close</p> : <p className={`${styles.more} ${styles.allignRight}`} onClick={toggleAccordion}> More</p>}
      </article>
      {isOpenList ?
        <div ref={content} className={styles.accordion__content}>
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
              <OneCoinMarket key={coinMarkets.market.platform} oneProjectData={coinMarkets} oneCoinInfo={oneCoinInfo}/>
            ))};
            <div className={oneMarketStyles.coinMarketsRow}>
              {isOpen ? 
                <div className={oneMarketStyles.addNewContainer}>
                  <h2>Add new contribution for {name} <Image className={styles.coinName_image} height={24} width={24} src={image}/></h2>
                  <Select className={marketValueErr ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect} isSearchable={true} placeholder="Select Market" options={marketsList} onChange={marketListHandle}/>
                  <TextField 
                    id="apy-id" 
                    label="Annual Percentage Yield"
                    placeholder="0.00"
                    variant="outlined"
                    type="number"
                    className={apyValueErr ? oneMarketStyles.newCoinInput + " " + oneMarketStyles.textFielInputLabel + " " + oneMarketStyles.newCoinInputError : oneMarketStyles.newCoinInput + " " + oneMarketStyles.textFielInputLabel} 
                    onChange={apyChange}/>
                  {errorMsg? <p className={oneMarketStyles.modalCloseError}>{errorMsg}</p>: <></>}
                  <button className={oneMarketStyles.submitBtn} onClick={validate}>Submit</button>
                  <button className={oneMarketStyles.cancelBtn} onClick={closeModal}>Cencel</button>
                </div>
              : isSuccess?
                <div className={oneMarketStyles.addNewContainer}>
                  <h2 className={oneMarketStyles.updateContainerTitle}>APY Update added for Review.</h2>
                  <p className={oneMarketStyles.updateGreenText}>Thank you!! for Contributing to the Earn dApp.</p>
                  <p className={oneMarketStyles.updateGreyText}>Please note that your contribution will not be visible in the app right away.</p>
                  <p className={oneMarketStyles.updateGreyText}>This will be sent to a number of Reviewers first, who will then decide whether your entry should be Accepted or Rejected.</p>
                  <div className={oneMarketStyles.modalSubmit}>
                    <button className={oneMarketStyles.updateBtn}  onClick={() => setIsSuccess(false)}>Close</button>
                  </div>
                </div>
              :
              <p className={oneMarketStyles.coinMarketsColumn + " " + oneMarketStyles.pointer_cursor + " " + oneMarketStyles.add_new} onClick={openModal}>Add new</p>
              }
            </div>
          </section>
        </div>
      : <></>}
    </section>
  );
};

export default OneCoin;
