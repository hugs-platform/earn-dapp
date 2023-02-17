import React, { FC, useState, useRef } from "react";
import Image from "next/image";
import Select from "react-select";
import { Modal } from "react-bootstrap";


import { HugsApi } from "../../../../services/hugsApi";
import { findTimeDelta } from "../../../../core/utils/converters/timeDelta";
import { CoinMarkets } from "../../../../core/types/types";

import styles from "../oneMarket/oneMarketCoin.module.css";

export interface OneMarketCoinProps {
    coinMarketsData: CoinMarkets
}

const OneMarketCoin: FC<OneMarketCoinProps> = (props: OneMarketCoinProps) => {
  const { coinMarketsData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const apyValue = useRef(0.00);
  const [apyValueErr, setApyValueErr] = useState(false);
  const stackingValue = useRef("");
  const [stackingValueErr, setStackingValueErr] = useState(true);
  const [errMsg, setErrMsg] = useState();
  const [txHash, setTxHash] = useState('');
  const [validation, setValidation] = useState(false);
  const stakingTypes = [
    { value: NaN, label: "Unknown" },
    { value: true, label: "Locked" },
    { value: false, label: "Flexible" }
  ];

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const closeSuccessModal = () => {
    setIsSuccess(false);
  }

  const stackingHandle = (selectedObject: any) => {
    stackingValue.current = selectedObject.value;
    setStackingValueErr(false);
  }

  const apyHandle = (selectedObject: any) => {
    apyValue.current = selectedObject.target.value;
    if (selectedObject.target.value){
      setApyValueErr(false);
    } else {
      setApyValueErr(true);
    }
  } 

  const validate = () => {
    setValidation(true);
    if (apyValue.current < 0) {
      setApyValueErr(true);
      setValidation(false);
    }
    if (stackingValue.current === ""){
      setStackingValueErr(true);
      setValidation(false);
    }
    if (validation == true) {
      new HugsApi().updateCoinMarket(coinMarketsData.market.market_id, coinMarketsData.coin.coin_id, apyValue.current, stackingValue.current)
        .then(response => {
          setIsSuccess(true);
          setTxHash(response.data.result);
          setIsOpen(false);
        })
        .catch(error => {
          setErrMsg(error.response.data.error);
        })
    }
  }

  return (
    <div key={coinMarketsData.market.market_id} className={styles.coinMarketsRow}>
      <div className={`${styles.coinMarketsColumn}  ${styles.allignLeft} ${styles.coinLogo}`}>
        <Image className={styles.oneProject_coinLogo} height={24} width={24} src={coinMarketsData.coin.image} />
        <p className={styles.oneMarketName}>{coinMarketsData.coin.name}</p>
      </div>
      <p className={styles.coinMarketsColumn}>{coinMarketsData.apy}%</p>
      <p className={styles.coinMarketsColumn}>{findTimeDelta(coinMarketsData.last_updated)}</p>
      <p className={styles.coinMarketsColumn}>{coinMarketsData.locked ? "Locked": "Flexible"}</p>
      <p className={styles.coinMarketsColumn}>{coinMarketsData.coin.click}</p>
      {coinMarketsData.open_contribution ? 
        <p className={styles.coinMarketsColumn + " " + styles.oneMarket_upToDate}>Up to date</p> : 
        <p className={styles.coinMarketsColumn + " " + styles.oneMarket_updateNowButton} onClick={openModal}>Update now</p>}

    <section className={styles.oneCoinMarketContainer}>
        <Modal show={isOpen}>
          <div className={styles.modal}>
            <div className={styles.modalDialog}>
              <div className={styles.modalContent}>
                <h2>Up to date contribution for {coinMarketsData.coin.abbreviature} on {coinMarketsData.market.platform} <Image className={styles.coinName_image} height={32} width={32} src={coinMarketsData.market.logo} /></h2> 
                <div className={styles.modalClose} onClick={closeModal}></div>
                <Select className={styles.modalContentSelect} placeholder="Select Staking type" options={stakingTypes} onChange={stackingHandle}/>
                { stackingValueErr ? <label className={styles.modalCloseError}>Select one</label>: <></>}
                <label>Annual Percentage Yield (APY)</label>
                <input type="number" placeholder="0.00" name="apy_value" onChange={apyHandle}/>
                { apyValueErr ? <label className={styles.modalCloseError}>Please input number</label>: <></>}
                { errMsg ? <label className={styles.modalCloseError}>{errMsg}</label>: <></>}
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
                <p>You can see your transaction on <a rel="noreferrer" target="_blank" href={`${process.env.NEXT_PUBLIC_SCAN_URL}/${txHash}`}>Ploygon Scan</a></p>
                <div className={styles.modalSubmit}>
                  <button className={styles.modalSubmitBtn} onClick={closeSuccessModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default OneMarketCoin;
