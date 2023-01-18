import React, { FC, useState } from "react";
import Countdown from 'react-countdown';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import { Button } from '@mui/material';

// styles
import styles from "../dashboard/dashboard.module.css";

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
    const API = new HugsApi;
    const { reviewData } = props;
    const Completionist = () => <span>expired</span>;
    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [ remarks, setRemarks ] = useState("");
    const [ isCoinInMarket, setIsCoinInMarket ] = useState("");
    const [ coinInMarketError, setCoinInMarketError ] = useState(false);
    const [ isCoinAPYCurrently, setIsCoinAPYCurrently ] = useState("");
    const [ isCoinAPYCurrentlyError, setIsCoinAPYCurrentlyError ] = useState(false);

  const inputHandler = (inputObject: any) => {
    setRemarks(inputObject.target.value);
  };

  const setIsCoinInMarketAnswer = (state: boolean) => {
    setIsCoinInMarket(state);
    setCoinInMarketError(false);
  }
  
  const setIsCoinAPYCurrentlyAnswer = (state: boolean) => {
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
    
        if (isCoinInMarket == "") {
            setCoinInMarketError(true);
        } else {
            setCoinInMarketError(false);
        }
        if (isCoinAPYCurrently == "") {
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
            console.log('OK');
            if ( isCoinInMarket == true && isCoinAPYCurrently == true) {
                answer = true;
            }
            API.sendReviewAnswer(reviewData.id, answer, remarks).then(response => {
                setIsLoading(false);
                if (response){
                    setIsSuccess(true);
                    handleClose();
                    setIsSuccess(true);
                }
            }, [])

            // TODO: delete
            setIsLoading(false);
        }
    };
  };

  return (
    <div className="row" key={reviewData.id}>
        <p>{reviewData.coin} on {reviewData.market}</p>
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
                        {reviewData.coin} on {reviewData.market} an APY of {reviewData.apy}% 
                    </Typography>
                    <span className={styles.dashboard_modal_main_second_info}>Check it on:<a rel="noreferrer" target="_blank" href={reviewData.link}> {reviewData.market}</a></span>
                </Container>
                <Container className={styles.dashboard_modal_main_container}>
                    <h1>Is {reviewData.coin} on {reviewData.market}?</h1> 
                    <Button className={styles.dasboard_modal_accept_btn} onClick={() => setIsCoinInMarketAnswer(true)}>Yes</Button>
                    <Button className={styles.dasboard_modal_reject_btn} onClick={() => setIsCoinInMarketAnswer(false)}>No</Button>
                </Container>
                { coinInMarketError && 
                    <Container className={styles.dashboard_modal_main_container_error}>
                    <p>Choose one</p> 
                    </Container>
                }
                <Container className={styles.dashboard_modal_main_container}>
                    <h1>Is this APY of {reviewData.coin} currently at {reviewData.apy}%?</h1> 
                    <Button className={styles.dasboard_modal_accept_btn} onClick={() => setIsCoinAPYCurrentlyAnswer(true)}>Yes</Button> 
                    <Button className={styles.dasboard_modal_reject_btn} onClick={() => setIsCoinAPYCurrentlyAnswer(false)}>No</Button>
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
                    <Button className={styles.dasboard_modal_submit_btn} onClick={sendReview}>Submit</Button>
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
                    <Button className={styles.dasboard_modal_submit_btn} onClick={closeSuccessModal}>Close</Button>
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
