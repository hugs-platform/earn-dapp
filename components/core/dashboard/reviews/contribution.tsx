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
            {contributionData.contribution_type == "CoinContributionType.Decline_APY" ? 
                <h2>Remove {contributionData.coin.name} from {contributionData.market.platform}</h2> 
            : 
            contributionData.contribution_type == "CoinContributionType.APY" ? 
                contributionData.apy ?
                <h2>Append new {contributionData.coin.name} to market {contributionData.market.platform} with APY: {contributionData.apy}%</h2> 
                :
                <h2>Append new {contributionData.coin.name} to market {contributionData.market.platform}</h2> 
            :
            contributionData.contribution_type == "CoinContributionType.Coin" ? 
                <h2>Add new coin: {contributionData.coin.name} {contributionData.coin.abbreviature}</h2>
            :
            contributionData.contribution_type == "CoinContributionType.Platform" ? 
                <h2>Add new market: {contributionData.market.platform} with <a className={styles.marketLink} href={contributionData.market.link} target="_blank" rel="noreferrer">link</a></h2>
            :
            contributionData.contribution_type == "CoinContributionType.Coin_Delisting" ? 
                <h2>Remove coin {contributionData.coin.name}</h2>
            :
            contributionData.contribution_type == "CoinContributionType.Platform_Delisting" ? 
                <h2>Remove platform {contributionData.coin.name}</h2>
            :
                <></>
            }
            {contributionData.status == "CoinContributionStatusType.Pending" ? 
                <p>Pending</p>
            : 
            contributionData.status == "CoinContributionType.Accepted" ? 
                <p className={styles.accepted}>Accepted</p>
            :
            contributionData.status == "CoinContributionType.Rejected" ? 
                <p className={styles.rejected}>Rejected</p>
            :
            contributionData.status == "CoinContributionType.Expired" ? 
                <p>Expired</p>
            :
                <></>
            }
        </div>
    );
};

export default OneContribution;
