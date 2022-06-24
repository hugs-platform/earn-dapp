import React, { FC } from "react";
import styles from "./projectList.module.css";

// components
import OneProject from "./oneProject";

// data (replace with axios fetch later)
import { allProjectsInfo } from "../../../../../data/projectsData";

const ProjectList: FC = () => {
  return (
    <section className={styles.projectList_full}>
      <div className={styles.projectList_titles}>
        <p className={`${styles.projectList_defaultText} ${styles.allignLeft}`}>N°</p>
        <p className={`${styles.projectList_defaultText} ${styles.allignLeft}`}>Name</p>
        <p className={`${styles.projectList_defaultText} ${styles.allignRight}`}>Staking Link</p>
        <p className={`${styles.projectList_defaultText} ${styles.allignRight}`}>Total Value Locked</p>
        <p className={`${styles.projectList_defaultText} ${styles.allignRight}`}>APY</p>
        <p className={`${styles.projectList_defaultText} ${styles.allignRight}`}>Update</p>
        <p className={`${styles.projectList_defaultText} ${styles.allignRight}`}>LastUpdated</p>
      </div>

      <div className={styles.projectList}>
        {allProjectsInfo.map((oneProject) => (
          <OneProject key={oneProject.id} oneProjectData={oneProject} placeOfProject={allProjectsInfo.indexOf(oneProject)} />
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
