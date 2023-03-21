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
  const [errMsg, setErrMsg] = useState("");
  const [created, setCreated] = useState(false);
  const [exist, setExist] = useState(false);
  const [coinOnMarket, setCoinOnMarket] = useState(NaN);
  const [coinInMarketTypesErr, setCoinInMarketTypesErr] = useState(false);
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
  const API = new HugsApi();
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
      setIsLoading(true);
      setErrMsg("");
      if (Object.is(coinOnMarket, NaN)) {
        setCoinInMarketTypesErr(true);
        setIsLoading(false);
      } else {
        if (coinOnMarket) {
          validation.current = true;
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
          if (validation.current){
            API.updateCoinMarket(oneProjectData.market.market_id, oneCoinInfo.coin_id, maxApyValue.current, minApyValue.current, stakingValue.current, days.current).then(response => {
              setIsLoading(false);
              if (response.status == 200){
                setExist(true);
                setIsOpen(false);
              }
              if (response.status == 201){
                setCreated(true);
                setIsOpen(false);
              }})
            .catch(error => {
              setIsLoading(false);
              setErrMsg(error.response.data.error);
            })
          } else {
            setIsLoading(false);
          }
        } else {
          API.deleteCoinMarket(oneProjectData.id).then(response => {
            setIsLoading(false);
            if (response.status == 200){
              setExist(true);
              setIsOpen(false);
            }
            if (response.status == 201){
              setCreated(true);
              setIsOpen(false);
            }})
            .catch(error => {
              setIsLoading(false);
              setErrMsg(error.response.data.error);
            })
        }
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
        <p className={oneMarketStyles.coinMarketsColumn + " " + oneMarketStyles.apy}>{oneProjectData.max_apy}%</p>
        <p className={oneMarketStyles.coinMarketsColumn + " " + oneMarketStyles.apy}>{oneProjectData.min_apy}%</p>
        <p className={oneMarketStyles.coinMarketsColumn}>{oneProjectData.days}</p>
        <p className={oneMarketStyles.coinMarketsColumn}>{findTimeDelta(oneProjectData.last_updated)}</p>
        <p className={oneMarketStyles.coinMarketsColumn}>{oneProjectData.staking_type}</p>
        <a id={oneProjectData.market.market_id} className={oneMarketStyles.coinMarketsColumn} href={oneProjectData.market.link} target="_blank" rel="noreferrer" onClick={linkHangler}>{oneProjectData.market.platform}</a>
        <p className={oneMarketStyles.coinMarketsColumn}>{oneProjectData.market.click}</p>
        {isOpen ? 
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
        : <></>} 
        { errMsg ? <p className={oneMarketStyles.modalCloseError}>{errMsg}</p>: <></>}
        <div className={oneMarketStyles.modalSubmit}>
            <button className={oneMarketStyles.updateBtn} disabled={isLoading} onClick={validate}>Submit</button>
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
