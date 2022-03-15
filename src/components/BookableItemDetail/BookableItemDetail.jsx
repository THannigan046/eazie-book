import { useEffect, useState } from 'react';
import { useHistory, useParams }  from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { alpha } from '@material-ui/core/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import moment from 'moment';



function BookableItemDetail () {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const selectedItem = useSelector(store => store.selectedBookableItem)
    console.log('bookItem', selectedItem)
    const user = useSelector(store => store.user)
    const [selectedDate, handleDateChange] = useState(new Date());



    // // Time Slots
    // const [timeSlots, setTimeSlots] = useState([]);
    // console.log('time slots', timeSlots)
    // const createTimeSlots = (fromTime, toTime) => {
    //     // alert(fromTime);
    //     let startTime = moment(fromTime, 'hh:mm A');
    //     let endTime = moment(toTime, 'hh:mm A');
    //     if (endTime.isBefore(startTime)) {
    //         endTime.add(1, 'day');
    //     }
    //     let arr = [];
    //     while (startTime <= endTime) {
    //         arr.push(new moment(startTime).format('hh:mm A'));
    //         startTime.add(30, 'minutes');
    //     }
    //     return arr;
    // }



    const hours = [
        {label: "1", id: 1},
        {label: "2", id: 2},
        {label: "3", id: 3},
        {label: "4", id: 4},
        {label: "5", id: 5},
        {label: "6", id: 6},
        {label: "7", id: 7},
        {label: "8", id: 8},
        {label: "9", id: 9},
        {label: "10", id: 10},
        {label: "11", id: 11},
        {label: "12", id: 12},
        {label: "All_Day", id: "All_Day"},
    ]

    const [checkoutTime, setCheckoutTime] = useState({
        startTime: "",
        endTime: "",
    })
    const [hoursBook, setHoursBook] = useState("");

    useEffect (() => {
        // setTimeSlots(createTimeSlots('8:00 AM', '08:00 PM'));

        dispatch({
            type: "FETCH_SELECTED_BOOKABLE_ITEM",
            payload: params.id
        });
    }, [params.id]);

    // const handleChange = (evt, property) => {
    //     setCheckoutTime({...checkoutTime, [property]: evt.target.value})
    // };

    const bookingNow = (evt) => {
        evt.preventDefault();

        dispatch({
            type: "REVIEWING_BOOKING",
            payload: {
                selectedItem,
                date: selectedDate,
                clientId: user.id,
                hoursBook
            }
        })
        history.push(`/renterReviewPage/${user.id}`)
    }


    return (
        <>
        <Grid>
        <h2>Item Details</h2>
        <img 
            src="https://www.amfam.com/-/media/images/amfam/products/boat/product-page-speed-and-power-boats---m.jpg"
            alt={selectedItem.title}
        />
        <Typography variant="h4">Title: {selectedItem.title}</Typography>
        <Typography variant="h6">Summary: {selectedItem.summary}</Typography>
        <Typography variant="h6">Detail: {selectedItem.detail}</Typography>
        <Typography variant="h6">Rate: {selectedItem.rate}</Typography>

        <h4>Select Date</h4>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* <DatePicker value={selectedDate} onChange={handleDateChange} /> */}
                <DateTimePicker value={selectedDate} onChange={handleDateChange} />
            </MuiPickersUtilsProvider>
        <h4>Renting Hours</h4>
        <Autocomplete
            options= {hours}
            sx={{ width: 350 }}
            value= {hours.id}
            renderInput={(params) => <TextField {...params} label="How Many Hours?" />}
            onChange={(event, newValue) => setHoursBook(newValue.id)}
            /> 
            <Button 
                type="submit"
                variant="outlined"
                color="primary"
                size="small"
                onClick={(evt) => bookingNow(evt)}
            >
                Book
            </Button>
        </Grid>
        </>
    )
}

export default BookableItemDetail;