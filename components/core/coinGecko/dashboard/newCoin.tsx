import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';

// data
import { HugsApi } from "../../../../services/hugsApi";


// styles
import styles from "./newCoin.module.css";
import mainStyles from "../../layout/homePage.module.scss";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50vw",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "25px",
  p: 4,
};

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    margin: "1em 0",
    background: "#E2F5FA",
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    fontColor: '#292D32',
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "red" : "blue"
    }
  }),
  menu: (base: any) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    fontColor: '#292D32',
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    fontColor: '#292D32',
  })
};

/**
 * @class
 * @ignore
 */
function App() {
  const API = new HugsApi();
  const search = useRef("");
  const currentPage = useRef(0);
  const orderBy = useRef("name");
  const [ open, setOpen ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSuccessOpen = () => setIsSuccess(true);
  const handleSuccessClose = () => setIsSuccess(false);
  const [isLoading, setIsLoading] = useState(false);
  const coinName = useRef("");
  const [ coinNameError , setCoinNameError ] = useState(false);
  const coinAbbreviature = useRef("");
  const [ coinAbbreviatureError, setCoinAbbreviatureError ] = useState(false);
  const validation = useRef(false);
  const [ marketsList, setMarketsList ] = useState([{value: "create_new", label: "Create new"}]);
  const marketValue = useRef("");
  const [ coinsList, setCoinsList ] = useState([{value: "create_new", label: "Create new"}]);
  const coinValue = useRef("");
  const [ marketValueErr, setMarketValueErr ] = useState(false);
  const [ coinValueErr, setCoinValueErr ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState("");
  const [showNewMarket, setShowNewMarket] = useState(false);
  const marketName = useRef("");
  const [ marketNameError , setMarketNameError ] = useState(false);
  const marketLink = useRef("");
  const [ marketLinkError , setMarketLinkError ] = useState(false);
  const [showNewCoin, setShowNewCoin] = useState(false);
  const stakingValue = useRef("");
  const [stackingValueErr, setStackingValueErr] = useState(false);
  const minApyValue = useRef("");
  const [ minApyValueError, setMinApyValueError ] = useState(false);
  const maxApyValue = useRef("");
  const [ maxApyValueError, setMaxApyValueError ] = useState(false);
  const days = useRef("");
  const [ daysValueError, setDaysValueError ] = useState(false);
  const stakingTypes = [
    { value: "Unknown", label: "Unknown" },
    { value: "Locked", label: "Locked" },
    { value: "Flexible", label: "Flexible" }
  ];

  const newMarketNameChange = (selectedObject: any) => {
    marketName.current = selectedObject.target.value;
    if (selectedObject.target.value == "") {
      setMarketNameError(true);
    } else {
      setMarketNameError(false);
    }
  };

  const newMarketLinkChange = (selectedObject: any) => {
    marketLink.current = selectedObject.target.value;
    if (selectedObject.target.value == "") {
      setMarketLinkError(true);
    } else {
      setMarketLinkError(false);
    }
  };

  const coinNameChange = (selectedObject: any) => {
    coinName.current = selectedObject.target.value;
    if (selectedObject.target.value == "") {
      setCoinNameError(true);
    } else {
      setCoinNameError(false);
    }
  };

  const coinAbbreviatureChange = (selectedObject: any) => {
    coinAbbreviature.current = selectedObject.target.value;
    if (selectedObject.target.value == "") {
      setCoinAbbreviatureError(true);
    } else {
      setCoinAbbreviatureError(false);
    }
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
    if (selectedObject.target.value == "" && stakingValue.current != "Locked") {
      setDaysValueError(true);
    } else {
      setDaysValueError(false);
    }
  };

  const createNewCoin = () => {
    if (isLoading === false){
      setIsLoading(true);
      validation.current = true;
      
      if (marketValue.current == ""){
        setMarketValueErr(true);
        validation.current = false;
      }

      if (marketValue.current == 'create_new') {
        if (marketName.current == ""){
          setMarketNameError(true);
        } else {
          setMarketNameError(false);
        }
        if (marketLink.current == "") {
          setMarketLinkError(true);
        } else {
          setMarketLinkError(false)
        }
      }

      if (coinValue.current == ""){
        setCoinValueErr(true);
        validation.current = false;
      }

      if (coinValue.current == 'create_new') {
        if (coinName.current == ""){
          validation.current = false;
          setCoinNameError(true);
        }
        
        if (coinAbbreviature.current == ""){
          validation.current = false;
          setCoinAbbreviatureError(true);
        }
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

      if (validation.current) {
        API.createCoinMarket(
          marketValue.current, 
          coinValue.current, 
          maxApyValue.current,
          minApyValue.current,
          stakingValue.current,
          days.current,
          marketName.current, 
          marketLink.current,
          coinName.current,
          coinAbbreviature.current)
          .then(response => {
            handleClose();
            handleSuccessOpen();
            setIsLoading(false);
          })
          .catch(error => {
            setIsLoading(false);
            setErrorMsg(error.response.data.error);
          })
      } else {
        setIsLoading(false);
      }
    }
  };

  const marketListHandle = (selectedObject: any) => {
    marketValue.current = selectedObject.value;
    if (marketValue.current == 'create_new') {
      setShowNewMarket(true);
    } else {
      setShowNewMarket(false);
    }
    if ( selectedObject.value == undefined) {
      setMarketValueErr(true)
    } else {
      setMarketValueErr(false)
    }
  }
  
  const stackingHandle = (selectedObject: any) => {
    stakingValue.current = selectedObject.value;
    setStackingValueErr(false);
  }

  const coinListHandle = (selectedObject: any) => {
    coinValue.current = selectedObject.value;
    if (coinValue.current == 'create_new'){
      setShowNewCoin(true);
    } else {
      setShowNewCoin(false);
    }
    if ( selectedObject.value == undefined) {
      setCoinValueErr(true)
    } else {
      setCoinValueErr(false)
    }
  }

  useEffect(() => {
    // page = 0, search = '', orderBy='name', per_page=25, status=""
    API.getMarketsList(0, "", "platform", 25, "all").then(response => {
      const arr = new Array(0);
      arr.push({value: "create_new", label: "Create New"});
      response.data.items.map((market: any) => {
        return arr.push({value: market.market_id, label: market.platform});
      })
      setMarketsList(arr);
    })
    API.getCoinsList(currentPage.current, search.current, orderBy.current, 'all').then(response => {
      const arr = new Array(0);
      arr.push({value: "create_new", label: "Create New"});
      response.data.items.map((coin: any) => {
        return arr.push({value: coin['coin_id'], label: coin['abbreviature'] + " - " + coin['name']})
      })
      setCoinsList(arr);
    })
  }, [])

  return (
    <>
      <div className={styles.newCoinBanner}>
        <div className={styles.newCoinBannerRow}>
          <div className={styles.newCoinBannerColumn}>
            <h1>Best Crypto Staking Platforms</h1>
            <h2>Find the reliable and best Crypto Staking platforms and earn Rewards by holding coins.</h2>
          </div>
          <div className={styles.newCoinBannerColumn}>
            <button className={styles.addNewCoinButton} onClick={handleOpen} type="button">
              + Add new coin
            </button>
          </div>
        </div>
      </div>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <div className={styles.newCoinBody}>
                <Typography id="transition-modal-title" className={styles.newCoinTile} variant="h2" component="h2">
                    Add new coin to the list
                </Typography>
                <Select styles={customStyles} isSearchable={true} placeholder="Select Market" options={marketsList} onChange={marketListHandle}/>
                { marketValueErr && <p>Select one</p>}
                { showNewMarket && 
                  <div>
                    <TextField 
                      id="market-name-id" 
                      label="Market Name"
                      hiddenLabel
                      variant="outlined"
                      error={marketNameError == true}
                      helperText={marketNameError == true ? '(required)' : ''}
                      className={styles.newCoinInput} 
                      onChange={newMarketNameChange}/>
                    <TextField 
                      id="market-link-id" 
                      label="Market Link" 
                      variant="outlined"
                      error={marketLinkError == true}
                      helperText={marketLinkError == true ? '(required)' : ''}
                      className={styles.newCoinInput} 
                      onChange={newMarketLinkChange}/>
                  </div>
                }
                <Select styles={customStyles} isSearchable={true} placeholder="Select Coin" options={coinsList} onChange={coinListHandle}/>
                { coinValueErr && <p>Select one</p>}
                { showNewCoin &&
                  <div>
                    <TextField 
                      id="coin-name-id" 
                      label="Coin Name" 
                      variant="outlined"
                      error={coinNameError == true}
                      helperText={coinNameError == true ? '(required)' : ''}
                      className={styles.newCoinInput} 
                      onChange={coinNameChange}/>

                    <TextField 
                      id="coin-abbreviature-id" 
                      label="Coin Abbreviature" 
                      variant="outlined"
                      error={coinAbbreviatureError == true}
                      helperText={coinAbbreviatureError == true ? '(required)' : ''}
                      className={styles.newCoinInput} 
                      onChange={coinAbbreviatureChange}/>
                  </div>
                }
                <TextField 
                  id="min-apy-id" 
                  label="Minimum Annual Percentage Yield"
                  placeholder="0.00"
                  variant="outlined"
                  type="number" 
                  className={minApyValueError? styles.newCoinInput + " " + styles.textFielInputLabel + " " + styles.newCoinInputField + " " + styles.selectError : styles.newCoinInput + " " + styles.textFielInputLabel + " " + styles.newCoinInputField} 
                  onChange={minApyChange}/>
                
                <TextField 
                  id="max-apy-id" 
                  label="Maximum Annual Percentage Yield"
                  placeholder="0.00"
                  variant="outlined"
                  type="number" 
                  className={maxApyValueError? styles.newCoinInput + " " + styles.textFielInputLabel + " " + styles.newCoinInputField + " " + styles.selectError : styles.newCoinInput + " " + styles.textFielInputLabel + " " + styles.newCoinInputField} 
                  onChange={maxApyChange}/>

                <Select styles={customStyles} isSearchable={true} placeholder="Select Staking type" options={stakingTypes} onChange={stackingHandle}/>

                <TextField 
                  id="days-id" 
                  label="Days"
                  placeholder="0.00"
                  variant="outlined"
                  type="number" 
                  className={daysValueError? styles.newCoinInput + " " + styles.textFielInputLabel + " " + styles.newCoinInputField + " " + styles.selectError : styles.newCoinInput + " " + styles.textFielInputLabel + " " + styles.newCoinInputField} 
                  onChange={daysChange}/>

                { stackingValueErr && <p>Select one</p>}
                { errorMsg && <h2 className={styles.errorMsg}>{errorMsg}</h2>}
                <Container className={styles.submitAddNewCoin}>
                    <button className={mainStyles.mainButton} disabled={isLoading} onClick={createNewCoin}>Submit</button>
                </Container>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={isSuccess} onClose={handleSuccessClose} closeAfterTransition>
        <Fade in={isSuccess}>
          <Box sx={style}>
          <div className={styles.newCoinBody}>
                <Typography id="transition-modal-title" className={styles.newCoinTile} variant="h2" component="h2">
                  APY Update added for Review
                </Typography>
                <Typography id="transition-modal-title" className={styles.newCoinTileBody} variant="h3" component="h3">
                  Thank you!!
                  for Contributing to the Earn dApp.
                </Typography>
                <img className={styles.newCoinBodyWarning} src='/static/src/warning.png'/>
                <Typography id="transition-modal-title" className={styles.newCoinDesc} variant="h3" component="h3">
                  Please note that your contribution will not be visible in the app right away.
                </Typography>
                <Typography id="transition-modal-title" className={styles.newCoinDesc} variant="h3" component="h3">
                  This will be sent to a number of Reviewers first, who will then decide whether your entry should be Accepted or Rejected.
                </Typography>
                <Container className={styles.submitAddNewCoin}>
                    <button className={mainStyles.mainButton} onClick={handleSuccessClose}>Close</button>
                </Container>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default App;