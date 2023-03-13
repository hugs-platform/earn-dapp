import type { NextPage } from "next";
import { useState } from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Favicon from "react-favicon";

import styles from "./homePage.module.css";

// components
import CoinsList from "../components/core/coinGecko/coinMarket/coinList";
import ConnectButton from "../components/core/metaMask/authentications";
import AccountModal from "../components/core/metaMask/accountModal";
import Layout from "../components/core/Layout";
import Dashboard from "../components/core/dashboard/dashboard";
import MarketList from "../components/core/coinGecko/coinMarket/marketList";
import Footer from "../components/core/footer/footer";

// types
import { HomePageProps } from "../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCoins, setIsCoins ] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isPlatforms, setIsPlatforms ] = useState(false);

  const handlePageChange = (selectedObject: any) => {
    const page = selectedObject.target.innerText;
    if ( page == "Coins") {
      setIsCoins(true);
      setIsDashboard(false);
      setIsPlatforms(false);
    } else {
      if ( page == "Platforms" ) {
        setIsPlatforms(true);
        setIsCoins(false);
        setIsDashboard(false);
      } else {
        setIsDashboard(true);
        setIsCoins(false);
        setIsPlatforms(false);
      }
    };
	};

  return (
    <div className={styles.index_full}>
      <Favicon url="/favicon.ico"/>
      <title>(Alpha) Earn Markets</title>
      <script type="module" src={process.env.NEXT_PUBLIC_HUGBUNTERS_WIDGET_URL}/>
      <ChakraProvider>
        <Layout>
          <Navbar>
            <Container>
              <Nav className={styles.hugsSideNavBar}>
                <div>
                  <Nav.Item className={styles.hugsSideNavBarTitle}></Nav.Item>
                </div>
                <Nav.Link onClick={handlePageChange} className={isCoins ? styles.hugsNavBarLink + " " + styles.overview + " " + styles.hugsNavBarLinkActive : styles.hugsNavBarLink + " " + styles.overview}>Coins</Nav.Link>
                <Nav.Link onClick={handlePageChange} className={isPlatforms ? styles.hugsNavBarLink + " " + styles.platform + " " + styles.hugsNavBarLinkActive : styles.hugsNavBarLink + " " + styles.platform}>Platforms</Nav.Link>
                <Nav.Link onClick={handlePageChange} className={isDashboard ? styles.hugsNavBarLink + " " + styles.dashboard + " " + styles.hugsNavBarLinkActive : styles.hugsNavBarLink + " " + styles.dashboard}>Dashboard</Nav.Link>
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
                <Nav.Link className={styles.hugsHeaderNavBarLink}><ConnectButton handleOpenModal={onOpen}/></Nav.Link>
            </Navbar>
          </Container>
          
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Layout>
      </ChakraProvider>
        <Container className={styles.mainPageContainer}>
          <section className={styles.cryptoList}>
            { isCoins ? (<CoinsList />) : (<div></div>) }
            { isDashboard ? (<Dashboard />) : (<div></div>) }
            { isPlatforms ? (<MarketList />) : (<div></div>) }
          </section>
        <Footer></Footer>
      </Container>
    </div>
  );
};

export default Home;
