import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Favicon from "react-favicon";
import { HugsApi } from "../services/hugsApi";

import styles from "./homePage.module.css";

// components
import CoinsList from "../components/core/coinGecko/coinMarket/coinList";
import ConnectButton from "../components/core/metaMask/authentications";
import AccountModal from "../components/core/metaMask/accountModal";
import Layout from "../components/core/Layout";
import Dashboard from "../components/core/dashboard/dashboard";
import MarketList from "../components/core/coinGecko/coinMarket/marketList";
import Footer from "../components/core/footer/footer";
import ProfileList from "../components/core/profiles/profileList";

// types
import { HomePageProps } from "../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isCoins, setIsCoins ] = useState(true);
  const [ isDashboard, setIsDashboard ] = useState(false);
  const [ isPlatforms, setIsPlatforms ] = useState(false);
  const [ isProfiles, setIsProfiles ] = useState(false);
  const [ showMore, setShowMore ] = useState(false);
  const [ isLogin, setIsLogin ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [ userAvatar, setUserAvater ] = useState("");
  const [ currentPage, setCurrentPage ] = useState("Coins");
  const API = new HugsApi();


  /**
   * @class
   * @ignore
   * @param {string} value - name of page 
   */
  function handlePageChange(value: string) {
    setCurrentPage(value);
    switch (value) {
      case "Coins":
        setIsCoins(true);
        setIsDashboard(false);
        setIsPlatforms(false);
        setIsProfiles(false);
        break;
      case "Platforms":
        setIsPlatforms(true);
        setIsCoins(false);
        setIsDashboard(false);
        setIsProfiles(false);
        break;
      case "Dashboard":
        setIsDashboard(true);
        setIsCoins(false);
        setIsPlatforms(false);
        setIsProfiles(false);
        break;
      case "Profiles":
        setIsDashboard(false);
        setIsCoins(false);
        setIsPlatforms(false);
        setIsProfiles(true);
        break;
    }
	};

  const checkUser = () => {
    const username = window.localStorage.getItem('username');
    if (username != null){
      setUserName(username);
    } else {
      setUserName("");
    }
    const avatar = window.localStorage.getItem('avatar') ;
    if (avatar != null){
      setUserAvater(avatar);
    } else {
      setUserAvater("");
    }
	};

  useEffect(() => {
    window.addEventListener('profile_update', () => {checkUser();});
    if (API.getCookie("token")){
      setIsLogin(true);
    } else {
      setIsLogin(false);
      if (currentPage === "Dashboard" || currentPage === "Profiles"){
        handlePageChange("Coins")
      }
    }
    if (API.getCookie("isStaff")){
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  });

  return (
    <div className={styles.index_full}>
      <Favicon url="/favicon.ico"/>
      <title>(Alpha) Earn Markets</title>
      <script type="module" src={process.env.NEXT_PUBLIC_HUGBUNTERS_WIDGET_URL}/>
      <link href="https://use.fontawesome.com/releases/v6.4.0/css/all.css" rel="stylesheet"/>
      <ChakraProvider>
        <Layout>
          <Navbar>
            <Container>
              <Nav className={styles.hugsSideNavBar}>
                <div className={styles.hugsSideBarLogo}>
                  <Nav.Item className={styles.hugsSideNavBarTitle}></Nav.Item>
                  {/* <Nav.Item className={styles.hugsSideNavBarShow}></Nav.Item> */}
                </div>
                <Nav.Link onClick={() => {handlePageChange("Coins")}} className={isCoins ? styles.hugsNavBarLink + " " + styles.overview + " " + styles.hugsNavBarLinkActive : styles.hugsNavBarLink + " " + styles.overview}>Coins</Nav.Link>
                <Nav.Link onClick={() => {handlePageChange("Platforms")}} className={isPlatforms ? styles.hugsNavBarLink + " " + styles.platform + " " + styles.hugsNavBarLinkActive : styles.hugsNavBarLink + " " + styles.platform}>Platforms</Nav.Link>
                {isLogin?
                  <Nav.Link onClick={() => {handlePageChange("Dashboard")}} className={isDashboard ? styles.hugsNavBarLink + " " + styles.dashboard + " " + styles.hugsNavBarLinkActive : styles.hugsNavBarLink + " " + styles.dashboard}>Dashboard</Nav.Link>
                :
                  <></>
                }
                  {showMore?
                  <Nav.Link onClick={() => {handlePageChange("Profiles")}} className={isProfiles ? styles.hugsNavBarLink + " " + styles.hugsNavBarLinkActive : styles.hugsNavBarLink}>Profiles</Nav.Link>
                :
                  <></>
                }
                <img className={styles.hugsSideNavBarFooterGift} src='/static/src/gift.png'/>
                <Nav.Item className={styles.hugsSideNavBarFooter}>
                  <h1>Mint your NFT!</h1>
                  <p>&#10004; Get full access</p>
                  <p>&#10004; Earn Rewards</p>
                  <p>&#10004; Gain Reputation.</p>
                  <button className={styles.mainButton} type="button">Comming soon</button>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar>
          <Container className={styles.mainPageContainer + " " + styles.hugsSideNavContainer}>
            <Navbar className={styles.hugsHeaderNavBar}>
                <Nav.Link className={styles.hugsHeaderNavBarLink}>Overview</Nav.Link>
                <Nav.Link className={styles.hugsHeaderNavBarLink}>How It works</Nav.Link>
                <Nav.Link className={styles.hugsHeaderNavBarLink}>About Us</Nav.Link>
                <Nav.Item className={styles.hugsHeaderNavBarLink}><ConnectButton handleOpenModal={onOpen}/></Nav.Item>
                {userName?
                  <Nav.Item className={styles.hugsHeaderNavBarItem}>{userName}</Nav.Item>
                :
                  <></>
                }
                {userAvatar?
                  <Nav.Item className={styles.hugsHeaderNavBarItem}><img src={userAvatar}/></Nav.Item>
                :
                  <></>
                }
                
            </Navbar>
          </Container>
          
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Layout>
      </ChakraProvider>
        <Container className={styles.mainPageContainer}>
          <section className={styles.cryptoList}>
            { isCoins ? (<CoinsList />) : (<></>) }
            { isDashboard ? (<Dashboard />) : (<></>) }
            { isPlatforms ? (<MarketList />) : (<></>) }
            { isProfiles ? (<ProfileList />): (<></>)}
          </section>
        <Footer></Footer>
      </Container>
    </div>
  );
};

export default Home;
