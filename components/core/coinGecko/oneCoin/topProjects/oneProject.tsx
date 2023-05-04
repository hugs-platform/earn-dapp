import React, { FC } from "react";
import styles from "./oneProject.module.scss";
import Image from "next/image";

// images
import projectLogo from "../../../../../public/static/assets/oneCoin/projects/project_logo.svg";
import stakingLink from "../../../../../public/static/assets/oneCoin/projects/staking_link_image.svg";

// converters
import { toAmericanCurrencyNotation } from "../../../../../core/utils/converters/numberToAmericanCurrencyNotation";
import { toTimeAgo } from "../../../../../core/utils/converters/databaseTimeToTimeAgo";

// types
import { ProjectTypes } from "../../../../../core/types/types";

export interface OneProjectProps {
  oneProjectData: ProjectTypes;
  placeOfProject: number;
}

const OneProject: FC<OneProjectProps> = (props: OneProjectProps) => {
  const { oneProjectData, placeOfProject } = props;

  return (
    <div className={styles.oneProject_full}>
      <p className={`${styles.oneProject_number} ${styles.allignLeft}`}>{placeOfProject + 1}</p>
      <div className={`${styles.oneProject_stakingLinkName_full} ${styles.allignLeft}`}>
        {projectLogo? <Image className={styles.oneProject_coinLogo} height={24} width={24} src={projectLogo}/> : <></>}
        <p className={`${styles.oneProject_name} ${styles.projectList_fontSize}`}>{oneProjectData.name}</p>
      </div>
      <div className={`${styles.oneProject_stakingLink_full} ${styles.allignRight}`}>
        <a className={`${styles.oneProject_stakingLink} ${styles.projectList_fontSize}`}>{oneProjectData.stakingLink}</a>
        <Image className={styles.oneProject_stakingLink} height={10} width={10} src={stakingLink} />
      </div>
      <p className={`${styles.oneProject_totalValue} ${styles.projectList_fontSize} ${styles.allignRight}`}>
        {toAmericanCurrencyNotation(oneProjectData.totalValue)}
      </p>
      <p className={`${styles.oneProject_apy} ${styles.projectList_fontSize} ${styles.allignRight}`}>{oneProjectData.totalApy} %</p>
      <div className={styles.allign_updateButton}>
        <button className={styles.oneProject_updateButton}>update</button>
      </div>
      <p className={`${styles.oneProject_lastUpdated} ${styles.projectList_fontSize} ${styles.allignRight}`}>
        {toTimeAgo(oneProjectData.lastUpdated)}
      </p>
    </div>
  );
};

export default OneProject;
