import React, { FC, useState, useRef } from "react";
import Image from "next/image";
import Select from "react-select";
import { Modal } from "react-bootstrap";


import { HugsApi } from "../../../../../services/hugsApi";
import { findTimeDelta } from "../../../../../core/utils/converters/timeDelta";
import { CoinMarkets, CoinTypes } from "../../../../../core/types/types";

import oneMarketStyles from "../../oneCoin/topProjects/oneProject.module.css";

export interface OneProjectProps {
  oneProjectData: CoinMarkets;
  oneCoinInfo: CoinTypes
}

const OneCoinMarket: FC<OneProjectProps> = (props: OneProjectProps) => {
  const { oneProjectData, oneCoinInfo } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const apyValue = useRef(0.00);
  const [apyValueErr, setApyValueErr] = useState(false);
  const stackingValue = useRef("");
  const [stackingValueErr, setStackingValueErr] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [txHash, setTxHash] = useState('');
  const [validation, setValidation] = useState(true);
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

  const linkHangler = (selectedObject: any) => {
    new HugsApi().marketClick(selectedObject.target.id);
  };

  const stackingHandle = (selectedObject: any) => {
    stackingValue.current = selectedObject.value;
    setStackingValueErr(false)
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
    if (stackingValue.current == ""){
      setStackingValueErr(true);
      setValidation(false);
    }
    if (validation) {
      new HugsApi().updateCoinMarket(oneProjectData.market.market_id, oneCoinInfo.coin_id, apyValue.current, stackingValue.current)
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
    <div key={oneProjectData.market.market_id} className={oneMarketStyles.coinMarketsRow}>
      <div className={`${oneMarketStyles.coinMarketsColumn} ${oneMarketStyles.oneProject_stakingLinkName_full} ${oneMarketStyles.allignLeft}`}>
        <Image className={oneMarketStyles.oneProject_coinLogo} height={24} width={24} src={oneProjectData.market.logo} />
        <p className={`${oneMarketStyles.oneProject_name} ${oneMarketStyles.projectList_fontSize}`}>{oneProjectData.market.platform}</p>
      </div>
      <p className={oneMarketStyles.coinMarketsColumn}>{oneProjectData.apy}%</p>
      <p className={oneMarketStyles.coinMarketsColumn}>{findTimeDelta(oneProjectData.last_updated)}</p>
      <p className={oneMarketStyles.coinMarketsColumn}>{oneProjectData.locked ? "Locked": "Flexible"}</p>
      <a id={oneProjectData.market.market_id} className={oneMarketStyles.coinMarketsColumn} href={oneProjectData.market.link} target="_blank" rel="noreferrer" onClick={linkHangler}>{oneProjectData.market.platform}</a>
      <p className={oneMarketStyles.coinMarketsColumn}>{oneProjectData.market.click}</p>
      {oneProjectData.open_contribution ? 
        <p className={oneMarketStyles.coinMarketsColumn + " " + oneMarketStyles.oneProject_upToDate}>Up to date</p> : 
        <p className={oneMarketStyles.coinMarketsColumn + " " + oneMarketStyles.oneProject_updateNowButton} onClick={openModal}>Update now</p>}

      <section className={oneMarketStyles.oneCoinMarketContainer}>
        <Modal show={isOpen}>
          <div className={oneMarketStyles.modal}>
            <div className={oneMarketStyles.modalDialog}>
              <div className={oneMarketStyles.modalContent}>
                <h2>Up to date contribution for {oneCoinInfo.abbreviature} on {oneProjectData.market.platform} <Image className={oneMarketStyles.coinName_image} height={32} width={32} src={oneProjectData.market.logo} /></h2> 
                <div className={oneMarketStyles.modalClose} onClick={closeModal}></div>
                <Select className={oneMarketStyles.modalContentSelect} placeholder="Select Staking type" options={stakingTypes} onChange={stackingHandle}/>
                { stackingValueErr ? <label className={oneMarketStyles.modalCloseError}>Select one</label>: <></>}
                <label>Annual Percentage Yield (APY 123)</label>
                <input type="number" placeholder="0.00" name="apy_value" onChange={apyHandle}/>
                { apyValueErr ? <label className={oneMarketStyles.modalCloseError}>Please input number</label>: <></>}
                { errMsg ? <label className={oneMarketStyles.modalCloseError}>{errMsg}</label>: <></>}
                <div className={oneMarketStyles.modalSubmit}>
                  <button className={oneMarketStyles.modalSubmitBtn} onClick={validate}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal show={isSuccess}>
          <div className={oneMarketStyles.modal}>
            <div className={oneMarketStyles.modalDialog}>
              <div className={oneMarketStyles.modalContent}>
                <p>Thank you for contributing to the Earn dApp. Please note that your contribution will not be visible in the app right away.</p>
                <p>This will be sent to a number of Reviewers first, who will the decide whether your entry should be accepted or rejected.</p>
                <p> Please do net attempt to submit the same staking opportunity more than once and do not try to make fake entries, as both actions will result in lower Reputation Score for you as a user.</p>
                <p>Also, you will noy be eligible for rewards then.</p>
                <p>You can see your transaction on <a rel="noreferrer" target="_blank" href={`${process.env.NEXT_PUBLIC_SCAN_URL}/${txHash}`}>Ploygon Scan</a></p>
                <div className={oneMarketStyles.modalSubmit}>
                  <button className={oneMarketStyles.modalSubmitBtn} onClick={closeSuccessModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default OneCoinMarket;
