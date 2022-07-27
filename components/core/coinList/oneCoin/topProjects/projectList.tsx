import React, { FC } from "react";
import styles from "./projectList.module.css";

// components
import OneProject from "./oneProject";

const ProjectList: FC = (data) => {

  // const apys = data.oneCoinInfo.apys
  const apys = data.data.oneCoinInfo.apys
  console.log(apys)

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
        {apys.map((oneProject) => (
          <OneProject projectData={oneProject} key={oneProject.id} placeOfProject={apys.indexOf(oneProject)} />
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
