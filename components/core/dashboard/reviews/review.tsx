import React, { FC } from "react";

// styles
import styles from "../reviews/review.module.css";

// types
import { ReviewRequest } from "../../../../core/types/types";

export interface ReviewProps {
    key: string;
    reviewData: ReviewRequest;
}

const OneReviewRequest: FC<ReviewProps> = (props: ReviewProps) => {
    const { reviewData } = props;

  return (
    <div className={styles.row}>
        {reviewData.contribution.contribution_type === 1 ? <h1> New market {reviewData.market.platform}</h1> : 
        reviewData.contribution.contribution_type === 2 ? <h1>New crypto {reviewData.coin.name}</h1> : 
        <h1>Is {reviewData.coin.name} on {reviewData.market.platform}?</h1>}
        {reviewData.contribution.contribution_type === 1 ? <a rel="noreferrer" target="_blank" className={styles.contribution_link} href={reviewData.market.link}> {reviewData.market.platform}</a> : 
        reviewData.contribution.contribution_type === 2 ? <h1>{reviewData.coin.symbol}</h1> : 
        <h1>Is {reviewData.coin.name} on {reviewData.market.platform}?</h1>}
        {reviewData.answer ? <p className={styles.coinMarketsColumn + " " + styles.approve}>Approve</p> : <p className={styles.coinMarketsColumn + " " + styles.decline}>Decline</p>}
    </div>
  );
};

export default OneReviewRequest;