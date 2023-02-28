import React, { FC, useState, useRef } from "react";
import Image from "next/image";
import Select from "react-select";
import TextField from "@mui/material/TextField";


import { HugsApi } from "../../../../services/hugsApi";
import { findTimeDelta } from "../../../../core/utils/converters/timeDelta";
import { CoinMarkets } from "../../../../core/types/types";

import styles from "../oneMarket/oneMarketCoin.module.css";

export interface OneMarketCoinProps {
    coinMarketsData: CoinMarkets
}

const OneMarketCoin: FC<OneMarketCoinProps> = (props: OneMarketCoinProps) => {
  const { coinMarketsData } = props;
  const API = new HugsApi();
  const [isOpen, setIsOpen] = useState(false);
  const apyValue = useRef(0);
  const [apyValueErr, setApyValueErr] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [validation, setValidation] = useState(false);
  const [coinInMarketTypesErr, setCoinInMarketTypesErr] = useState(false);
  const [coinOnMarket, setCoinOnMarket] = useState(NaN);
  const [created, setCreated] = useState(false);
  const [exist, setExist] = useState(false);
  const coinInMarketTypes = [
    { value: true, label: "Yes" },
    { value: false, label: "No" }
  ];

  const openModal = () => {
    setIsOpen(true);
  }

  const coinOnMarketHandle = (selectedObject: any) => {
    setCoinOnMarket(selectedObject.value);
    setCoinInMarketTypesErr(false);
  }

  const apyChange = (selectedObject: any) =>{
    apyValue.current = selectedObject.target.value;
    if (selectedObject.target.value >= 0){
      setApyValueErr(false);
    }
  }

  const validate = () => {
    setValidation(true);
    if (Object.is(coinOnMarket, NaN)) {
      setCoinInMarketTypesErr(true);
      setValidation(false);
    }
    if (coinOnMarket){
      if (apyValue.current < 0){
        setApyValueErr(true);
        setValidation(false);
      }
    }
    if (validation == true) {
      if (coinOnMarket) {
        API.updateCoinMarket(coinMarketsData.market.market_id, coinMarketsData.coin.coin_id, apyValue.current)
            .then(response => {
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
              setErrMsg(error.response.data.detail);
          })
      } else {
        API.deleteCoinMarket(coinMarketsData.id)
        .then(response => {
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
        <p className={styles.coinMarketsColumn + " " + styles.highest_apy}>{coinMarketsData.apy}%</p>
        <p className={styles.coinMarketsColumn}>{findTimeDelta(coinMarketsData.last_updated)}</p>
        <p className={styles.coinMarketsColumn}>{coinMarketsData.locked ? "Locked": "Flexible"}</p>
        <div className={styles.coinMarketsColumn}>
          {coinMarketsData.open_contribution ? 
            <p className={styles.oneMarket_upToDate}>Up to date</p> : 
            <p className={styles.oneMarket_updateNowButton} onClick={openModal}>Update now</p>
          }
        </div>
      </div>
      {isOpen? 
        <div className={styles.updateContainer}>
          <h2 className={styles.updateContainerTitle}>Update contribution for {coinMarketsData.coin.abbreviature} on {coinMarketsData.market.platform}</h2>
          <Select className={coinInMarketTypesErr ? styles.modalContentSelect + " " + styles.modalContentSelectError : styles.modalContentSelect } placeholder="Coin still on market?" options={coinInMarketTypes} onChange={coinOnMarketHandle}/>
          {coinOnMarket ? 
            <div>
              <TextField 
                    id="apy-id" 
                    label="Annual Percentage Yield"
                    placeholder="0.00"
                    variant="outlined"
                    type="number" 
                    className={apyValueErr? styles.modalContentSelectError + " " + styles.newCoinInput + " " + styles.textFielInputLabel : styles.newCoinInput + " " + styles.textFielInputLabel} 
                    onChange={apyChange}/>
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
