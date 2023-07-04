import React, { useEffect, useState, useRef } from "react";
import { TextField } from "@mui/material";
import ReactPaginate from "react-paginate";

// data
import { HugsApi } from "../../../../services/hugsApi";
import OneMarkerLink from "../marketsLink/marketLink";

// types
import { MarketTypes } from "../../../../core/types/types";

// styles
import styles from "../marketsLink/marketsLinkList.module.css";


/**
 * @class
 * @ignore
 */
function App() {
  const API = new HugsApi();
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const search = useRef("");
  const currentPage = useRef(0);
  const perPage = 25;

  const handleFetch = () => {
    API.getMarketsList(currentPage.current, search.current, "", perPage, "allList")
      .then(response => {
          if (response) {
            setList(response.data.items);
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

  const inputHandler = (selectedObject: any) => {
    search.current = selectedObject.target.value;
    currentPage.current = 0;
    handleFetch();
  };

  useEffect(() => {
    handleFetch();
  }, [])

  return (
    <>
        <div className={styles.marketsBody}>
            <h1>Markets</h1>
            <div className={styles.searchDiv}>
                <TextField
                  key="search-coin-list"
                  onChange={inputHandler}
                  id="search-coin-list-id"
                  variant="outlined"
                  label="Markets"
                  className={styles.search}
                />
                <button className={styles.searchBtn} onClick={handleFetch}><img src='/static/src/search-normal.svg'></img></button>
            </div>
            <div className={styles.marketsItemList}>
                <p>Market</p>
                <p>Link</p>
                <p>Referral link</p>
            </div>
            {list.map((market: MarketTypes) => (<OneMarkerLink key={market.id} market={market} />))}
            {pageCount > 1 ? (
                <ReactPaginate
                  initialPage={0}
                  pageCount={pageCount}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={3}
                  onPageChange={handlePageChange}
                  containerClassName={styles.marketsListPagination}
                  previousLinkClassName={styles.marketsListPaginationPage}
                  breakClassName={styles.marketsListPaginationPageBreak}
                  nextLinkClassName={styles.marketsListPaginationPage}
                  pageClassName={styles.marketsListPaginationPage}
                  nextClassName={styles.marketsListPaginationPage}
                  previousClassName={styles.marketsListPaginationPage}
                  disabledClassName={styles.marketsListPaginationPageActiveDisabled}
                  activeClassName={styles.marketsListPaginationPageActive}
                  previousLabel={'< Prev'}
                  nextLabel={'Next >'}
                />
              ) : (
                <div className={styles.marketsListPagination}></div>
              )} 
        </div>
    </>
  );
}

export default App;