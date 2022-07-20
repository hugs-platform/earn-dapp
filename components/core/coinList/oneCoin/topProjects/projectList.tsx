import React, { FC } from "react";
import styles from "./projectList.module.css";
import Grid from "@material-ui/core/Grid/Grid";

// components
import OneProject from "./oneProject";

// data (replace with axios fetch later)
import { allProjectsInfo } from "../../../../../data/projectsData";

const ProjectList: FC = () => {
  return (
    <section className={styles.projectList_full}>
      <div className={styles.projectList_titles}>
        <Grid container>
          <Grid item xs={2} container>
            <Grid item xs={2}>
              <p className={styles.projectList_defaultText}>N°</p>
            </Grid>
            <Grid item xs={10}>
              <p className={styles.projectList_defaultText}>Name</p>
            </Grid>
          </Grid>
          <Grid item xs={10} container>
            <Grid item xs={3}>
              <p className={styles.projectList_defaultText_end}>Staking Link</p>
            </Grid>
            <Grid item xs={3}>
              <p className={styles.projectList_defaultText_end}>Total Value Locked</p>
            </Grid>
            <Grid item xs={2}>
              <p className={styles.projectList_defaultText_end}>APY</p>
            </Grid>
            <Grid item xs={2}>
              <p className={styles.projectList_defaultText_end}>Update</p>
            </Grid>
            <Grid item xs={2}>
              <p className={styles.projectList_defaultText_end}>Last Updated</p>
            </Grid>
          </Grid>
        </Grid>
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
