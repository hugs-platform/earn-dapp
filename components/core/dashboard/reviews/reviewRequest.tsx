import React, { useRef, useState } from "react";
import Countdown from 'react-countdown';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import { Button } from '@mui/material';

// styles
import styles from "../reviews/review.module.css";

// types
import { ReviewRequest } from "../../../../core/types/types";

import { HugsApi } from "../../../../services/hugsApi";

/**
 * @param props - id of Object
 * @param reviewData - Data about Object
 */
export interface ReviewProps {
    key: string;
    reviewData: ReviewRequest;
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


/**
 * @class
 * @ignore
 * @param {{}} props
 */
function OneReviewRequest(props: ReviewProps) {
    const { reviewData } = props;
    const Completionist = () => <span>expired</span>;
    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ fitstQuestion, setFitstQuestion ] = useState(NaN);
    const [ fitstQuestionError, setFitstQuestionError ] = useState(false);
    const [ secondQuestion, setSecondQuestion ] = useState(NaN);
    const [ secondQuestionError, setSecondQuestionError ] = useState(false);
    const [ remarks, setRemarks ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const validation = useRef(true);

    const closeSuccessModal = () => {
        setIsSuccess(false);
    }

    const answerFirstQuestion = (state: any) => {
        setFitstQuestion(state);
        setFitstQuestionError(false);
    }

    const answerSecondQuestion = (state: any) => {
        setSecondQuestion(state);
        setSecondQuestionError(false);
    }

    const inputHandler = (inputObject: any) => {
        setRemarks(inputObject.target.value);
    };

    const sendReview = () => {
        if (isLoading){
            return
        } else {
            setIsLoading(true);
            validation.current = true;
            if (Object.is(fitstQuestion, NaN)) {
                setFitstQuestionError(true);
                validation.current = false;
            } else {
                setFitstQuestionError(false);
            }
            if (Object.is(secondQuestion, NaN)) {
                setSecondQuestionError(true);
                validation.current = false;
            } else {
                setSecondQuestionError(false);
            }
            
            if ( validation.current == false ){
                setIsLoading(false);
                return
            }
            else {
                let answer = false;
                if ( Object.is(fitstQuestion, true) && Object.is(secondQuestion, true)) {
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
        <div className={styles.row}>
            <p className={styles.requestName}>{reviewData.coin.name} on {reviewData.market.platform}</p>
            <Countdown className={styles.countdown} date={reviewData.time_left}>
                <Completionist />
            </Countdown>
            <p className={styles.coinMarketsColumn + " " + styles.oneMarket_updateNowButton} onClick={handleOpen}>Update now</p>

        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition>
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" className={styles.dashboard_modal_title_first} variant="h2" component="h2">
                        Review this Contribution
                    </Typography>
                    <Typography id="transition-modal-title" className={styles.dashboard_modal_title_second_span} variant="h3" component="h2">
                        Remaining Time:  
                        <Countdown className={styles.countdown} date={reviewData.time_left}>
                            <Completionist />
                        </Countdown>
                    </Typography>
                    <Typography id="transition-modal-title" className={styles.dashboard_modal_title_second_span} variant="h3" component="h2">
                        Reputation Risk/Reward: <span className={styles.countdown}>-3/+1</span>
                    </Typography>
                    <Typography id="transition-modal-title" className={styles.dashboard_modal_title_second_span} variant="h3" component="h2">
                        $HUGS to be earned for correct review: <span className={styles.countdown}>2 $HUGS</span>
                    </Typography>
                    <Container className={styles.dashboard_modal_main_container_info}>
                        <Typography id="transition-modal-main" className={styles.dashboard_modal_main} variant="h3" component="h2">
                            {reviewData.coin.name} on {reviewData.market.platform} an APY of {reviewData.contribution.apy}%
                        </Typography>
                        <span className={styles.dashboard_modal_main_second_info}>Check it on:<a rel="noreferrer" target="_blank" href={reviewData.market.link}> {reviewData.market.platform}</a></span>
                    </Container>
                    <Container className={styles.dashboard_modal_main_container}>
                        {reviewData.contribution.contribution_type === 1 ? <h1>{reviewData.market.platform} exist?</h1> : 
                         reviewData.contribution.contribution_type === 2 ? <h1>{reviewData.coin.name} - {reviewData.coin.abbreviature} exist?</h1> : 
                         <h1>Is {reviewData.coin.name} on {reviewData.market.platform}?</h1>}
                        <Button className={styles.dasboard_modal_accept_btn} onClick={() => answerFirstQuestion(true)}>Yes</Button>
                        <Button className={styles.dasboard_modal_reject_btn} onClick={() => answerFirstQuestion(false)}>No</Button>
                    </Container>
                    { fitstQuestionError && 
                        <Container className={styles.dashboard_modal_main_container_error}>
                            <p>Choose one</p> 
                        </Container>
                    }
                    <Container className={styles.dashboard_modal_main_container}>
                        {reviewData.contribution.contribution_type === 1 ? <h1>{reviewData.market.platform} on:<a rel="noreferrer" target="_blank" className={styles.contribution_link} href={reviewData.market.link}> {reviewData.market.platform}</a>?</h1> : 
                         reviewData.contribution.contribution_type === 2 ? <h1>{reviewData.coin.name} market cup is {reviewData.coin.market_cup}$ and price by one is {reviewData.coin.price}$?</h1> : 
                         <h1>Is this APY of {reviewData.coin.name} currently at {reviewData.contribution.apy}%?</h1> }
                        <Button className={styles.dasboard_modal_accept_btn} onClick={() => answerSecondQuestion(true)}>Yes</Button> 
                        <Button className={styles.dasboard_modal_reject_btn} onClick={() => answerSecondQuestion(false)}>No</Button>
                    </Container>
                    { secondQuestionError && 
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
        </div>
    );
}

export default OneReviewRequest;
