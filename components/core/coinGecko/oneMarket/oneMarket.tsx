import React, { useState, useRef, FC, useEffect } from "react";
import styles from "../oneMarket/oneMarket.module.css";
import oneMarketStyles from "../oneCoin/topProjects/oneProject.module.css";
import Select from "react-select";
import TextField from "@mui/material/TextField";

import OneCoinMarket from "../oneMarket/oneMarketCoin";
// import styles from "./projectList.module.css";
import Image from "next/image";

// data
import { HugsApi } from "../../../../services/hugsApi";

// types
import { MarketTypes, CoinMarkets } from "../../../../core/types/types";


// types
export interface OneMarketProps {
  key: string;
  oneMarketInfo: MarketTypes;
}

const OneMarket: FC<OneMarketProps> = (props: OneMarketProps) => {
  const { oneMarketInfo } = props;
  const API = new HugsApi();
  const { market_id, click, link, logo, platform, earn_coins, max_apy, min_apy } = oneMarketInfo;
  const userAccess = useRef(false);
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const content = useRef() as React.MutableRefObject<HTMLInputElement>;
  const coinValue = useRef("");
  const [marketValueErr, setMarketValueErr] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const [coinsList, setCoinsList] = useState([""]);
  const minApyValue = useRef("");
  const [ minApyValueError, setMinApyValueError ] = useState(false);
  const maxApyValue = useRef("");
  const [ maxApyValueError, setMaxApyValueError ] = useState(false);
  const days = useRef("");
  const [ daysValueError, setDaysValueError ] = useState(false);
  const stakingValue = useRef("");
  const [ stackingValueErr, setStackingValueErr ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validation = useRef(false);
  const stakingTypes = [
    { value: "Unknown", label: "Unknown" },
    { value: "Locked", label: "Locked" },
    { value: "Flexible", label: "Flexible" }
  ]

  const openModal = () => {
    const getData = async () => {
      const arr = new Array(0);
      API.getCoinsList().then((res) => {
        const result = res.data.items;
        result.map((coin: any) => {
          return arr.push({value: coin.coin_id, label: coin.name});
        });
        setCoinsList(arr);
      });
    };
    getData();
    setAddNew(true);
  }

  const closeModal = () => {
    setAddNew(false);
  }

  const toggleAccordion = async () => {
    if (isOpen == true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      API.getMarketCoinsList(market_id)
        .then(response => {
          setList(response.data.items);
          userAccess.current = response.data.user_access;
        }) 
        return () => [];
    }
  };

  useEffect(() => {
  })

  const validate = () => {
    if (isLoading === false){
      setIsLoading(true);
      setErrorMsg("");
      validation.current = true;
      if (coinValue.current == ""){
        setMarketValueErr(true);
        validation.current = false;
      }
      if (minApyValue.current === "" && maxApyValue.current === ""){
        setMaxApyValueError(true);
        setMinApyValueError(true);
        validation.current = false;
      } else {
        if (minApyValue.current === ""){
          minApyValue.current = maxApyValue.current
        } 
        if (maxApyValue.current === ""){
          maxApyValue.current = minApyValue.current;
        }
      }

      switch (stakingValue.current) {
        case "":
          setStackingValueErr(true);
          validation.current = false;
        case "Locked":
          if (days.current === "") {
            validation.current = false;
            setDaysValueError(true);
          }
        }

      if (validation.current === true){
        API.createCoinMarket(market_id, coinValue.current, maxApyValue.current, minApyValue.current, stakingValue.current, days.current).then(response => {
          setIsLoading(false);
          setIsSuccess(true);
          setAddNew(false);
        }).catch(error => {
          setIsLoading(false);
          setErrorMsg(error.response.data.error);
        })
      } else {
        setIsLoading(false);
      }
    }
  }

  const coinListHandle = (selectedObject: any) => {
    coinValue.current = selectedObject.value;
    if ( selectedObject.value == undefined){
      setMarketValueErr(true);
    } else {
      setMarketValueErr(false);
    }
  }


  const linkHangler = (selectedObject: any) => {
    new HugsApi().marketClick(selectedObject.target.id);
  };

  const minApyChange = (selectedObject: any) => {
    minApyValue.current = selectedObject.target.value;
    if (selectedObject.target.value === "") {
      setMinApyValueError(true);
    } else {
      setMaxApyValueError(false);
      setMinApyValueError(false);
    }
  };

  const maxApyChange = (selectedObject: any) => {
    maxApyValue.current = selectedObject.target.value;
    if (selectedObject.target.value === "") {
      setMaxApyValueError(true);
    } else {
      setMaxApyValueError(false);
      setMinApyValueError(false);
    }
  };

  const daysChange = (selectedObject: any) => {
    days.current = selectedObject.target.value;
    if (selectedObject.target.value == "") {
      setDaysValueError(true);
    } else {
      setDaysValueError(false);
    }
  };

  const stackingHandle = (selectedObject: any) => {
    stakingValue.current = selectedObject.value;
    stakingValue.current = selectedObject.value;
    if (selectedObject.value != "Locked"){
      setDaysValueError(false);
    } 
    setStackingValueErr(false);
  }

  return (
    <section className={styles.oneCoinContainer}>
      <article className={styles.oneMarketFull}>
        <div className={styles.marketName}>
        {logo ? <Image className={styles.marketName_image} height={32} width={32} src={logo} />: <></>}
          <p className={`${styles.oneMarketDefaultStyling} ${styles.marketName_name}`}>{platform}</p>
        </div>
        {max_apy? 
          <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}>{max_apy} %</p>
        :
          <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}></p>
        }
        {min_apy? 
          <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}>{min_apy} %</p>
        :
          <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}></p>
        }
        <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter}`}>{earn_coins}</p>
        <a id={oneMarketInfo.market_id} className={oneMarketStyles.coinMarketsColumn} href={link} target="_blank" rel="noreferrer" onClick={linkHangler}>{platform}</a>
        <p className={`${styles.oneMarketDefaultStyling} ${styles.allignCenter}`}>{click}</p>
        {isOpen ? <p className={`${styles.close} ${styles.allignRight}`} onClick={toggleAccordion}>Close</p> : <p className={`${styles.more} ${styles.allignRight}`} onClick={toggleAccordion}> More</p>}
      </article>
      {isOpen? 
        <div ref={content} className={styles.accordion__content}>
          <section className={oneMarketStyles.coinMarketsTable}>
            <div className={oneMarketStyles.coinMarketsRow}>
              <p className={oneMarketStyles.coinMarketsColumn}>Coin</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Max APY</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Min APY</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Days</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Age</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Type</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Contribute</p>
            </div>
            {list.map((coinMarkets: CoinMarkets) => (
              <OneCoinMarket key={coinMarkets.market.platform} coinMarketsData={coinMarkets}/>
            ))};
            <div className={oneMarketStyles.coinMarketsRow}>
              {addNew ? 
                <div className={oneMarketStyles.addNewContainer}>
                  <h2>Add new contribution for {oneMarketInfo.platform} <Image className={styles.coinName_image} height={24} width={24} src={oneMarketInfo.logo}/></h2>
                  <Select className={marketValueErr ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect} isSearchable={true} placeholder="Select Market" options={coinsList} onChange={coinListHandle}/>
                  <TextField
                    id="min-apy-id"
                    label="Minimum Annual Percentage Yield"
                    placeholder="0.00"
                    variant="outlined"
                    type="number" 
                    className={minApyValueError ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect } 
                    onChange={minApyChange}/>

                  <TextField
                    id="max-apy-id"
                    label="Maximum Annual Percentage Yield"
                    placeholder="0.00"
                    variant="outlined"
                    type="number" 
                    className={maxApyValueError ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect }
                    onChange={maxApyChange}/>
                  
                  <Select className={stackingValueErr ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect } isSearchable={true} placeholder="Select Staking type" options={stakingTypes} onChange={stackingHandle}/>
                  
                  <TextField 
                    id="days-id"
                    label="Days"
                    placeholder="90"
                    variant="outlined"
                    type="number"
                    className={daysValueError ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect }
                    onChange={daysChange}/>
                  
                  {errorMsg? <p className={oneMarketStyles.modalCloseError}>{errorMsg}</p>: <></>}
                  <button className={oneMarketStyles.submitBtn} disabled={isLoading} onClick={validate}>Submit</button>
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
                <p className={oneMarketStyles.coinMarketsColumn} onClick={openModal}>Add new</p>
              }
            </div>
          </section>
        </div>
      :
        <></>
      }
    </section>
  );
};

export default OneMarket;
