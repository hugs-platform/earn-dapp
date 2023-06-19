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
            {contributionData.contribution_type === "7" ? 
                <h2>Remove {contributionData.coin.name} from {contributionData.market.platform}</h2> 
            : 
            contributionData.contribution_type === "3" ? 
                contributionData.max_apy != contributionData.min_apy ?
                <h2>Append new {contributionData.coin.name} to market {contributionData.market.platform} with APY: {contributionData.min_apy}..{contributionData.max_apy}%</h2> 
                :
                <h2>Append new {contributionData.coin.name} to market {contributionData.market.platform} with APY: {contributionData.max_apy}%</h2> 
            :
            contributionData.contribution_type === "2" ? 
                <h2>Add new coin: {contributionData.coin.name} {contributionData.coin.symbol}</h2>
            :
            contributionData.contribution_type === "1" ? 
                <h2>Add new market: {contributionData.market.platform} with <a className={styles.marketLink} href={contributionData.market.link} target="_blank" rel="noreferrer">link</a></h2>
            :
            contributionData.contribution_type === "4" ? 
                <h2>Remove coin {contributionData.coin.name}</h2>
            :
            contributionData.contribution_type === "5" ? 
                <h2>Remove platform {contributionData.coin.name}</h2>
            :
                <></>
            }
            {contributionData.status === "0" ?    
                <p>Pending</p>
            : 
            contributionData.status === "1" ? 
                <p className={styles.accepted}>Accepted</p>
            :
            contributionData.status === "2" ? 
                <p className={styles.rejected}>Rejected</p>
            :
            contributionData.status === "3" ? 
                <p>Expired</p>
            :
                <></>
            }
        </div>
    );
};

export default OneContribution;
