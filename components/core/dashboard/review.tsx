import React, { FC, useState } from "react";
import Countdown from 'react-countdown';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';

// styles
import styles from "../dashboard/dashboard.module.scss";

// types
import { Review } from "../../../core/types/types";

import { HugsApi } from "../../../services/hugsApi";

export interface ReviewProps {
    key: number;
    reviewData: Review;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75vw",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "25px",
    p: 4,
};

const OneReview: FC<ReviewProps> = (props: ReviewProps) => {
    const { reviewData } = props;
    const Completionist = () => <span>expired</span>;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ open, setOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ remarks, setRemarks ] = useState("");
    const [ isCoinInMarket, setIsCoinInMarket ] = useState(NaN);
    const [ coinInMarketError, setCoinInMarketError ] = useState(false);
    const [ isCoinAPYCurrently, setIsCoinAPYCurrently ] = useState(NaN);
    const [ isCoinAPYCurrentlyError, setIsCoinAPYCurrentlyError ] = useState(false);


  const inputHandler = (inputObject: any) => {
    setRemarks(inputObject.target.value);
  };

  const setIsCoinInMarketAnswer = (state: any) => {
    setIsCoinInMarket(state);
    setCoinInMarketError(false);
  }
  
  const setIsCoinAPYCurrentlyAnswer = (state: any) => {
    setIsCoinAPYCurrently(state);
    setIsCoinAPYCurrentlyError(false);
  }

  const closeSuccessModal = () => {
    setIsSuccess(false);
  }

  const sendReview = () => {
    if (isLoading){
        return
    } else {
        setIsLoading(true);
    
        if (Object.is(isCoinInMarket, NaN)) {
            setCoinInMarketError(true);
        } else {
            setCoinInMarketError(false);
        }
        if (Object.is(isCoinAPYCurrently, NaN)) {
            setIsCoinAPYCurrentlyError(true);
        } else {
            setIsCoinAPYCurrentlyError(false);
        }
        
        if ( coinInMarketError == true && isCoinAPYCurrentlyError == true ){
            setIsLoading(false);
            return
        }
        else {
            let answer = false;
            if ( Object.is(isCoinInMarket, true) && Object.is(isCoinAPYCurrently, true)) {
                answer = true;
            }
            new HugsApi().sendReviewAnswer(reviewData.id, answer, remarks)
            .then(response => {
                if (response){
                    setIsSuccess(true);
                    handleClose();
                }
            })
        return () => [];
        }
    };
  };

  return (
    <div className="row" key={reviewData.id}>
        <p>{reviewData.coin.name} on {reviewData.market.platform}</p>
        <a onClick={handleOpen}>Review now</a>
        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition>
            <Fade in={open}>
            <Box sx={style}>
                <Typography id="transition-modal-title" className={styles.dashboard_modal_title_first} variant="h2" component="h2">
                    Review this Contribution
                </Typography>
                <Typography id="transition-modal-title" className={styles.dashboard_modal_title_second_span} variant="h3" component="h2">
                    Remaining Time:  
                <Countdown className={styles.dashboard_modal_title_second_info} date={reviewData.time_left}>
                    <Completionist />
                </Countdown>
                </Typography>
                <Typography id="transition-modal-title" className={styles.dashboard_modal_title_second_span} variant="h3" component="h2">
                    Reputation Risk/Reward: <span className={styles.dashboard_modal_title_second_info}>-3/+1</span>
                </Typography>
                <Typography id="transition-modal-title" className={styles.dashboard_modal_title_second_span} variant="h3" component="h2">
                    $HUGS to be earned for correct review: <span className={styles.dashboard_modal_title_second_info}>2 $HUGS</span>
                </Typography>
                <Container className={styles.dashboard_modal_main_container_info}>
                    <Typography id="transition-modal-main" className={styles.dashboard_modal_main} variant="h3" component="h2">
                        {reviewData.coin.name} on {reviewData.market.platform} an APY of {reviewData.min_apy}..{reviewData.max_apy}% 
                    </Typography>
                    <span className={styles.dashboard_modal_main_second_info}>Check it on: <a rel="noreferrer" target="_blank" href={reviewData.link}> {reviewData.market.platform}</a></span>
                </Container>
                <Container className={styles.dashboard_modal_main_container}>
                    <h1>Is {reviewData.coin.name} on {reviewData.market.platform}?</h1> 
                    <button className={styles.dasboard_modal_accept_btn} onClick={() => setIsCoinInMarketAnswer(true)}>Yes</button>
                    <button className={styles.dasboard_modal_reject_btn} onClick={() => setIsCoinInMarketAnswer(false)}>No</button>
                </Container>
                { coinInMarketError && 
                    <Container className={styles.dashboard_modal_main_container_error}>
                    <p>Choose one</p> 
                    </Container>
                }
                <Container className={styles.dashboard_modal_main_container}>
                    <h1>Is this APY of {reviewData.coin.name} currently at {reviewData.min_apy}..{reviewData.max_apy}%?</h1> 
                    <button className={styles.dasboard_modal_accept_btn} onClick={() => setIsCoinAPYCurrentlyAnswer(true)}>Yes</button> 
                    <button className={styles.dasboard_modal_reject_btn} onClick={() => setIsCoinAPYCurrentlyAnswer(false)}>No</button>
                </Container>
                { isCoinAPYCurrentlyError && 
                    <Container className={styles.dashboard_modal_main_container_error}>
                    <p>Choose one</p> 
                    </Container>
                }
                <Container className={styles.dashboard_modal_main_container}>
                    <textarea className={styles.dashboard_modal_main_text_area} onChange={inputHandler} placeholder="Remarks (Optional)"></textarea>
                </Container>
                <Container className={styles.dashboard_modal_submit_container}>
                    <button className={styles.dasboard_modal_submit_btn} onClick={sendReview}>Submit</button>
                </Container>
            </Box>
            </Fade>
        </Modal>

        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={isSuccess} onClose={closeSuccessModal} closeAfterTransition>
            <Fade in={isSuccess}>
            <Box sx={style}>
                <Typography id="transition-modal-title" className={styles.dashboard_modal_title_first} variant="h2" component="h2">
                    REVIEW SUBMITTED
                </Typography>
                <Typography id="transition-modal-title" className={styles.dashboard_modal_title_second_span} variant="h3" component="h2">
                    Thank you for your review of this contributions. Please note that your review will not be accepted right away.
                </Typography>
                <Typography id="transition-modal-title" className={styles.dashboard_modal_title_second_span} variant="h3" component="h2">
                    The required number of reviewers needs to be reached until the contribution is accepted or rejected. Until then your review will have a pending status.
                </Typography>
                <Container className={styles.dashboard_modal_submit_container}>
                    <button className={styles.dasboard_modal_submit_btn} onClick={closeSuccessModal}>Close</button>
                </Container>
            </Box>
            </Fade>
        </Modal>
        <Countdown date={reviewData.time_left}>
            <Completionist />
        </Countdown>
    </div>
  );
};

export default OneReview;
