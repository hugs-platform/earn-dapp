import type { NextPage } from "next";

// components
import CoinsList from "../components/core/coinGecko/coinMarket/coinList";
import Layout from "../components/core/layout";

// types
import { HomePageProps } from "../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  return (
      <Layout>
        <CoinsList />
      </Layout>
  );
};

export default Home;
