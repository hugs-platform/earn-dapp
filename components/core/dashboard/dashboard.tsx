import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import Select from "react-select";
import ReactPaginate from "react-paginate";

// data
import { HugsApi } from "../../../services/hugsApi";

// styles
import styles from "../dashboard/dashboard.module.css";

import { ReviewRequest, CoinContribution } from "../../../core/types/types";

import Dashbord from "../coinGecko/dashboard/newCoin";
import OneReviewRequest from "../dashboard/reviews/reviewRequest";
import OneReview from "./reviews/review";
import OneContribution from "./reviews/contribution";

/**
 * @class
 * @ignore
 */
function App() {
  const API = new HugsApi();
  const [reviewsRequestList, setReviewsRequestList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [contributionsList, setContributionsList] = useState([]);
  const [userAlias, setUserAlias] = useState("");
  const [userWallet, setUserWallet] = useState("");
  const [userWalletDisplay, setUserWalletDisplay] = useState("");
  const [userReputation, setUserReputation] = useState("");
  const [userEarnedRewards, setUserEarnedRewards] = useState("250,000");
  const [registrationDate, setRegistrationDate] = useState("");
  const [reviewRequest, setReviewRequest] = useState(0);
  const [reviewRequestLastMonth, setReviewRequestLastMonth] = useState(0);
  const [contributionRequest, setContributionRequest] = useState(0);
  const [contributionRequestLastMonth, setContributionRequestLastMonth] = useState(0);
  const [review, setReview] = useState(0);
  const [reviewLastMonth, setReviewLastMonth] = useState(0);
  const page = useRef(0);
  const orderBy = useRef("-created_at");
  const prePage = useRef(10);
  const status = useRef("pending");
  const pageCount = useRef(0);
  const contribution_type = useRef(0);
  const selectList = [
    {value: 0, label: "Review Requests"},
    {value: 1, label: "Contributions"},
    {value: 2, label: "Reviews"}
  ]
  
  useEffect(() => {
    API.getProfile().then(response => {
      if (response) {
          setUserAlias(response.data.alias);
          setUserWallet(response.data.wallet);
          setUserReputation(response.data.reputation_score);
          setUserWalletDisplay(response.data.wallet.slice(0, 6) + "......." + response.data.wallet.slice(-6));
          const registration_date = Date.parse(response.data.registration_date);
          setRegistrationDate(moment(registration_date).format("MMM DD YYYY"));
          setReviewRequest(response.data.reviews.request_total);
          setReviewRequestLastMonth(response.data.reviews.request_scince_last_month);
          setContributionRequest(response.data.contributions.total);
          setContributionRequestLastMonth(response.data.contributions.scince_last_month);
          setReview(response.data.reviews.total);
          setReviewLastMonth(response.data.reviews.scince_last_month);
          setUserEarnedRewards("250,000");
      }
    });
    getReviewRequests();
  }, [])

  const getReviewRequests = () => {
    clearFilters();
    API.getReviews(page.current, orderBy.current, prePage.current, status.current).then(response => {
      if (response) {
        setReviewsRequestList(response.data.items);
        pageCount.current = response.data.number_of_pages;
        page.current = response.data.page;
      }
    })
  }

  const getReviews = () => {
    clearFilters();
    status.current = "closed";
    API.getReviews(page.current, orderBy.current, prePage.current, status.current).then(response => {
      if (response) {
        setReviewsList(response.data.items);
        pageCount.current = response.data.number_of_pages;
        page.current = response.data.page;
      }
    })
  }

  const getContributions = () => {
    clearFilters();
    API.getContributions(page.current, orderBy.current, prePage.current).then(response => {
      if (response) {
        setContributionsList(response.data.items);
        pageCount.current = response.data.number_of_pages;
        page.current = response.data.page;
      }
    })
  }

  const clearFilters = () => {
    page.current = 0;
    status.current = "pending";
    orderBy.current = "-created_at";
    setReviewsList([]);
    setReviewsRequestList([]);
    setContributionsList([]);
  }

  const copyClipboard = (selectedObject: any) => {
    setUserWalletDisplay("copied");
    navigator.clipboard.writeText(userWallet);
    setTimeout(() => {
      setUserWalletDisplay(userWallet.slice(0, 4) + "......." + userWallet.slice(-4));
    }, 3000)
  };

  const selectOnChange = (selectedObject: any) => {
    if (contribution_type.current != selectedObject.value){
      contribution_type.current = selectedObject.value;
      page.current = 0;
      handleFetch();
    }
  }

  const handlePageChange = (selectedObject: any) => {
    page.current = selectedObject.selected;
    handleFetch();
	};

  const handleFetch = () => {
    if (contribution_type.current === 0) {
      getReviewRequests();
    } else {
      if (contribution_type.current === 1) {
        getContributions();
      } else {
        getReviews();
      };
    };
  };

  return (
    <>
      <Dashbord></Dashbord>
      <header className={styles.dashboard_header}>
        <hgroup>
            <h1>Dashboard</h1>
        </hgroup>
      </header>
      <main className={styles.dashboard_main}>
        <div className={styles.dashboard_row}>
          <div className={styles.dasboard_col_3}>
            <div className={styles.dashboard_card + " " + styles.dashboard_card_main_theme + " " + styles.dashboard_card_profile}>
              <div className={styles.dashboard_card_profile_title}>
                <img className={styles.dashboard_card_profile_img} src='/static/src/default-profile.png'/>
                <p>Welcome Back!</p>
                <h1>{userAlias}</h1>
              </div>
              <div className={styles.dashboard_card_profile_body}>
                <div className={styles.dashboard_card_profile_body_col}>
                  <p>Wallet address</p>
                  <p>{userWalletDisplay}</p>
                  <img onClick={copyClipboard} className={styles.dashboard_card_copy_img} src='/static/src/copy.png'/> 
                </div>
                <div className={styles.dashboard_card_profile_body_col}>
                  <p>Alpha testing reward pool </p>
                  <p>$HUGS {userEarnedRewards}</p>
                </div>
              </div>
              <div className={styles.dashboard_card_profile_reputation}>
                <h1>{userReputation}</h1>
                <h2>Reputation</h2>
                <p>Member Since {registrationDate}</p>
              </div>
            </div>
          </div>
          <div className={styles.dasboard_col_9}>
            <div className={styles.dashboard_row}>
              <div className={styles.dasboard_col_4}>
                <div className={styles.dashboard_card + " " + styles.dashboard_card_review_requests + " " + `${reviewRequestLastMonth >= 0 ? styles.up_background: styles.down_background}`}>
                  <h1>Review Requests</h1>
                  <h2>{reviewRequest}</h2>
                  <p><span className={`${reviewRequestLastMonth >= 0 ? styles.up: styles.down}`}>{reviewRequestLastMonth}%</span> Scince last months</p>
                </div>
              </div>
              <div className={styles.dasboard_col_4}>
                <div className={styles.dashboard_card + " " + styles.dashboard_card_review_contribtuions + " " + `${contributionRequestLastMonth >= 0 ? styles.up_background: styles.down_background}`}>
                  <h1>Contributions</h1>
                  <h2>{contributionRequest}</h2>
                  <p><span className={`${contributionRequestLastMonth >= 0 ? styles.up: styles.down}`}>{contributionRequestLastMonth}%</span> Scince last months</p>
                </div>
              </div>
              <div className={styles.dasboard_col_4}>
                <div className={styles.dashboard_card + " " + styles.dashboard_card_reviews + " " + `${reviewLastMonth >= 0 ? styles.up_background: styles.down_background}`}>
                  <h1>Reviews</h1>
                  <h2>{review}</h2>
                  <p><span className={`${reviewLastMonth >= 0 ? styles.up: styles.down}`}>{reviewLastMonth}%</span> Scince last months</p>
                </div>
              </div>
            </div>
            <div className={styles.dashboard_row}>
              <div className={styles.dasboard_col_12}>
                <div className={styles.dashboard_card + " " + styles.items_list}>
                  <div className={styles.items_list_title}>
                    <h1>Review Request</h1>
                    <Select className={styles.select} options={selectList} defaultValue={selectList[0]} onChange={selectOnChange}/>
                  </div>
                  <div className={styles.items_list_body}>
                    {reviewsRequestList.map((reviewData: ReviewRequest) => (
                      <OneReviewRequest key={reviewData.id} reviewData={reviewData}/>
                    ))}
                    {reviewsList.map((reviewData: ReviewRequest) => (
                      <OneReview key={reviewData.id} reviewData={reviewData}/>
                    ))}
                    {contributionsList.map((contributionData: CoinContribution) => (
                      <OneContribution key={contributionData.id} contributionData={contributionData}/>
                    ))}
                  </div>
                  <div className={styles.items_list_footer}>
                    <img src='/static/src/expand.png'/>
                    {pageCount.current > 1 ?
                      <ReactPaginate
                        initialPage={0}
                        pageCount={pageCount.current}
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
                      /> : <></>
                    }
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
      </main>
    </>
  );
}

export default App;