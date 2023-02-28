import React, { FC, useState, useRef } from "react";
import Image from "next/image";
import Select from "react-select";
import TextField from "@mui/material/TextField";


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
  const apyValue = useRef(0.00);
  const [errMsg, setErrMsg] = useState();
  const [created, setCreated] = useState(false);
  const [exist, setExist] = useState(false);
  const [validation, setValidation] = useState(true);
  const [coinOnMarket, setCoinOnMarket] = useState(NaN);
  const [coinInMarketTypesErr, setCoinInMarketTypesErr] = useState(false);
  const API = new HugsApi();
  const coinInMarketTypes = [
    { value: true, label: "Yes" },
    { value: false, label: "No" }
  ];

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const linkHangler = (selectedObject: any) => {
    new HugsApi().marketClick(selectedObject.target.id);
  };

  const coinOnMarketHandle = (selectedObject: any) => {
    setCoinOnMarket(selectedObject.value);
    setCoinInMarketTypesErr(false);
  }

  const apyChange = (selectedObject: any) =>{
    apyValue.current = selectedObject.target.value;
  }

  const validate = () => {
    setValidation(true);
    if (Object.is(coinOnMarket, NaN)) {
      setCoinInMarketTypesErr(true);
      setValidation(false);
    } else {
      if (coinOnMarket) {
        if (apyValue.current < 0) {
          setValidation(false);
        }
        if (validation) {
          API.updateCoinMarket(oneProjectData.market.market_id, oneCoinInfo.coin_id, apyValue.current)
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
      } else {
        API.deleteCoinMarket(oneProjectData.id)
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
    <div key={oneProjectData.market.market_id}>
      <div className={oneMarketStyles.coinMarketsRow}>
        <div className={`${oneMarketStyles.coinMarketsColumn} ${oneMarketStyles.oneProject_stakingLinkName_full} ${oneMarketStyles.allignLeft}`}>
          <Image className={oneMarketStyles.oneProject_coinLogo} height={24} width={24} src={oneProjectData.market.logo} />
          <p className={`${oneMarketStyles.oneProject_name} ${oneMarketStyles.projectList_fontSize}`}>{oneProjectData.market.platform}</p>
        </div>
        <p className={oneMarketStyles.coinMarketsColumn + " " + oneMarketStyles.apy}>{oneProjectData.apy}%</p>
        <p className={oneMarketStyles.coinMarketsColumn}>{findTimeDelta(oneProjectData.last_updated)}</p>
        <p className={oneMarketStyles.coinMarketsColumn}>{oneProjectData.locked ? "Locked": "Flexible"}</p>
        <a id={oneProjectData.market.market_id} className={oneMarketStyles.coinMarketsColumn} href={oneProjectData.market.link} target="_blank" rel="noreferrer" onClick={linkHangler}>{oneProjectData.market.platform}</a>
        <p className={oneMarketStyles.coinMarketsColumn}>{oneProjectData.market.click}</p>
        {oneProjectData.open_contribution ? 
          <div className={oneMarketStyles.coinMarketsColumn}><p className={oneMarketStyles.oneProject_upToDate}>Up to date</p></div> : 
          isOpen ? 
            <div className={oneMarketStyles.coinMarketsColumn}><p className={oneMarketStyles.oneProject_closeNowButton} onClick={closeModal}>Close</p></div>:
          exist ?
            <div className={oneMarketStyles.coinMarketsColumn}><p className={oneMarketStyles.oneProject_upToDate}>Pending</p></div> :
          created ?
          <div className={oneMarketStyles.coinMarketsColumn}><p className={oneMarketStyles.oneProject_upToDate}>Pending</p></div> :
          <div className={oneMarketStyles.coinMarketsColumn}><p className={oneMarketStyles.oneProject_updateNowButton} onClick={openModal}>Update now</p></div>
        }
      </div>
      {isOpen ?
      <div className={oneMarketStyles.updateContainer}>
        <h2 className={oneMarketStyles.updateContainerTitle}>Update contribution for {oneCoinInfo.abbreviature} on {oneProjectData.market.platform}</h2>
        <Select className={coinInMarketTypesErr ? oneMarketStyles.modalContentSelect + " " + oneMarketStyles.modalContentSelectError : oneMarketStyles.modalContentSelect } placeholder="Coin still on market?" options={coinInMarketTypes} onChange={coinOnMarketHandle}/>
        {coinOnMarket ? 
          <div>
            <TextField 
                  id="apy-id" 
                  label="Annual Percentage Yield"
                  placeholder="0.00"
                  variant="outlined"
                  type="number" 
                  className={oneMarketStyles.newCoinInput + " " + oneMarketStyles.textFielInputLabel} 
                  onChange={apyChange}/>
          </div>
        : <></>} 
        { errMsg ? <p className={oneMarketStyles.modalCloseError}>{errMsg}</p>: <></>}
        <div className={oneMarketStyles.modalSubmit}>
            <button className={oneMarketStyles.updateBtn} onClick={validate}>Submit</button>
        </div>
      </div>
      : exist ?
        <div className={oneMarketStyles.updateContainer}>
          <h2 className={oneMarketStyles.updateContainerTitle}>This contribution has already been created and is being reviewed.</h2>
          <div className={oneMarketStyles.modalSubmit}>
            <button className={oneMarketStyles.updateBtn}  onClick={() => setExist(false)}>Close</button>
          </div>
        </div>
      : created ? 
      <div className={oneMarketStyles.updateContainer}>
        <h2 className={oneMarketStyles.updateContainerTitle}>APY Update added for Review.</h2>
        <p className={oneMarketStyles.updateGreenText}>Thank you!! for Contributing to the Earn dApp.</p>
        <p className={oneMarketStyles.updateGreyText}>Please note that your contribution will not be visible in the app right away.</p>
        <p className={oneMarketStyles.updateGreyText}>This will be sent to a number of Reviewers first, who will then decide whether your entry should be Accepted or Rejected.</p>
        <div className={oneMarketStyles.modalSubmit}>
          <button className={oneMarketStyles.updateBtn}  onClick={() => setCreated(false)}>Close</button>
        </div>
      </div>
      : <></>}
    </div>
  );
};

export default OneCoinMarket;
