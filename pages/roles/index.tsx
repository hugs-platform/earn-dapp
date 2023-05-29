import type { NextPage } from "next";

// components
import Layout from "../../components/core/layout";
import RoleList from "../../components/core/roles/rolesList";

// types
import { HomePageProps } from "../../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  return (
      <Layout>
        <RoleList />
      </Layout>
  );
};

export default Home;
