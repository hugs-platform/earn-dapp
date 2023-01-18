import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import ReactPaginate from "react-paginate";

// components
import OneCoin from "../oneCoin/oneCoin";

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
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const isLoaded = useRef(true);
  const search = useRef("");
  const currentPage = useRef(0);
  const orderBy= useRef("-market_cup");

  const handleFetch = () => {
    if (isLoaded.current == true) {
      isLoaded.current = false;
      new HugsApi().getCoinsList(currentPage.current, search.current, orderBy.current)
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
      <div className={styles.cryptoHeader}>
          <h1 className={styles.allCoins_title}>Cryptocurrencies by APIs</h1>
          <div className="search">
            <TextField
              key="search-coin-list"
              onChange={inputHandler}
              id="search-coin-list-id"
              variant="outlined"
              label="Search"
            />
          </div>
      </div>
      <div className={styles.allCoins_container}>
        <p className={`${styles.allCoins_titles} ${styles.allCoins_titles_first}`}>Name</p>
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
      {isLoaded ? (
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
          previousLabel={'<'}
          nextLabel={'>'}
        />
      ) : (
        <div>Nothing to display</div>
      )} 
    </>
  );
}

export default App;