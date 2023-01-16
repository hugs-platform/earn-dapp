import type { NextPage } from "next";
import React, { useState } from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
  const [isPlatforms, setIsPlatforms] = useState(false);

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
      <ChakraProvider>
        <Layout>
          <Navbar>
            <Container>
              <Nav className={styles.hugsNavBar}>
                <Nav.Link onClick={handlePageChange} className={styles.hugsNavBarLink}>Coins</Nav.Link>
                {/* <Nav.Link onClick={handlePageChange} className={styles.hugsNavBarLink}>Platforms</Nav.Link> */}
                <Nav.Link onClick={handlePageChange} className={styles.hugsNavBarLink}>Dashboard</Nav.Link>
                <Nav.Link ><ConnectButton handleOpenModal={onOpen}/></Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Layout>
      </ChakraProvider>
      <section className={styles.cryptoList}>
        { isCoins ? (<CoinsList />) : (<div></div>) }
        { isDashboard ? (<Dashboard />) : (<div></div>) }
        { isPlatforms ? (<h1>PLATFORMS</h1>) : (<div></div>) }
      </section>
    </div>
  );
};

export default Home;
