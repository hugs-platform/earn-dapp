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


// types
import { HomePageProps } from "../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCoins, setIsCoins ] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isPlatforms, setIsPlatforms ] = useState(false);

  const handlePageChange = (selectedObject: any) => {
    const page = selectedObject.target.innerText;
    if ( page == "Overview") {
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
      <Favicon url="/public/favicon.ico"/>
      <ChakraProvider>
        <Layout>
          <Navbar>
            <Container>
              <Nav className={styles.hugsSideNavBar}>
                <Nav.Item className={styles.hugsSideNavBarTitle}></Nav.Item>
                <Nav.Link onClick={handlePageChange} className={styles.hugsNavBarLink + " " + styles.overview}>Overview</Nav.Link>
                <Nav.Link onClick={handlePageChange} className={styles.hugsNavBarLink + " " + styles.platform}>Platforms</Nav.Link>
                <Nav.Link onClick={handlePageChange} className={styles.hugsNavBarLink + " " + styles.dashboard}>Dashboard</Nav.Link>
                <Nav.Link onClick={handlePageChange} className={styles.hugsNavBarLink + " " + styles.settings}>Settings</Nav.Link>
                <img className={styles.hugsSideNavBarFooterGift} src='/static/src/gift.png'/>
                <Nav.Item className={styles.hugsSideNavBarFooter}>
                  <h1>Mint your NFT!</h1>
                  <p>&#10004; Get full access</p>
                  <p>&#10004; Earn Rewards</p>
                  <p>&#10004; Gain Reputation.</p>
                  <button className={styles.mainButton} type="button">Mint Now</button>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar>
          <Container className={styles.mainPageContainer}>
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
            { isPlatforms ? (<h1>PLATFORMS</h1>) : (<div></div>) }
          </section>
      </Container>
    </div>
  );
};

export default Home;
