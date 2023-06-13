import type { NextPage } from "next";

// components
import Layout from "../../components/core/layout";
import MarketsLinkList from "../../components/core/coinGecko/marketsLink/marketsLinkList";

// types
import { HomePageProps } from "../../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  return (
      <Layout>
        <MarketsLinkList />
      </Layout>
  );
};

export default Home;
