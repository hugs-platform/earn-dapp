import { useEthers } from "@usedapp/core";
import { HugsApi } from "../../../services/hugsApi";
import styles from "../layout/homePage.module.scss";
import { useRef, useState, useEffect } from "react";

type Props = {
  handleOpenModal: any;
  handleCheckLogin: any;
};

/**
 * @class
 * @ignore 
 */
export default function ConnectButton({ handleOpenModal, handleCheckLogin }: Props) {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const API = new HugsApi();
  const [ open, setOpen ] = useState(false);
  const handleClose = () => setOpen(false);
  const userEmail = useRef("");
  const [ userEmailError, setUserEmailError ] = useState(true);
  const userSocialLink = useRef("");
  const [ userSocialLinkError, setUserSocialLinkError ] = useState(true);
  const [loading, setLoading] = useState(false);
  const validation = useRef(false);
  const [ errorMsg, setErrorMsg ] = useState("");

  /**
   * @class
   * @ignore
   */
  function handleConnectWallet() {
    activateBrowserWallet();
    API.createToken().then(response => {
      if (response){
        if (response.data['alias']){
          window.localStorage.setItem('username', response.data['alias']);
        }
        if (response.data['avatar']){
          window.localStorage.setItem('avatar', response.data['avatar']);
        }
        window.dispatchEvent(new Event("profile_update"));
        document.cookie = "token=" + response.data['token'] + ";expires=" + response.data['exp'] + ";path=/";
        handleCheckLogin()
        if (response.data['role'] !== 'User'){
          document.cookie = "isStaff=" + true + ";expires=" + response.data['exp'] + ";path=/";
        } else {
          API.deleteCookie("isStaff=");
        }
        if (['social_link'] && response.data['email']) {
          setOpen(false);
        } else {
          setOpen(false);
        }
      }
    })
  }

  const emailInput = (selectedObject: any) => {
    userEmail.current = selectedObject.target.value;
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    if (regexExp.test(userEmail.current)) {
      setUserEmailError(false);
    } else {
      setUserEmailError(true);
    }
  };

  const twitterInput = (selectedObject: any) => {
    userSocialLink.current = selectedObject.target.value;
    const url = "https://twitter.com/";
    if (userSocialLink.current.startsWith(url) && userSocialLink.current.length > url.length){
      setUserSocialLinkError(false);
    } else {
      setUserSocialLinkError(true);
    }
  };

  const updateProfile = () => {
    if (loading === false){
      setLoading(true);
      validation.current = true;
      
      if (userSocialLink.current == ""){
        setUserSocialLinkError(true);
        validation.current = false;
      }

      if (userEmail.current === ""){
        setUserEmailError(true);
        validation.current = false;
      }

      if (validation.current) {
        const data = {
          'email': userEmail.current,
          'social_link': userSocialLink.current
        }
        API.updateProfile(data)
          .then(response => {
            handleClose();
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            setErrorMsg(error.response.data.error);
          })
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    window.dispatchEvent(new Event("profile_update"));
    const data = window.localStorage.getItem('wallet');
    if (account){
      if (data === null){
        window.localStorage.setItem('wallet', account);
      } else {
        if (data !== account) {
          deactivate();
          API.logout();
        }
      }
    }
  });

  return account ? (
    <div>
      <button 
        className={styles.walletLoginButton}
        onClick={handleOpenModal}>
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
      </button>
      {open?
        <div className={styles.updateProfileDivBG}>
          <div className={styles.updateProfileDiv}>
            <h2 className={styles.updateProfileTile}>Update your profile</h2>
            <label className={userEmailError? styles.errorMsg: styles.regularMsg}>Email *</label>
            <input 
              placeholder="example@email.com"
              type='email' 
              className={styles.updateProfileInput + " " + styles.updateProfileField} 
              onChange={emailInput}>
            </input>
            <label className={userSocialLinkError? styles.errorMsg: styles.regularMsg}>Twitter profile link *</label>
            <input 
              placeholder="https://twitter.com/username"
              type='text' 
              className={styles.updateProfileInput + " " + styles.updateProfileField} 
              onChange={twitterInput}>
              </input>
            { errorMsg && <h2 className={styles.errorMsg}>{errorMsg}</h2>}
            <div className={styles.submitAddNewCoin}>
              <button className={styles.mainButton} disabled={loading} onClick={updateProfile}>Submit</button>
            </div>
          </div>
        </div>
      :
      <></>
      }
      </div>
  ) : (
    <button 
      className={styles.walletLoginButton}
      onClick={handleConnectWallet}>
        Connect your wallet
    </button>
  );
}