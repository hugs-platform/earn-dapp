import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { HugsApi } from "../../../services/hugsApi";
import styles from "../../../pages/homePage.module.css";
import { useRef, useState } from "react";

type Props = {
  handleOpenModal: any;
};

/**
 * @class
 * @ignore 
 */
export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const API = new HugsApi();
  const [ open, setOpen ] = useState(false);
  const handleClose = () => setOpen(false);
  const userEmail = useRef("");
  const [ userEmailError, setUserEmailError ] = useState(true);
  const userSocialLink = useRef("");
  const [ userSocialLinkError, setUserSocialLinkError ] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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
        document.cookie = "token=" + response.data['token'] + ";expires=" + response.data['exp'] + ";path=/";
        if (response.data['is_admin']){
          document.cookie = "isStaff=" + response.data['is_admin'] + ";expires=" + response.data['exp'] + ";path=/";
        } else {
          API.deleteCookie("isStaff=");
        }
        if (['social_link'] && response.data['email']) {
          setOpen(false);
        } else {
          setOpen(true);
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
    if (isLoading === false){
      setIsLoading(true);
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
            setIsLoading(false);
          })
          .catch(error => {
            setIsLoading(false);
            setErrorMsg(error.response.data.error);
          })
      } else {
        setIsLoading(false);
      }
    }
  };

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="linear-gradient(157.59deg, #4DCAFA 6.59%, #2F7994 74.48%)"
      borderRadius="xl"
      py="0"
      max-width="150px"
    >
      <Box 
        px="3"
        max-width="150px"
      >
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        max-width="150px"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          backgroundColor: "linear-gradient(157.59deg, #4DCAFA 6.59%, #2F7994 74.48%)",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2" max-width="150px">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
      </Button>
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
              <button className={styles.mainButton} disabled={isLoading} onClick={updateProfile}>Submit</button>
            </div>
          </div>
        </div>
      :
      <></>
      }
    </Box>

    
  ) : (
    <button 
      className={styles.walletLoginButton}
      onClick={handleConnectWallet}>
        Connect your wallet
    </button>
  );
}