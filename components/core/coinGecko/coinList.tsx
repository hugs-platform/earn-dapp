import React, { FC, useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import ReactPaginate from "react-paginate";

// components
import OneCoin from "../coinGecko/oneCoin/oneCoin";

// data
import { getCoinsList } from "../../../services/coinsList";

// styles
import styles from "../coinGecko/coinsList.module.css";
// import { style } from "@mui/system";

function App() {
  const [list, setList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setisLoaded] = useState(true);
  const search = useRef("");
  const currentPage = useRef(0);


  const handleFetch = () => {
    getCoinsList(currentPage.current, search.current)
      .then(response => {
          setList(response['items']);
          setPageCount(response['number_of_pages']);
          setisLoaded(true);
      })
    return () => [];
	};

  const handlePageChange = (selectedObject) => {
    currentPage.current = selectedObject.selected;
    handleFetch();
	};

  const inputHandler = (selectedObject) => {
    search.current = selectedObject.target.value;
    handleFetch();
  };

  useEffect(() => {
    handleFetch();
  }, [])

  return (
    <>
      <div className={styles.cryptoHeader}>
          <h1 className={styles.allCoins_title}>Cryptocurrencies by CoinGecko</h1>
          <div className="search">
            <TextField
              onChange={inputHandler}
              id="search-coin-list-id"
              variant="outlined"
              label="Search"
            />
          </div>
      </div>
      <div className={styles.allCoins_container}>
        <p className={`${styles.allCoins_titles} ${styles.allCoins_titles_first}`}>Name</p>
        <p className={styles.allCoins_titles}>Abbreviature</p>
        <p className={styles.allCoins_titles}>Price</p>
        <p className={styles.allCoins_titles}>Market Cap</p>
        <p className={styles.allCoins_titles}>Highest APY</p>
        <p className={styles.allCoins_titles}>Update</p>
        <p className={styles.allCoins_titles}>Show more</p>
      </div>

      <div className={styles.allCoins_group}>
        {list.map((oneCoin) => (
          <OneCoin key={oneCoin['cg_coin_id']} oneCoinInfo={oneCoin} />
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