import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { alpha } from '@material-ui/core/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import './BookableItemDetail.css';


function BookableItemDetail() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const selectedItem = useSelector(store => store.selectedBookableItem)
    console.log('bookItem', selectedItem)
    const user = useSelector(store => store.user)
    const [selectedDate, handleDateChange] = useState(new Date());

    const urls = selectedItem.url;
    console.log('urls is', urls);
    const [current, setCurrent] = useState(0);
    const length = urls?.length;

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }
    console.log(current);

   /*  if (Array.isArray(selectedItem.url) || urls.length <= 0){
        return null;
    } */

    const hours = [
        { label: "1", id: 1 },
        { label: "2", id: 2 },
        { label: "3", id: 3 },
        { label: "4", id: 4 },
        { label: "5", id: 5 },
        { label: "6", id: 6 },
        { label: "7", id: 7 },
        { label: "8", id: 8 },
        { label: "9", id: 9 },
        { label: "10", id: 10 },
        { label: "11", id: 11 },
        { label: "12", id: 12 },
        { label: "All_Day", id: "All_Day" },
    ]

    const [hoursBook, setHoursBook] = useState("");

    useEffect(() => {

        dispatch({
            type: "FETCH_SELECTED_BOOKABLE_ITEM",
            payload: params.id
        });
    }, [params.id]);

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
        <Grid container spacing={4} direction='column' alignItems='center'>
          <h2>Item Detail</h2>
        <Grid item>
            <section className="slider">
                <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/>
                <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/>
                {selectedItem.url?.map((photo, i) => {
                    return (
                        <div 
                            className={i === current ? 'slide active' : 'slide'}
                            key={i}
                        >
                            {i === current && (
                                <img
                                    className="image"
                                    key={i}
                                    src={photo}
                                    onClick={nextSlide}
                            />
                            )}
                        </div>
                    )

                    })}
            </section>
            </Grid>
                <Typography variant="h4">Title: {selectedItem.title}</Typography>
                <Typography variant="h6">Summary: {selectedItem.summary}</Typography>
                <Typography variant="h6">Detail: {selectedItem.detail}</Typography>
                <Typography variant="h6">Rate: ${selectedItem.rate}</Typography>
                <Grid item>
                    <h4>Click below to select date</h4>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                    </MuiPickersUtilsProvider>
                    <h4>Renting Hours</h4>
                    <Autocomplete
                        ListboxProps={{
                            style: {
                                position: "absolute",
                                top: 10,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                height: 300,
                                width: "100%",
                                overflowY: "auto",
                                backgroundColor: "white",
                            },
                        }}
                        options={hours}
                        // sx={{ width: 350 }}
                        value={hours.id}
                        fontSize="20px"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Hours"
                            />
                        )}
                        onChange={(event, newValue) => setHoursBook(newValue.id)}
                    />
                </Grid>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={(evt) => bookingNow(evt)}
                >
                    Book Now
                </Button>

            </Grid>
        </>
    )
}

export default BookableItemDetail;