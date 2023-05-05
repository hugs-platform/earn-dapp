import type { NextPage } from "next";

// components
import Layout from "../../components/core/layout";
import ProfileList from "../../components/core/profiles/profileList";

// types
import { HomePageProps } from "../../core/types/types";


const Home: NextPage<HomePageProps> = () => {
  return (
      <Layout>
        <ProfileList />
      </Layout>
  );
};

export default Home;
