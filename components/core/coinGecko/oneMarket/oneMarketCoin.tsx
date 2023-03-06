import React, { FC, useState, useRef } from "react";
import Image from "next/image";
import Select from "react-select";
import TextField from "@mui/material/TextField";


import { HugsApi } from "../../../../services/hugsApi";
import { findTimeDelta } from "../../../../core/utils/converters/timeDelta";
import { CoinMarkets } from "../../../../core/types/types";

import styles from "../oneMarket/oneMarketCoin.module.css";
import oneMarketStyles from "../oneCoin/topProjects/oneProject.module.css";

export interface OneMarketCoinProps {
    coinMarketsData: CoinMarkets
}

const OneMarketCoin: FC<OneMarketCoinProps> = (props: OneMarketCoinProps) => {
  const { coinMarketsData } = props;
  const API = new HugsApi();
  const [isOpen, setIsOpen] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [coinInMarketTypesErr, setCoinInMarketTypesErr] = useState(false);
  const [coinOnMarket, setCoinOnMarket] = useState(NaN);
  const [created, setCreated] = useState(false);
  const [exist, setExist] = useState(false);
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
  const coinInMarketTypes = [
    { value: true, label: "Yes" },
    { value: false, label: "No" }
  ];
  const stakingTypes = [
    { value: "Unknown", label: "Unknown" },
    { value: "Locked", label: "Locked" },
    { value: "Flexible", label: "Flexible" }
  ];

  const openModal = () => {
    setIsOpen(true);
  }

  const coinOnMarketHandle = (selectedObject: any) => {
    setCoinOnMarket(selectedObject.value);
    setCoinInMarketTypesErr(false);
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
    setStackingValueErr(false);
  }

  const validate = () => {
    if (isLoading === false){
      setIsLoading(true)
      validation.current = true;
      if (Object.is(coinOnMarket, NaN)) {
        setCoinInMarketTypesErr(true);
        validation.current = false;
        setIsLoading(false);
        return
      }
      if (coinOnMarket){
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

        if (days.current === ""){
          setDaysValueError(true);
          validation.current = false;
        }

        if (stakingValue.current === ""){
          setStackingValueErr(true);
          validation.current = false;
        }
        if (validation.current) {
          API.updateCoinMarket(coinMarketsData.market.market_id, coinMarketsData.coin.coin_id, maxApyValue.current, minApyValue.current, stakingValue.current, days.current)
              .then(response => {
                setIsLoading(false);
                if (response.status == 200){
                  setExist(true);
                  setIsOpen(false);
                }
                if (response.status == 201){
                  setCreated(true);
                  setIsOpen(false);
                }
              })
              .catch(error => {
                setIsLoading(false);
                setErrMsg(error.response.data.detail);
            })
        }
      } else {
        API.deleteCoinMarket(coinMarketsData.id)
        .then(response => {
          if (response.status == 200){
            setExist(true);
            setIsOpen(false);
            setIsLoading(false);
          }
          if (response.status == 201){
            setCreated(true);
            setIsOpen(false);
            setIsLoading(false);
          }
        })
        .catch(error => {
          setIsLoading(false);
          setErrMsg(error.response.data.detail);
        })
      }
    }
  }

  return (
    <div key={coinMarketsData.market.market_id}>
      <div className={styles.coinMarketsRow}>
        <div className={`${styles.coinMarketsColumn}  ${styles.allignLeft} ${styles.coinLogo}`}>
          <Image className={styles.oneProject_coinLogo} height={24} width={24} src={coinMarketsData.coin.image} />
          <p className={styles.oneMarketName}>{coinMarketsData.coin.name}</p>
        </div>
        <p className={styles.coinMarketsColumn + " " + styles.highest_apy}>{coinMarketsData.max_apy}%</p>
        <p className={styles.coinMarketsColumn}>{findTimeDelta(coinMarketsData.last_updated)}</p>
        <p className={styles.coinMarketsColumn}>{coinMarketsData.staking_type}</p>
        <div className={styles.coinMarketsColumn}>
          <p className={styles.oneMarket_updateNowButton} onClick={openModal}>Update now</p>
        </div>
      </div>
      {isOpen? 
        <div className={styles.updateContainer}>
          {/* TODO 2 */}
          <h2 className={styles.updateContainerTitle}>Update contribution for {coinMarketsData.coin.abbreviature} on {coinMarketsData.market.platform}</h2>
          <Select className={coinInMarketTypesErr ? styles.modalContentSelect + " " + styles.modalContentSelectError : styles.modalContentSelect } placeholder="Coin still on market?" options={coinInMarketTypes} onChange={coinOnMarketHandle}/>
          {coinOnMarket ? 
            <div>
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
            
              <TextField 
                id="days-id"
                label="Days"
                placeholder="90"
                variant="outlined"
                type="number"
                className={daysValueError ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect }
                onChange={daysChange}/>
              
              <Select className={stackingValueErr ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect } isSearchable={true} placeholder="Select Staking type" options={stakingTypes} onChange={stackingHandle}/>
            </div>
          : 
            <></> 
          } 
        { errMsg ? <p className={styles.modalCloseError}>{errMsg}</p>: <></>}
        <div className={styles.modalSubmit}>
            <button className={styles.updateBtn} onClick={validate}>Submit</button>
        </div>
        </div>
      : exist ?
        <div className={styles.updateContainer}>
          <h2 className={styles.updateContainerTitle}>This contribution has already been created and is being reviewed.</h2>
          <div className={styles.modalSubmit}>
            <button className={styles.updateBtn}  onClick={() => setExist(false)}>Close</button>
          </div>
        </div>
      : created ? 
      <div className={styles.updateContainer}>
        <h2 className={styles.updateContainerTitle}>APY Update added for Review.</h2>
        <p className={styles.updateGreenText}>Thank you!! for Contributing to the Earn dApp.</p>
        <p className={styles.updateGreyText}>Please note that your contribution will not be visible in the app right away.</p>
        <p className={styles.updateGreyText}>This will be sent to a number of Reviewers first, who will then decide whether your entry should be Accepted or Rejected.</p>
        <div className={styles.modalSubmit}>
          <button className={styles.updateBtn}  onClick={() => setCreated(false)}>Close</button>
        </div>
      </div>
      : <></>}
    </div>
  );
};

export default OneMarketCoin;
