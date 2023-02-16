import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import ReactPaginate from "react-paginate";

// components
import OneCoin from "../oneCoin/oneCoin";
import Dashboard from "../dashboard/newCoin";

// data
import { HugsApi } from "../../../../services/hugsApi";

// types
import {CoinTypes } from "../../../../core/types/types";

// styles
import styles from "../coinMarket/coinsList.module.css";

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
  const orderBy= useRef("-market_cup");
  const perPage = "25"; 

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
    handleFetch();
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

  useEffect(() => {
    handleFetch();
  }, [])

  return (
    <>
      <Dashboard></Dashboard>
      <div className={styles.cryptoHeader}>
          <h1 className={styles.allCoins_title}>Coins</h1>
          <div className="search">
            <TextField
              key="search-coin-list"
              onChange={inputHandler}
              id="search-coin-list-id"
              variant="outlined"
              label="Coins/Platforms"
            />
          </div>
      </div>
      <div className={styles.allCoins_container}>
        <p className={`${styles.allCoins_titles} ${styles.allCoins_titles_first}`}>Name</p>
        <p id='highest_apy' className={styles.allCoins_titles + " " + styles.sortBy} onClick={orderByChange}>Highest APY</p>
        <p id='abbreviature' className={styles.allCoins_titles + " " + styles.sortBy} onClick={orderByChange}>Abbreviature</p>
        <p id='price' className={styles.allCoins_titles + " " + styles.sortBy} onClick={orderByChange}>Price</p>
        <p id='market_cup' className={styles.allCoins_titles + " " + styles.sortBy} onClick={orderByChange}>Market Cap</p>
        <p id='click' className={styles.allCoins_titles + " " + styles.sortBy} onClick={orderByChange}>Clicks</p>
        <p id='last_updated' className={styles.allCoins_titles + " " + styles.sortBy} onClick={orderByChange}>Age</p>
        <p className={styles.allCoins_titles}>Show more</p>
      </div>

      <div className={styles.allCoins_group}>
        {list.map((oneCoin: CoinTypes) => (
          <OneCoin key={oneCoin.coin_id} oneCoinInfo={oneCoin} />
        ))}
      </div>
      {pageCount > 0 ? (
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
        <></>
      )} 
    </>
  );
}

export default App;