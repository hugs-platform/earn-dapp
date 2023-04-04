import React, { useEffect, useState, useRef } from "react";

// data
import { HugsApi } from "../../../services/hugsApi";


// styles
import styles from "./banner.module.css";

/**
 * @class
 * @ignore
 */
function App() {
  const API = new HugsApi();
  const [ isShow, setIsShow] = useState(false);

  const hideBanner = () => {
    const exp = new Date(new Date().getTime()+1000*60*60*24*365).toString();
    document.cookie = "hideBanner=hide;expires="+ exp + ";path=/";
    setIsShow(false);
  }

  useEffect(() => {
    const showBaner = API.getCookie('hideBanner');
    if (showBaner === "hide"){
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [])

  return (
    <>{isShow? 
      <div className={styles.banner}>
        <div className={styles.bannerRow}>
          <div className={styles.bannerColumn}>
            <h1>Best Crypto Staking Platforms</h1>
            <h2>Find the reliable and best Crypto Staking platforms and earn Rewards by holding coins.</h2>
          </div>
          <div className={styles.hideBaner}>
            <div onClick={hideBanner} className={styles.close}></div>
          </div>
        </div>
      </div>
      :
      <></>
      }     
    </>
  );
}

export default App;