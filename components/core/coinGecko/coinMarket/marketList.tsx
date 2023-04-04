import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import ReactPaginate from "react-paginate";

// components
import OneMarket from "../oneMarket/oneMarket";
import Banner from "../../banner/banner";

// data
import { HugsApi } from "../../../../services/hugsApi";

// types
import { MarketTypes } from "../../../../core/types/types";

// styles
import styles from "../coinMarket/marketList.module.css";

/**
 * @class
 * @ignore
 */
function App() {
  const API = new HugsApi();
  const [marketsList, setMarketsList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const search = useRef("");
  const currentPage = useRef(0);
  const orderBy= useRef("-max_apy");
  const perPage = 25;

  const handleFetch = () => {
    API.getMarketsList(currentPage.current, search.current, orderBy.current, perPage, "approve")
      .then(response => {
          if (response) {
            setMarketsList(response.data.items);
            setPageCount(response.data.number_of_pages);
            currentPage.current = response.data.page;
          }
      })
    return () => [];
  };

  const handlePageChange = (selectedObject: any) => {
    currentPage.current = selectedObject.selected;
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

  const inputHandler = (selectedObject: any) => {
    search.current = selectedObject.target.value;
    currentPage.current = 0;
  };

  useEffect(() => {
    handleFetch();
  }, [])

  return (
    <>
      <Banner></Banner>
      <div className={styles.cryptoHeader}>
          <h1 className={styles.allCoins_title}>Platforms</h1>
          <div>
            <TextField
              key="search-coin-list"
              onChange={inputHandler}
              id="search-coin-list-id"
              variant="outlined"
              label="Coins/Platforms"
              className={styles.search}
            />
            <button className={styles.searchBtn} onClick={handleFetch}><img src='/static/src/search-normal.svg'></img></button>
          </div>
      </div>
      <div className={styles.marketListContainer}>
        <p id='platform' className={`${styles.marketListTitle} ${styles.sortBy}`}>Name</p>
        <p id='max_apy' className={styles.marketListTitle + " " + styles.sortBy} onClick={orderByChange}>Max APY</p>
        <p id='min_apy' className={styles.marketListTitle + " " + styles.sortBy} onClick={orderByChange}>Min APY</p>
        <p id='earn_coins' className={styles.marketListTitle + " " + styles.sortBy} onClick={orderByChange}>Earn Coins</p>
        <p id='link' className={styles.marketListTitle + " " + styles.sortBy} onClick={orderByChange}>Link</p>
        <p id='click' className={styles.marketListTitle + " " + styles.sortBy} onClick={orderByChange}>Clicks</p>
        <p className={styles.marketListTitle}>View More</p>
      </div>

      <div className={styles.marketList}>
        {marketsList.map((market: MarketTypes) => (
          <OneMarket key={market.market_id} oneMarketInfo={market} />
        ))}
      </div>
      <div className={styles.marketListPagination}>
        {pageCount > 1 ? (
          <ReactPaginate
            initialPage={0}
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={styles.marketListPagination}
            previousLinkClassName={styles.marketListPaginationPage}
            breakClassName={styles.marketListPaginationPageBreak}
            nextLinkClassName={styles.marketListPaginationPage}
            pageClassName={styles.marketListPaginationPage}
            nextClassName={styles.marketListPaginationPage}
            previousClassName={styles.marketListPaginationPage}
            disabledClassName={styles.marketListPaginationPageActiveDisabled}
            activeClassName={styles.marketListPaginationPageActive}
            previousLabel={'< Prev'}
            nextLabel={'Next >'}
          />
        ) : <></>} 
      </div>
    </>
  );
}

export default App;