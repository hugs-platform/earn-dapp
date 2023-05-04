import type { NextPage } from "next";

// components
import Layout from "../../components/core/layout";
import Dashboard from "../../components/core/dashboard/dashboard";
import MarketList from "../../components/core/coinGecko/coinMarket/marketList";
import ProfileList from "../../components/core/profiles/profileList";

// types
import { HomePageProps } from "../../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  return (
      <Layout>
        <Dashboard />
      </Layout>
  );
};

export default Home;
