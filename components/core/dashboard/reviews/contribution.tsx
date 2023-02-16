import React, { FC } from "react";

// styles
import styles from "../reviews/review.module.css";

// types
import { CoinContribution } from "../../../../core/types/types";

export interface ContributionProps {
    key: string;
    contributionData: CoinContribution;
}

const OneContribution: FC<ContributionProps> = (props: ContributionProps) => {
    const { contributionData } = props;

    return (
        <div className={styles.row}>
            <h2>{contributionData.coin.name} on {contributionData.market.platform}</h2>
            <h2>{contributionData.apy}</h2>
            <h2>{contributionData.locked === true ? "Locked": contributionData.locked === false ? "Flexible": "Unknown"}</h2>
            {contributionData.status === true ? <p className={styles.accepted}>Accepted</p>: contributionData.locked === false ? <p className={styles.rejected}>Rejected</p>: <p>Pending</p>}
        </div>
    );
};

export default OneContribution;