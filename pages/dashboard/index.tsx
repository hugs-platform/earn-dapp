import type { NextPage } from "next";

// components
import Layout from "../../components/core/layout";
import Dashboard from "../../components/core/dashboard/dashboard";

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
