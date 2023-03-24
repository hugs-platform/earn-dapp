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
  const API = new HugsApi();
  const { oneCoinInfo } = props;
  const { coin_id, name, abbreviature, image, last_updated, max_apy, min_apy } = oneCoinInfo;
  const [setActive, setActiveState] = useState("");
  const userAccess = useRef(false);
  const [list, setList] = useState([]);
  const [isOpenList, setIsOpenList] = useState(false);
  const [marketsList, setMarketsList] = useState([""]);
  const age = findTimeDelta(last_updated);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const content = useRef() as React.MutableRefObject<HTMLInputElement>;
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
  const marketValue = useRef("");
  const [marketValueErr, setMarketValueErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const stakingTypes = [
    { value: "Unknown", label: "Unknown" },
    { value: "Locked", label: "Locked" },
    { value: "Flexible", label: "Flexible" }
  ]

  const openModal = () => {
    const getData = async () => {
      const arr = new Array(0);
      API.getMarketsList().then((res) => {
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
      API.getCoinMarketsList(coin_id)
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
    if (isLoading === false){
      setIsLoading(true);
      setErrorMsg("");
      validation.current = true;
      if (marketValue.current == ""){
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

      if (stakingValue.current === ""){
        setStackingValueErr(true);
        validation.current = false;
      }
      if (validation.current === true){
        API.createCoinMarket(marketValue.current, coin_id, maxApyValue.current, minApyValue.current, stakingValue.current, days.current).then(response => {
          setIsSuccess(true);
          setIsOpen(false);
          setIsLoading(false);
        }).catch(error => {
          setIsLoading(false);
          setErrorMsg(error.response.data.error);
        })
      } else {
        setIsLoading(false);
      }
    }
  }

  const marketListHandle = (selectedObject: any) => {
    marketValue.current = selectedObject.value;
    if ( selectedObject.value === undefined){
      setMarketValueErr(true)
    } else {
      setMarketValueErr(false)
    }
  }

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
    if (selectedObject.value != "Locked"){
      setDaysValueError(false);
    } 
    setStackingValueErr(false);
  }

  return (
    <section className={styles.oneCoinContainer}>
      <article className={styles.oneCoinFull}>
        <div className={styles.coinName}>
          {image? 
            <Image className={styles.coinName_image} height={32} width={32} src={image} />
          :
            <></>
          }
          <div>
            <p className={`${styles.oneCoin_defaultStyling} ${styles.coinName_name}`}>{abbreviature}</p>
            <p className={`${styles.oneCoin_defaultStyling} ${styles.coinName_abbreviature}`}>{name}</p>
          </div>
        </div>
        {max_apy? 
          <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}>{max_apy}%</p>
        :
          <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}></p>
        }
        {min_apy? 
          <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}>{min_apy}%</p>
        :
          <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter} ${styles.highest_apy}`}></p>
        }
        <p className={`${styles.oneCoin_defaultStyling} ${styles.allignCenter}`}>{age}</p>
        {setActive === "active" ? <p className={`${styles.close} ${styles.allignRight}`} onClick={toggleAccordion}>Close</p> : <p className={`${styles.more} ${styles.allignRight}`} onClick={toggleAccordion}> More</p>}
      </article>
      {isOpenList ?
        <div ref={content} className={styles.accordion__content}>
          <section className={oneMarketStyles.coinMarketsTable}>
            <div className={oneMarketStyles.coinMarketsRow}>
              <p className={oneMarketStyles.coinMarketsColumn}>Platform</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Max APY</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Min APY</p>
              <p className={oneMarketStyles.coinMarketsColumn}>Days</p>
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
                  <h2>Add new contribution for {name} {image? <Image className={styles.coinName_image} height={24} width={24} src={image}/>: <></>}</h2>
                  <Select className={marketValueErr ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect} isSearchable={true} placeholder="Select Market" options={marketsList} onChange={marketListHandle}/>
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
