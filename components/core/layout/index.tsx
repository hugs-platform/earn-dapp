import React, {useState, useEffect, ReactNode} from "react";
import {ChakraProvider, useDisclosure} from "@chakra-ui/react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {HugsApi} from "../../../services/hugsApi";

import styles from "./homePage.module.scss";

// components
import ConnectButton from "../metaMask/authentications";
import AccountModal from "../metaMask/accountModal";
import LayoutComponent from "./LayoutComponent";
import Footer from "../footer/footer";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelector} from "react-redux";
import store from "../../../services/store/store";
import {setNotifications, setUser} from "../../../services/store/actions";
import moment from "moment";
import classNames from "classnames";


type Props = {
    children?: ReactNode;
};

/**
 * @class
 * @ignore
 */
export default function Layout({children}: Props) {
    const router = useRouter()
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [showMore, setShowMore] = useState(false);
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvater] = useState("");
    const [fullSidebar, setFullSidebar] = useState(true);
    const [giftShow, setGiftShow] = useState(true);
    const [size, setSize] = useState(1080);
    const API = new HugsApi();
    const notificationsList = useSelector((state: any) => state.wallet.notifications);
    const notifications = notificationsList?.filter((el: any) => new Date(el.time_left).getTime() > new Date().getTime())
    const user = useSelector((state: any) => state.wallet.user);
    const [isLogin, setIsLogin] = useState(false);

    /**
     * @class
     * @ignore
     * @param {string} value - name of page
     */
    function handlePageChange(value: string) {
        switch (value) {
            case "Coins":
                router.push('/')
                break;
            case "Markets":
                router.push('/markets')
                break;
            case "Dashboard":
                router.push('/dashboard')
                break;
            case "Profiles":
                router.push('/profiles')
                break;
            case "Roles":
                router.push('/roles')
                break;
            case "MarketsLink":
                router.push('/market-link')
                break;
        }
    }

    const checkUser = () => {
        const username = window.localStorage.getItem('username');
        if (username != null) {
            setUserName(username);
        } else {
            setUserName("");
        }
        const avatar = window.localStorage.getItem('avatar');
        if (avatar != null) {
            setUserAvater(avatar);
        } else {
            setUserAvater("");
        }
    };

    const updateSize = () => {
        setSize(window.innerWidth);
    }

    useEffect(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
        if (size < 768) {
            setFullSidebar(false);
            setGiftShow(false);
            window.removeEventListener('resize', updateSize);
        }

        window.addEventListener('profile_update', () => {
            checkUser();
        });
        if (API.getCookie("isStaff")) {
            setShowMore(true);
        } else {
            setShowMore(false);
        }
    });
    useEffect(() => {
        if (!user) {
            handleCheckLogin()
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setIsLogin(true)
        }
    }, [user]);

    useEffect(() => {
        if (isLogin) {
            API.getReviews(0, 'name', 1000, 'pending').then(response => {
                if (response) {
                    store.dispatch(setNotifications({payload: response.data.items}));
                }
            })
        }
    }, [isLogin])

    const handleCheckLogin = () => {
        if (API.getCookie("token")) {
            setIsLogin(true);
            API.getProfile().then(response => {
                if (response) {
                    const user = {
                        alias: response.data.alias,
                        wallet: response.data.wallet,
                        reputation: response.data.reputation_score,
                        registrationDate: moment(Date.parse(response.data.registration_date)).format("MMM DD YYYY"),
                        reviewsRequestTotal: response.data.reviews.request_total,
                        reviewsRequestLastMonth: response.data.reviews.request_scince_last_month,
                        contributionTotal: response.data.contributions.total,
                        contributionRequestLastMonth: response.data.contributions.scince_last_month,
                        reviewLastMonth: response.data.reviews.scince_last_month,
                        reviewTotal: response.data.reviews.total,
                        search: response.data.search,
                        rewards: response.data.rewards,
                        email: response.data.email,
                        social_link: response.data.social_link,
                        is_admin: response.data.is_admin,
                        is_active: response.data.is_active,
                        role: response.data.role,
                    }
                    store.dispatch(setUser({user}));
                }
            });
        } else {
            setIsLogin(false);
            if (router.pathname.includes('dashboard') || router.pathname.includes('profiles')) {
                router.push('/')
            }
        }
    }

    const ShowLess = () => {
        setFullSidebar(false);
        setGiftShow(false);
    }

    const ShowMore = () => {
        setFullSidebar(true);
        setTimeout(() => {
            setGiftShow(true);
        }, 500);
    }

    return (
        <div className={styles.index_full}>
            <Container className={styles.mainPageContainer}>
                <Container
                    className={fullSidebar ? styles.sidebarContainer : styles.sidebarContainer + " " + styles.showLessSidebar}>
                    <Navbar className={styles.fillHeight}>
                        <Nav className={styles.hugsSideNavBar}>
                            <div
                                className={router.asPath === '/' ? styles.hugsSideBarLogo + " " + styles.BRB + " " + styles.BRT : styles.hugsSideBarLogo + " " + styles.BRT}>
                                <Nav.Link
                                    onClick={() => {handlePageChange("Coins")}}
                                    className={fullSidebar ? styles.hugsSideNavBarTitle : styles.hugsSideNavBarTitle + " " + styles.hugsSideNavBarTitleHide}/>
                                {fullSidebar ?
                                    <Nav.Item onClick={ShowLess} className={styles.hugsSideNavBarLess}/>
                                    :
                                    <Nav.Item onClick={ShowMore} className={styles.hugsSideNavBarShow}/>
                                }
                            </div>
                            <Nav.Item
                                className={router.pathname.includes('markets') ? styles.hugsNavBarItem + " " + styles.BRB : styles.hugsNavBarItem}>
                                <Nav.Link onClick={() => {
                                    handlePageChange("Coins")
                                }} className={router.asPath === '/' ?
                                    fullSidebar ?
                                        styles.hugsNavBarLink + " " + styles.overview + " " + styles.hugsNavBarLinkActive :
                                        styles.hugsNavBarLink + " " + styles.overview + " " + styles.hugsNavBarLinkActiveHide
                                    :
                                    styles.hugsNavBarLink + " " + styles.overview}>{fullSidebar ? "Coins" : ""}</Nav.Link>
                                {!fullSidebar &&
                                    <Nav.Item className={styles.hugsNavBatHoverItem}>
                                        Coins <img alt='overview' src="/static/src/overview.svg"/>
                                    </Nav.Item>
                                }
                            </Nav.Item>
                            <Nav.Item
                                className={router.asPath === '/' ? styles.hugsNavBarItem + " " + styles.BRT + " " + styles.BRT : router.pathname.includes('dashboard') ? styles.hugsNavBarItem + " " + styles.BRB : styles.hugsNavBarItem}>
                                <Nav.Link onClick={() => {
                                    handlePageChange("Markets")
                                }} className={router.pathname.includes('markets') ?
                                    fullSidebar ?
                                        styles.hugsNavBarLink + " " + styles.platform + " " + styles.hugsNavBarLinkActive :
                                        styles.hugsNavBarLink + " " + styles.platform + " " + styles.hugsNavBarLinkActiveHide
                                    :
                                    styles.hugsNavBarLink + " " + styles.platform
                                }>{fullSidebar ? "Markets" : ""}</Nav.Link>
                                {!fullSidebar &&
                                    <Nav.Item className={styles.hugsNavBatHoverItem}>
                                        Markets 123 <img alt='platform' src="/static/src/platform.svg"/>
                                    </Nav.Item>
                                }
                            </Nav.Item>
                            <Nav.Item
                                className={router.pathname.includes('markets') ? styles.hugsNavBarItem + " " + styles.BRT : router.pathname.includes('profiles') ? styles.hugsNavBarItem + " " + styles.BRB : styles.hugsNavBarItem}>
                                {isLogin ?
                                    <Nav.Link onClick={() => {
                                        handlePageChange("Dashboard")
                                    }} className={router.pathname.includes('dashboard') ?
                                        fullSidebar ?
                                            styles.hugsNavBarLink + " " + styles.dashboard + " " + styles.hugsNavBarLinkActiveWithNotifications :
                                            styles.hugsNavBarLink + " " + styles.dashboard + " " + styles.hugsNavBarLinkActiveHide
                                        :
                                        styles.hugsNavBarLink + " " + styles.dashboard
                                    }>{fullSidebar ? "Dashboard" : ""}<span>{notifications.length}</span></Nav.Link>
                                    :
                                    <></>
                                }
                                {!fullSidebar &&
                                    <Nav.Item className={styles.hugsNavBatHoverItem}>
                                        Dashboard <img alt='dashboard' src="/static/src/dashboard.svg"/>
                                    </Nav.Item>
                                }
                            </Nav.Item>
                            <Nav.Item
                                className={router.pathname.includes('dashboard') ? styles.hugsNavBarItem + " " + styles.BRT : router.pathname.includes('roles') ? styles.hugsNavBarItem + " " + styles.BRB : styles.hugsNavBarItem}>
                                {showMore ?
                                    <Nav.Link onClick={() => {
                                        handlePageChange("Profiles")
                                    }} className={router.pathname.includes('profiles') ?
                                        fullSidebar ?
                                            styles.hugsNavBarLink + " " + styles.avatar + " " + styles.hugsNavBarLinkActive :
                                            styles.hugsNavBarLink + " " + styles.avatar + " " + styles.hugsNavBarLinkActiveHide
                                        : styles.hugsNavBarLink + " " + styles.avatar
                                    }>{fullSidebar ? "Profiles" : ""}</Nav.Link>
                                    :
                                    <></>
                                }
                                {showMore && !fullSidebar &&
                                    <Nav.Item className={styles.hugsNavBatHoverItem}>
                                        Profiles <img src="/static/src/settings.svg"/>
                                    </Nav.Item>}

                            </Nav.Item>
                            <Nav.Item
                                className={router.pathname.includes('profiles') ? styles.hugsNavBarItem + " " + styles.BRT : router.pathname.includes('market-link') ? styles.hugsNavBarItem + " " + styles.BRB : styles.hugsNavBarItem}>
                                {showMore ?
                                    <Nav.Link onClick={() => {
                                        handlePageChange("Roles")
                                    }} className={router.pathname.includes('roles') ?
                                        fullSidebar ?
                                            styles.hugsNavBarLink + " " + styles.avatar + " " + styles.hugsNavBarLinkActive :
                                            styles.hugsNavBarLink + " " + styles.avatar + " " + styles.hugsNavBarLinkActiveHide
                                        : styles.hugsNavBarLink + " " + styles.avatar
                                    }>{fullSidebar ? "Roles" : ""}</Nav.Link>
                                    :
                                    <></>
                                }
                                {showMore && !fullSidebar &&
                                    <Nav.Item className={styles.hugsNavBatHoverItem}>
                                        Roles <img src="/static/src/settings.svg"/>
                                    </Nav.Item>
                                }

                            </Nav.Item>
                            <Nav.Item
                                className={router.pathname.includes('roles') ? styles.hugsNavBarItem + " " + styles.BRT : styles.hugsNavBarItem}>
                                {showMore ?
                                    <Nav.Link onClick={() => {
                                        handlePageChange("MarketsLink")
                                    }} className={router.pathname.includes('market-link') ?
                                        fullSidebar ?
                                            styles.hugsNavBarLink + " " + styles.avatar + " " + styles.hugsNavBarLinkActive :
                                            styles.hugsNavBarLink + " " + styles.avatar + " " + styles.hugsNavBarLinkActiveHide
                                        : styles.hugsNavBarLink + " " + styles.avatar
                                    }>{fullSidebar ? "Market Link" : ""}</Nav.Link>
                                    :
                                    <></>
                                }
                                {showMore && !fullSidebar &&
                                    <Nav.Item className={styles.hugsNavBatHoverItem}>
                                        Markets Link <img src="/static/src/settings.svg"/>
                                    </Nav.Item>
                                }

                            </Nav.Item>
                            <Nav.Item
                                className={router.pathname.includes('market-link') ? styles.hugsNavBarItemFill + " " + styles.BRT : styles.hugsNavBarItemFill}/>
                            <Nav.Item className={styles.giftDiv}>
                                {giftShow ?
                                    <div className={styles.hugsSideNavBarFooterGiftDiv}>
                                        <img className={styles.hugsSideNavBarFooterGift} src='/static/src/gift.png'/>
                                        <Nav.Item className={styles.hugsSideNavBarFooter}>
                                            <h1>Mint your NFT!</h1>
                                            <p>&#10004; Get full access</p>
                                            <p>&#10004; Earn Rewards</p>
                                            <p>&#10004; Gain Reputation.</p>
                                            <button className={styles.mainButton} type="button">Coming soon</button>
                                        </Nav.Item>
                                    </div>
                                    :
                                    <div className={styles.hugsSideNavBarFooterGiftDiv}>
                                        <img className={styles.hugsSideNavBarFooterGiftSmall}
                                            src='/static/src/small-gift.svg'/>
                                        <a className={styles.hugsSideNavBarFooterGiftSmallLink}>Mint now</a>
                                    </div>
                                }
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Container>
                <Container
                    className={fullSidebar ? styles.mainContantContainer : styles.mainContantContainer + " " + styles.mainContantContainerMore}>
                    <ChakraProvider>
                        <LayoutComponent>
                            <Container className={styles.hugsSideNavContainer}>
                                <Navbar className={styles.hugsHeaderNavBar}>
                                    <Link href={'/how-it-works'}><Nav.Item className={styles.hugsHeaderNavBarItem}>How
                                        It works</Nav.Item></Link>
                                    <Link href={'/about-us'}><Nav.Item className={styles.hugsHeaderNavBarItem}>About
                                        Us</Nav.Item></Link>
                                    {!!notifications.length && <Link href={'/dashboard'}>
                                        <Nav.Item
                                            className={classNames(styles.hugsHeaderNavBarItem, [styles.hugsHeaderNavBarItemNotification])}>
                                            {notifications.length} reviews waiting for you
                                        </Nav.Item>
                                    </Link>}
                                    <Nav.Item className={styles.hugsHeaderNavBarLink}>
                                        <ConnectButton
                                            handleOpenModal={onOpen}
                                            handleCheckLogin={handleCheckLogin}
                                        />
                                    </Nav.Item>
                                    {userName ?
                                        <Nav.Item className={styles.hugsHeaderNavBarItem}>{userName}</Nav.Item>
                                        :
                                        <></>
                                    }
                                    {userAvatar ?
                                        <Nav.Item className={styles.hugsHeaderNavBarItem}><img
                                            src={userAvatar}/></Nav.Item>
                                        :
                                        <></>
                                    }
                                </Navbar>
                            </Container>
                            <AccountModal isOpen={isOpen} onClose={onClose}/>
                        </LayoutComponent>
                    </ChakraProvider>
                    <section className={styles.cryptoList}>
                        {children}
                    </section>
                </Container>
            </Container>
            <Container>
                <Footer/>
            </Container>
        </div>
    );
};
