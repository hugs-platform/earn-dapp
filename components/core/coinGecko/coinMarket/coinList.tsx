import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import ReactPaginate from "react-paginate";
import Select from 'react-select';

// components
import OneCoin from "../oneCoin/oneCoin";
import Banner from "../../banner/banner";

// data
import { HugsApi } from "../../../../services/hugsApi";

// types
import { CoinTypes } from "../../../../core/types/types";

// styles
import styles from "../coinMarket/coinsList.module.css";
import mainStyles from "../../layout/homePage.module.scss";

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    margin: "10px 0",
    background: "#E2F5FA",
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    fontColor: '#292D32',
    maxWidth: "500px",
    widtg: "100%",
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
    width: '100%',
    maxWidth: '500px',
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
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const isLoaded = useRef(true);
  const search = useRef("");
  const currentPage = useRef(0);
  const orderBy= useRef("-max_apy");
  const perPage = "25"; 
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSuccessOpen = () => setIsSuccess(true);
  const handleSuccessClose = () => setIsSuccess(false);
  const [ marketValueErr, setMarketValueErr ] = useState(false);
  const marketValue = useRef("");
  const [showNewMarket, setShowNewMarket] = useState(false);
  const [ marketsList, setMarketsList ] = useState([{value: "create_new", label: "Create new"}]);
  const marketName = useRef("");
  const [ marketNameError , setMarketNameError ] = useState(false);
  const marketLink = useRef("");
  const [ marketLinkError , setMarketLinkError ] = useState(false);
  const [ coinsList, setCoinsList ] = useState([{value: "create_new", label: "Create new"}]);
  const coinValue = useRef("");
  const [showNewCoin, setShowNewCoin] = useState(false);
  const [ coinValueErr, setCoinValueErr ] = useState(false);
  const [ coinNameError , setCoinNameError ] = useState(false);
  const coinName = useRef("");
  const coinAbbreviature = useRef("");
  const [ coinAbbreviatureError, setCoinAbbreviatureError ] = useState(false);
  const minApyValue = useRef("");
  const [ minApyValueError, setMinApyValueError ] = useState(false);
  const maxApyValue = useRef("");
  const [ maxApyValueError, setMaxApyValueError ] = useState(false);
  const stakingValue = useRef("");
  const [stackingValueErr, setStackingValueErr] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState("");
  const days = useRef("");
  const [ daysValueError, setDaysValueError ] = useState(false);
  const validation = useRef(false);
  const stakingTypes = [
    { value: "Unknown", label: "Unknown" },
    { value: "Locked", label: "Locked" },
    { value: "Flexible", label: "Flexible" }
  ];

  const handleFetch = () => {
    if (isLoaded.current == true) {
      isLoaded.current = false;
      API.getCoinsList(currentPage.current, search.current, orderBy.current, perPage)
        .then(response => {
            if (response){
              const result = response.data.items;
              setList(result);
              setPageCount(response.data.number_of_pages);
              isLoaded.current = true;
            }
        })
      return () => [];
    }
  };

  const handlePageChange = (selectedObject: any) => {
    currentPage.current = selectedObject.selected;
    handleFetch();
	};

  const inputHandler = (selectedObject: any) => {
    search.current = selectedObject.target.value;
    currentPage.current = 0;
  };

  const orderByChange = (selectedObject: any) => {
    if (orderBy.current == selectedObject.target.id){
      orderBy.current = "-" + selectedObject.target.id;
    } else {
      orderBy.current = selectedObject.target.id;
    };
    currentPage.current = 0;
    handleFetch();
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

  const stackingHandle = (selectedObject: any) => {
    stakingValue.current = selectedObject.value;
    setStackingValueErr(false);
  }

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

  useEffect(() => {
    handleFetch();
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
      <Banner></Banner>
      {open?
        isSuccess? 
          <div className={styles.newCoinContainer}>
            <div className={styles.newCoinBody}>
              <h2 className={styles.newCoinTile}>APY Update added for Review</h2>
              <h3 className={styles.newCoinTileBody}>Thank you!! for Contributing to the Earn dApp.</h3>
              <img className={styles.newCoinBodyWarning} src='/static/src/warning.png'/>
              <h3 className={styles.newCoinDesc}>Please note that your contribution will not be visible in the app right away.</h3>
              <h3 className={styles.newCoinDesc}>This will be sent to a number of Reviewers first, who will then decide whether your entry should be Accepted or Rejected.</h3>
              <div className={styles.submitAddNewCoin}>
                    <button className={mainStyles.mainButton} onClick={handleSuccessClose}>Close</button>
              </div>
            </div>
          </div>
        :
          <div>
            <div className={styles.cryptoHeader}>
              <h1 className={styles.allCoins_title}>Add new information to the list</h1>
            </div>
            <div className={styles.newCoinContainer}>
              <Select styles={customStyles} isSearchable={true} placeholder="Select a market" options={marketsList} onChange={marketListHandle}/>
              { marketValueErr && <p>Select one</p>}
              { showNewMarket && 
                  <div className={styles.grid}>
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
              <Select styles={customStyles} isSearchable={true} placeholder="Select a coin" options={coinsList} onChange={coinListHandle}/>
                  { coinValueErr && <p>Select one</p>}
                  { showNewCoin &&
                    <div className={styles.grid}>
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
                <div className={styles.grid}>
                  <TextField 
                    id="min-apy-id" 
                    label="What is the minimum percentage yield?"
                    placeholder="0.00"
                    variant="outlined"
                    type="number" 
                    className={minApyValueError? styles.newCoinInput + " " + styles.textFielInputLabel + " " + styles.newCoinInputField + " " + styles.selectError : styles.newCoinInput + " " + styles.textFielInputLabel + " " + styles.newCoinInputField} 
                    onChange={minApyChange}/>
                  <TextField 
                    id="max-apy-id" 
                    label="What is the maximum percentage yield?"
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
                  <div>
                    <button className={mainStyles.mainButton} disabled={isLoading} onClick={createNewCoin}>Submit</button>
                  </div>
                </div>
            </div>
          </div>
      :
        <div>
          <div className={styles.cryptoHeader}>
              <h1 className={styles.allCoins_title}>Coins</h1>
              <button className={styles.addNewCoinButton} onClick={handleOpen} type="button">
                + Add new coin
              </button>
              <div>
                <TextField
                  key="search-coin-list"
                  onChange={inputHandler}
                  id="search-coin-list-id"
                  variant="outlined"
                  label="Coins/Markets"
                  className={styles.search}
                />
                <button className={styles.searchBtn} onClick={handleFetch}><img src='/static/src/search-normal.svg'></img></button>
              </div>
          </div>
          <div className={styles.allCoins_container_main}>
            <div className={styles.allCoins_container_scroll}>
              <div className={styles.allCoins_container}>
                <div>
                  <p className={styles.allCoins_titles + " " + styles.textStart}>Name</p>
                </div>
                <div>
                  <p id='min_apy' className={styles.allCoins_titles + " " + styles.sortBy + " " + styles.textCenter} onClick={orderByChange}>Lowest APY</p>
                </div>
                <div>
                  <p id='max_apy' className={styles.allCoins_titles + " " + styles.sortBy + " " + styles.textCenter} onClick={orderByChange}>Highest APY</p>
                </div>
                <div>
                  <p id='last_updated' className={styles.allCoins_titles + " " + styles.sortBy + " " + styles.textCenter} onClick={orderByChange}>Age</p>
                </div>
                <div>
                  <p className={styles.allCoins_titles + " " + styles.textEnd}>View More</p>
                </div>
              </div>
              <div className={styles.allCoins_group}>
                {list.map((oneCoin: CoinTypes) => (
                  <OneCoin key={oneCoin.coin_id} oneCoinInfo={oneCoin} />
                ))}
              </div>
              {pageCount > 1 ? (
                <ReactPaginate
                  initialPage={0}
                  pageCount={pageCount}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={3}
                  onPageChange={handlePageChange}
                  containerClassName={styles.coinsListPagination}
                  previousLinkClassName={styles.coinsListPaginationPage}
                  breakClassName={styles.coinsListPaginationPageBreak}
                  nextLinkClassName={styles.coinsListPaginationPage}
                  pageClassName={styles.coinsListPaginationPage}
                  nextClassName={styles.coinsListPaginationPage}
                  previousClassName={styles.coinsListPaginationPage}
                  disabledClassName={styles.coinsListPaginationPageActiveDisabled}
                  activeClassName={styles.coinsListPaginationPageActive}
                  previousLabel={'< Prev'}
                  nextLabel={'Next >'}
                />
              ) : (
                <div className={styles.coinsListPagination}></div>
              )} 
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default App;