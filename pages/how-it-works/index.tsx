import React from "react";
import type {NextPage} from "next";
import styles from '../styles/how-it-works.module.scss'
// components
import Layout from "../../components/core/layout";
import Banner from "../../components/core/banner/banner";
import Link from "next/link";


const Page: NextPage = () => {
    return (
        <Layout>
            <Banner/>
            <div className={styles.container}>
                <div className={styles.title}>How it works</div>
                <div className={styles.wrapper}>
                    <div className={styles.question}>
                        <h3>Alpha version!</h3>
                        <p>The current version of EARN is still a very early version, which is open for Alpha testers
                            who have to be whitelisted by the Hugs Limited team before they can contribute data to the
                            project. Because the app is still in test mode, the app will contain errors and broken
                            design elements. We encourage all users of the app to notify the Hugs Limited team of any
                            issues the user encounters.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>EARN’s focus</h3>
                        <p>The EARN app lists staking opportunities for crypto assets. It shows the alleged APY (annual
                            percentage yield) a certain market offers the user for staking their crypto coins or
                            tokens.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Crowdsourced application</h3>
                        <p>The EARN app is a community-driven project, where users control the data that is added to the
                            application. EARN is built on top of the Curator engine, a hybrid and multi-app Web2 / Web3
                            engine, developed by Hugs Limited.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Consult for free</h3>
                        <p>The data on the EARN app can be consulted for free by anyone. It is a searchable index where
                            users can find information about crypto staking and use the provided links to visit the
                            markets that are offering staking.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Web3 sign-on</h3>
                        <p>Users can connect to the EARN app with their MetaMask wallet. The same wallet can be used by
                            the user to connect to various other apps built on Curator.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>User reputation</h3>
                        <p>Each new user is awarded 50 reputation points when they first connect to the EARN app. Every
                            time a user submits data to the app, or if the user reviews the data of another user, a
                            number of reputation points of that user will be kept in escrow until the data submitted by
                            the user was either accepted or rejected by the community. If accepted, the user will be
                            rewarded with extra reputation points, if rejected, the user will lose reputation points.
                            The Curator engine uses a fault-tolerance mechanism for this, which may vary depending on
                            the type of data.</p>
                        <p>The user cannot make any new data submissions if the number of reputation points falls below
                            zero. The user then needs to wait until some of their submissions were accepted by the
                            community, which will result in releasing some of the reputation points being held in
                            escrow. These released points can then be used to make new data submissions again.</p>
                        <p>If the user loses so many reputation points over time that their total available reputation
                            point balance is zero or less, the user then will not be able anymore to make any new data
                            submissions. With a balance higher than zero, the user can at all times continue to build up
                            reputation though as there is no upper limit in reputation points that can be gained. The
                            more reputation points a user has, the more data they’ll be able to submit or review.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Adding new data</h3>
                        <p>Users can simply add new data by using the various buttons in the app. New data that can be
                            added are new APY for a Coin/Market pair, adding a new coin, and adding a new market to the
                            app. By default the EARN app already contains a lot of coins and markets in its database, so
                            adding a new APY opportunity will be the most commonly used feature.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Reviewing existing data</h3>
                        <p>When connected, the user will receive Review Requests in their Dashboard. The Dashboard is
                            only visible when a MetaMask wallet is connected to the app. The Review Requests are
                            assigned randomly to a subset of users and are limited in time. If a user does not process a
                            Review Request within a certain timeframe, then a new user will be assigned to this Review
                            Request. No reputation points can be lost or gained for skipping Review Requests.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Deleting data</h3>
                        <p>Sometimes an APY opportunity will no longer be available on a certain platform, or even a
                            coin or platform will cease to exist. In such a case, a user can request a deletion of the
                            data, which will then be sent to a larger-than-usual subset of users to review the
                            request.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Reviews by super users</h3>
                        <p>New data submitted by users can also be accepted or rejected by a so-called super user. This
                            is either a member of the Hugs team or a user who was granted this status. Super users can
                            bypass the community-driven review process. They can also re-evaluate closed reviews and if
                            needed revert decisions made in those reviews. These super users exist for two reasons.
                            Firstly, we have them in place during the Alpha and Beta testing of the app to do quality
                            checks of the data and intervene in case occasional errors or bad actors occur. Secondly,
                            the use of super users will be used to analyse the possibility of introducing reputation
                            staking in the future (see the Hugs Curator whitepaper for more info).</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Add to earn model</h3>
                        <p>Users who participate in the app by adding, deleting, or reviewing data, will receive a
                            reputation score. This reputation can, later on, be added to the user’s wallet in a
                            soul-bound NFT (= non-tradable and non-transferable). Next to the reputation, users will be
                            able to earn $HUGS tokens when adding or removing data and by doing reviews of other users’
                            submissions. Each of those actions needs to be reviewed and accepted by the community and/or
                            one or more super users before the user becomes eligible for $HUGS rewards.</p>
                        <p>Hugs Limited can and will replace links to staking opportunities (APY), coins, platforms, and
                            other external resources with referral links from affiliate and referral programs of
                            third-party apps and websites. This means Hugs Limited can receive commissions whenever a
                            user signs up on the third-party platform. Hugs can use some of these commissions to buy
                            back its own $HUGS token, which will then in part be used to incentivise users with some
                            $HUGS.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>$HUGS tokens</h3>
                        <p>All apps built on the Curator engine will have to pay network fees for the use of this
                            infrastructure and the registering of data in the blockchain. Next to the network fees,
                            $HUGS tokens will also be used to incentivise users who actively add data (given that the
                            data is accepted) to apps built on the Curator engine. In the future, some user actions
                            might also trigger a network fee, such as for example the minting of an NFT, reputation
                            staking, or other interactions where network fees might occur.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>Blockchain integrations</h3>
                        <p>EARN is built on the Hugs Curator engine, which is a hybrid Web2 / Web3 platform. For certain elements, the engine will use traditional Web2 technology. However, where possible, Hugs will maximise the use of blockchain. Curator uses the Polygon network. We aim to be blockchain-agnostic though, and more networks will be added over time. Currently, the EARN app will use blockchain for user authentication, network fees, token rewards, soulbound reputation, NFTs, and notarising and querying reviewed data.</p>
                    </div>
                    <div className={styles.question}>
                        <h3>LEGAL DISCLAIMER</h3>
                        <p>The EARN application is a community-driven project. This means the data shown in the app is added and reviewed by the users themselves. This data might be incorrect, outdated, or contain inconsistencies. Hugs Limited can therefore not be held liable for any misinformation on the app. The user should always do their own research on whether the data offered is correct. We encourage users to participate in the project if they find certain data inaccurate by using the update and review features available in the EARN app. The information on the EARN app is for informative purposes only. We do not promote investing in cryptocurrencies and like to point out that investing in crypto assets contains risks where the user might lose part or all of their funds invested in crypto.</p>
                    </div>

                    <div className={styles.backButton__wrapper}>
                        <Link href={'/'}><div className={styles.backButton}>Back</div></Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Page;
