import { Box, Typography, TextField, Button, Grid, Rating } from '@mui/material';
import Review from "../models/Reviews";
import Tour from "../models/Tours";
import Repo from '../repositories';
import { useEffect, useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import Avatar from "./avatar";


interface Prop {
    tour: Tour;
}

function ReviewCard(props: Prop) {

    const [review, setReview] = useState<Tour>();
    const [rating, setRating] = useState(0);
    const id = props.tour.id.toString();
    const fetchReview = async () => {
        if (props) {
            const Tours = await Repo.TourRepo.getReview(id);
            if (Tours) {
                setReview(Tours)
            }
        }
    }
    useEffect(() => {
        fetchReview();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Rating:', rating);
    };

    return (
        <Box sx={{
            padding: '25px',
            fontSize: '35px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            textAlign: 'justify',
            maxWidth: '90%',
            margin: 'auto',
            borderRadius: "15px",
        }}>
            <Box sx={{ mt: 2 }}>
                {Array.isArray(review?.attributes.reviews.data) &&
                    review?.attributes.reviews.data.map((data, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                mb: 2,
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                                padding: '10px',
                                borderRadius: '15px',
                            }}
                        >
                            <Avatar ID={data.attributes.author.data.id} />
                            <Box sx={{ ml: 2, flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {data.attributes.author.data.attributes.username}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {data.attributes.comment}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Rating: {data.attributes.rating}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
            </Box>

            <form onSubmit={handleSubmit}>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue as number);
                    }}
                    precision={1}
                />
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <TextField label="Enter your review" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </Grid>
                </Grid>
            </form>
            <form>

            </form>
        </Box>


    )
}



export default ReviewCard;