import React from "react";
import styles from "./poweredByHugs.module.css";
import Marquee from "react-fast-marquee";

const PoweredByHugs = () => {
  return (
    <div className={styles.powerdByHugs_full}>
      <Marquee gradient={true}>
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
        <span className={styles.marquee__text}>POWERED BY HUGS</span> •{" "}
      </Marquee>
    </div>
  );
};

export default PoweredByHugs;
