import React from "react";
import type {NextPage} from "next";
import styles from '../styles/about-us.module.scss'
// components
import Layout from "../../components/core/layout";
import Banner from "../../components/core/banner/banner";
import Link from "next/link";


const Page: NextPage = () => {
    return (
        <Layout>
            <Banner/>
            <div className={styles.container}>
                <div className={styles.title}>About Us</div>
                <div className={styles.wrapper}>
                    <p>The EARN app is built on the Curator engine, which is owned and maintained by Gibraltar-based
                        company Hugs Limited.</p>
                    <p>All apps built on Curator use the native $HUGS token to pay for network fees and to incentivise
                        users who participated in the Curator ecosystem.</p>
                    <p>
                        More information about Hugs and the Curator engine can be found in the Hugs whitepaper: <br/>
                        <a rel="noreferrer" target="_blank"
                           href="https://hugs-solutions.gitbook.io/hugs-platform">https://hugs-solutions.gitbook.io/hugs-platform</a>
                    </p>
                    <p>
                        Or on the Hugs Limited website: <br/>
                        <a rel="noreferrer" target="_blank" href="https://hugsplatform.com">https://hugsplatform.com</a>
                    </p>
                    <div className={styles.backButton__wrapper}>
                        <Link href={'/'}>
                            <div className={styles.backButton}>Back</div>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Page;
