import type { NextPage } from "next";

// components
import Layout from "../../components/core/layout";
import MarketList from "../../components/core/coinGecko/coinMarket/marketList";

// types
import { HomePageProps } from "../../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  return (
      <Layout>
        <MarketList />
      </Layout>
  );
};

export default Home;
