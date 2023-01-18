import React, { useEffect, useState } from "react";

// data
import { HugsApi } from "../../../services/hugsApi";

// styles
import styles from "../dashboard/dashboard.module.css";

import { Review } from "../../../core/types/types";

import OneReview from "../dashboard/review";

/**
 * @class
 * @ignore
 */
function App() {
  const API = new HugsApi();
  const [isLoaded, setIsLoaded] = useState(false);
  const [listReview, setListReview] = useState([]);
  const [userAlias, setUserAlias] = useState("");
  const [userWallet, setUserWallet] = useState("");
  const [userReputation, setUserReputation] = useState("");
  const [userEarnedRewards, setUserEarnedRewards] = useState(0);
  const [userRegistrationDate, setUserRegistrationDate]= useState("");
  const [contributionsTotal, setContributionsTotal] = useState(0);
  const [contributionsPending, setContributionsPending] = useState(0);
  const [contributionsAccepted, setContributionsAccepted] = useState(0);
  const [contributionsRejected, setContributionsRejected] = useState(0);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [reviewsPending, setReviewsPending] = useState(0);
  const [reviewsAccepted, setReviewsAccepted] = useState(0);
  const [reviewsRejected, setReviewsRejected] = useState(0);
  
  useEffect(() => {
    setIsLoaded(false);
    API.getProfile().then(response => {
      if (response){
          setUserAlias(response.data.alias);
          setUserWallet(response.data.wallet);
          setUserReputation(response.data.reputation_score);
          setUserRegistrationDate(response.data.registration_date);
          setUserEarnedRewards(response.data.rewards);
          setContributionsTotal(response.data.contributions.total);
          setContributionsPending(response.data.contributions.pending);
          setContributionsAccepted(response.data.contributions.accepted);
          setContributionsRejected(response.data.contributions.rejected);
          setReviewsTotal(response.data.reviews.total);
          setReviewsPending(response.data.reviews.pending);
          setReviewsAccepted(response.data.reviews.accepted);
          setReviewsRejected(response.data.reviews.rejected);
          setListReview(response.data.reviews_pending);
          setIsLoaded(true);
      }
    })
  }, [])

  return (
    <>
      <header className={styles.dashboard_header}>
        <hgroup>
            <h1>Hello user { userAlias }</h1>
            <h2>Wallet address: { userWallet }</h2>
        </hgroup>
        <hgroup>
            <h2>Member scince { userRegistrationDate }</h2>
            <h1>Reputation: { userReputation }</h1>
            <h1>Rewards earned: { userEarnedRewards } $HUGS</h1>
        </hgroup>
      </header>
      {isLoaded ? (
        <main className={styles.dashboard_main}>
          <hgroup>
              <h1>Review Requests</h1>
              {listReview.map((review: Review) => (
                <OneReview key={review.id} reviewData={review} />
              ))}
          </hgroup>
          <hgroup>
              <h1>Contributions</h1>
              <p>{contributionsTotal} Contributions</p>
              <p>{contributionsPending} Pending contributions</p>
              <p>{contributionsAccepted} Accepted contributions</p>
              <p>{contributionsRejected} Rejected contributions</p>
          </hgroup>
          <hgroup>
              <h1>Reviews</h1>
              <p>{reviewsTotal} Reviews</p>
              <p>{reviewsPending} Pending reviews</p>
              <p>{reviewsAccepted} Accepted reviews</p>
              <p>{reviewsRejected} Rejected reviews</p>
          </hgroup>
        </main>
      ): (<div></div>)}
    </>
  );
}

export default App;