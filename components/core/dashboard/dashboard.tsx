import React, {useEffect, useRef, useState, ChangeEvent} from "react";
import moment from "moment";
import Select from "react-select";
import ReactPaginate from "react-paginate";

// data
import {HugsApi} from "../../../services/hugsApi";

// styles
import styles from "../dashboard/dashboard.module.scss";

import {ReviewRequest, CoinContribution} from "../../../core/types/types";

import OneReviewRequest from "../dashboard/reviews/reviewRequest";
import OneReview from "./reviews/review";
import OneContribution from "./reviews/contribution";
import {useSelector} from "react-redux";

/**
 * @class
 * @ignore
 */
function App() {
    const API = new HugsApi();
    const [reviewsRequestList, setReviewsRequestList] = useState([]);
    const [reviewsList, setReviewsList] = useState([]);
    const [contributionsList, setContributionsList] = useState([]);
    const [userAlias, setUserAlias] = useState("");
    const [userWallet, setUserWallet] = useState("");
    const [userWalletDisplay, setUserWalletDisplay] = useState("");
    const [userReputation, setUserReputation] = useState("");
    const [userEarnedRewards, setUserEarnedRewards] = useState("250,000");
    const [registrationDate, setRegistrationDate] = useState("");
    const [reviewRequest, setReviewRequest] = useState(0);
    const [reviewRequestLastMonth, setReviewRequestLastMonth] = useState(0);
    const [contributionRequest, setContributionRequest] = useState(0);
    const [contributionRequestLastMonth, setContributionRequestLastMonth] = useState(0);
    const [review, setReview] = useState(0);
    const [reviewLastMonth, setReviewLastMonth] = useState(0);
    const [showIsEdit, setShowIsEdit] = useState(false);
    const [newUserAlias, setNewUserAlias] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [newUserAvatar, setNewUserAvatar] = useState("");
    const page = useRef(0);
    const orderBy = useRef("-created_at");
    const prePage = useRef(10);
    const status = useRef("pending");
    const pageCount = useRef(0);
    const contribution_type = useRef(0);
    const selectList = [
        {value: 0, label: "Review Requests"},
        {value: 1, label: "Contributions"},
        {value: 2, label: "Reviews"}
    ]
    const notificationsList = useSelector((state: any) => state.wallet.notifications);
    const notifications = notificationsList?.filter((el: any) => new Date(el.time_left).getTime() > new Date().getTime())

    useEffect(() => {
        const userName = window.localStorage.getItem('username');
        if (userName) {
            setUserAlias(userName);
        }
        const userAvatar = window.localStorage.getItem('avatar');
        if (userAvatar) {
            setUserAvatar(userAvatar);
        }
        API.getProfile().then(response => {
            if (response) {
                setUserAlias(response.data.alias);
                setNewUserAlias(response.data.alias);
                setUserAvatar(response.data.avatar);
                setUserWallet(response.data.wallet);
                setUserReputation(response.data.reputation_score);
                setUserWalletDisplay(response.data.wallet.slice(0, 6) + "......." + response.data.wallet.slice(-6));
                const registration_date = Date.parse(response.data.registration_date);
                setRegistrationDate(moment(registration_date).format("MMM DD YYYY"));
                setReviewRequest(response.data.reviews.request_total);
                setReviewRequestLastMonth(response.data.reviews.request_scince_last_month);
                setContributionRequest(response.data.contributions.total);
                setContributionRequestLastMonth(response.data.contributions.scince_last_month);
                setReview(response.data.reviews.total);
                setReviewLastMonth(response.data.reviews.scince_last_month);
                setUserEarnedRewards("250,000");
                if (response.data.alias) {
                    window.localStorage.setItem('username', response.data.alias);
                }
                if (response.data.avatar) {
                    window.localStorage.setItem('avatar', response.data.avatar);
                }
                window.dispatchEvent(new Event("profile_update"));
            }
        });
        getReviewRequests();
    }, [])

    const getReviewRequests = () => {
        clearFilters();
        API.getReviews(page.current, orderBy.current, prePage.current, status.current).then(response => {
            if (response) {
                setReviewsRequestList(response.data.items);
                pageCount.current = response.data.number_of_pages;
                page.current = response.data.page;
            }
        })
    }

    const getReviews = () => {
        clearFilters();
        status.current = "closed";
        API.getReviews(page.current, orderBy.current, prePage.current, status.current).then(response => {
            if (response) {
                setReviewsList(response.data.items);
                pageCount.current = response.data.number_of_pages;
                page.current = response.data.page;
            }
        })
    }

    const getContributions = () => {
        clearFilters();
        API.getContributions(page.current, orderBy.current, prePage.current).then(response => {
            if (response) {
                setContributionsList(response.data.items);
                pageCount.current = response.data.number_of_pages;
                page.current = response.data.page;
            }
        })
    }

    const clearFilters = () => {
        page.current = 0;
        status.current = "pending";
        orderBy.current = "-created_at";
        setReviewsList([]);
        setReviewsRequestList([]);
        setContributionsList([]);
    }

    const copyClipboard = (selectedObject: any) => {
        setUserWalletDisplay("copied");
        navigator.clipboard.writeText(userWallet);
        setTimeout(() => {
            setUserWalletDisplay(userWallet.slice(0, 4) + "......." + userWallet.slice(-4));
        }, 3000)
    };

    const selectOnChange = (selectedObject: any) => {
        if (contribution_type.current != selectedObject.value) {
            contribution_type.current = selectedObject.value;
            page.current = 0;
            handleFetch();
        }
    }

    const handlePageChange = (selectedObject: any) => {
        page.current = selectedObject.selected;
        handleFetch();
    };

    const handleFetch = () => {
        if (contribution_type.current === 0) {
            getReviewRequests();
        } else {
            if (contribution_type.current === 1) {
                getContributions();
            } else {
                getReviews();
            }
            ;
        }
        ;
    };

    const changeNewAlias = (selectedObject: any) => {
        setNewUserAlias(selectedObject.target.value);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                setNewUserAvatar(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    };

    const updateProfile = () => {
        const body = {
            'alias': newUserAlias
        }
        if (newUserAvatar !== "") {
            Object.assign(body, {avatar: newUserAvatar});
        }
        API.updateProfile(body).then(response => {
            if (response) {
                setUserAlias(response.data['alias']);
                setUserAvatar(response.data['avatar']);
                setShowIsEdit(false);
                if (response.data['alias']) {
                    window.localStorage.setItem('username', response.data['alias']);
                }
                if (response.data['avatar']) {
                    window.localStorage.setItem('avatar', response.data['avatar']);
                }
                window.dispatchEvent(new Event("profile_update"));
            }
        })
    }

    return (
        <>
            <header className={styles.dashboard_header}>
                <hgroup>
                    <h1>Dashboard</h1>
                </hgroup>
            </header>
            <main className={styles.dashboard_main}>
                <div className={styles.dashboard_row}>
                    <div className={styles.dasboard_col_3}>
                        <div
                            className={styles.dashboard_card + " " + styles.dashboard_card_main_theme + " " + styles.dashboard_card_profile}>
                            <div className={styles.dashboard_card_profile_title}>
                                <img className={styles.dashboard_card_profile_img}
                                     src={userAvatar ? userAvatar : '/static/src/default-profile.png'}/>
                                <p>Welcome Back!</p>
                                {showIsEdit ?
                                    <div>
                                        <label>Your nickname:</label>
                                        <input onChange={changeNewAlias} className={styles.input} type="text"
                                               maxLength={17} value={newUserAlias}></input>
                                        <label>Your avatar:</label>
                                        <input className={styles.inputFile} name="avatar" type="file" accept="image/*"
                                               onChange={handleFileChange}></input>
                                        <i onClick={updateProfile}
                                           className={"fa-solid fa-check" + " " + styles.doneIcon}></i>
                                        <i onClick={() => {
                                            setShowIsEdit(false)
                                        }} className={"fa-solid fa-xmark" + " " + styles.closeIcon}></i>
                                    </div>
                                    :
                                    <div>
                                        <h1>{userAlias}</h1>
                                        <i onClick={() => {
                                            setShowIsEdit(true)
                                        }} className={"fa-solid fa-edit" + " " + styles.editIcon}></i>
                                    </div>
                                }
                            </div>
                            <div className={styles.dashboard_card_profile_body}>
                                <div className={styles.dashboard_card_profile_body_col}>
                                    <p>Wallet address</p>
                                    <p>{userWalletDisplay}</p>
                                    <img onClick={copyClipboard} className={styles.dashboard_card_copy_img}
                                         src='/static/src/copy.png'/>
                                </div>
                                <div className={styles.dashboard_card_profile_body_col}>
                                    <p>Alpha testing reward pool </p>
                                    <p>$HUGS {userEarnedRewards}</p>
                                </div>
                            </div>
                            <div className={styles.dashboard_card_profile_reputation}>
                                <h1>{userReputation}</h1>
                                <h2>Reputation</h2>
                                <p>Member Since {registrationDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dasboard_col_9}>
                        <div className={styles.dashboard_row}>
                            <div className={styles.dasboard_col_4}>
                                <div
                                    className={styles.dashboard_card + " " + styles.dashboard_card_review_requests + " " + `${reviewRequestLastMonth >= 0 ? styles.up_background : styles.down_background}`}>
                                    <h1>Review Requests <span>{notifications.length}</span></h1>
                                    <h2>{reviewRequest}</h2>
                                    <p><span
                                        className={`${reviewRequestLastMonth >= 0 ? styles.up : styles.down}`}>{reviewRequestLastMonth}%</span> Scince
                                        last months</p>
                                </div>
                            </div>
                            <div className={styles.dasboard_col_4}>
                                <div
                                    className={styles.dashboard_card + " " + styles.dashboard_card_review_contribtuions + " " + `${contributionRequestLastMonth >= 0 ? styles.up_background : styles.down_background}`}>
                                    <h1>Contributions</h1>
                                    <h2>{contributionRequest}</h2>
                                    <p><span
                                        className={`${contributionRequestLastMonth >= 0 ? styles.up : styles.down}`}>{contributionRequestLastMonth}%</span> Scince
                                        last months</p>
                                </div>
                            </div>
                            <div className={styles.dasboard_col_4}>
                                <div
                                    className={styles.dashboard_card + " " + styles.dashboard_card_reviews + " " + `${reviewLastMonth >= 0 ? styles.up_background : styles.down_background}`}>
                                    <h1>Reviews</h1>
                                    <h2>{review}</h2>
                                    <p><span
                                        className={`${reviewLastMonth >= 0 ? styles.up : styles.down}`}>{reviewLastMonth}%</span> Scince
                                        last months</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboard_row}>
                            <div className={styles.dasboard_col_12}>
                                <div className={styles.dashboard_card + " " + styles.items_list}>
                                    <div className={styles.items_list_title}>
                                        <h1>Review Request</h1>
                                        <Select className={styles.select} options={selectList}
                                                defaultValue={selectList[0]} onChange={selectOnChange}/>
                                    </div>
                                    <div className={styles.items_list_body}>
                                        {reviewsRequestList.map((reviewData: ReviewRequest) => (
                                            <OneReviewRequest key={reviewData.id} reviewData={reviewData}/>
                                        ))}
                                        {reviewsList.map((reviewData: ReviewRequest) => (
                                            <OneReview key={reviewData.id} reviewData={reviewData}/>
                                        ))}
                                        {contributionsList.map((contributionData: CoinContribution) => (
                                            <OneContribution key={contributionData.id}
                                                             contributionData={contributionData}/>
                                        ))}
                                    </div>
                                    <div className={styles.items_list_footer}>
                                        {pageCount.current > 1 ?
                                            <ReactPaginate
                                                initialPage={0}
                                                pageCount={pageCount.current}
                                                pageRangeDisplayed={2}
                                                marginPagesDisplayed={3}
                                                onPageChange={handlePageChange}
                                                containerClassName={styles.coinsListPagination}
                                                previousLinkClassName={styles.coinsListPaginationPage}
                                                breakClassName={styles.coinsListPaginationPageBreak}
                                                nextLinkClassName={styles.coinsListPaginationPage}
                                                pageClassName={styles.coinsListPaginationPage}
                                                nextClassName={styles.coinsListPaginationPage}
                                                previousClassName={styles.coinsListPaginationPage}
                                                disabledClassName={styles.coinsListPaginationPageActiveDisabled}
                                                activeClassName={styles.coinsListPaginationPageActive}
                                                previousLabel={'< Prev'}
                                                nextLabel={'Next >'}
                                            /> : <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;