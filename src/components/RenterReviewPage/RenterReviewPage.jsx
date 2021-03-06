import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { Button } from '@mui/material'
import { Grid } from '@material-ui/core'
function RenterReviewPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const reviewBooking = useSelector(store => store.renterBooking);
    console.log('review booking', reviewBooking)

    const confirming = (evt) => {
        evt.preventDefault();

        dispatch({
            type: "BOOKING_CONFIRM",
            payload: reviewBooking
        })
        history.push(`/thankyou/${params.id}`)
    }

    return (
        <>
            <Grid container spacing={4} direction='column' alignItems='center'>
                <h2>Review Reservation</h2>
                <img
                    src={reviewBooking.selectedItem.url[0]}
                    width="5000px"
                    height="400px"
                />
                <p>Title: {reviewBooking.selectedItem.title}</p>
                <p>Summary: {reviewBooking.selectedItem.summary}</p>
                <p>Detail: {reviewBooking.selectedItem.detail}</p>
                <p>Date/Time Selected: {moment(reviewBooking.date.toString()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p>Duration Booking: {reviewBooking.hoursBook === "All_Day" ? reviewBooking.hoursBook : `${reviewBooking.hoursBook} Hours`}</p>
                <Button onClick={confirming}>Confirm</Button>
            </Grid>
        </>
    )
}

export default RenterReviewPage;