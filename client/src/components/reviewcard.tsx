import { Box, Typography, TextField, Button, Grid, Rating, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Review from "../models/Reviews";
import Tour from "../models/Tours";
import Repo from '../repositories';
import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from "../context/AuthContext";
import Avatar from "./avatar";
import StarRating from "./star";
import Reviewdata from "../models/Reviewdata";

const styles = {
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '8px',
    },
  };

interface Prop {
    tour: Tour;
}

function ReviewCard(props: Prop) {
    const { user } = useAuthContext()
    const [review, setReview] = useState<Tour>();
    const [rating, setRating] = useState(0);
    const reviewRef = useRef<HTMLInputElement>(null)
    const tour_id = props.tour.id.toString();
    const user_id = (user?.id) ? user.id.toString() : '0'

    const fetchReview = async () => {
        if (props) {
            const Tours = await Repo.TourRepo.getReview(tour_id);
            if (Tours) {
                setReview(Tours)
                console.log(review)
            }
        }
    }
    const newReview: Reviewdata = {
        data: {
            rating: rating,
            comment: reviewRef.current?.value,
            tour: {
                id: tour_id
            },
            author: {
                id: user_id
            }
        }
    }
    const createReview = async () => {
        if (!user) {
            alert('Please log in to submit a review.');
        } else {
            await Repo.ReviewRepo.createReview(newReview)
            fetchReview();
        }
    }

    const deleteReview = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            await Repo.ReviewRepo.deleteReview(id);
            fetchReview();
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createReview()
        fetchReview();
    };

    useEffect(() => {
        fetchReview();
    }, []);



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
            <Box sx={{ mt: 2, overflowY:"scroll",height:"200px", paddingRight: '20px',...styles}}>
                {Array.isArray(review?.attributes?.reviews?.data) &&
                    review?.attributes.reviews.data.map((data, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                mb: 2,
                                padding: '10px',
                                borderRadius: '15px',
                                backgroundColor: '#E0E0E0',
                                overflow: 'hidden',
                               
                            }}
                        >
                            <Avatar ID={data?.attributes?.author?.data?.id} />
                            <Box sx={{ ml: 2, flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {data?.attributes?.author?.data?.attributes?.username}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {data?.attributes?.comment}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <StarRating rating={data?.attributes.rating} />
                                </Typography>
                            </Box>
                            {(data?.attributes?.author?.data?.id === user?.id) && (
                                <IconButton onClick={() => deleteReview(data?.id.toString())}>
                                    <Delete />
                                </IconButton>
                            )}
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
                        <TextField label="Enter your review" fullWidth inputRef={reviewRef} />
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