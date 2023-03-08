import { Box, Typography } from '@mui/material';
import Review from "../models/Reviews";
import Repo from '../repositories';
import { useEffect, useState } from 'react';


interface Prop {
    id: string;
}

function ReviewCard(props: Prop) {

    const [review, setReview] = useState<Review>();

    const fetchReview = async () => {
        if (props) {
            const Tours = await Repo.ReviewRepo.get(props.id);
            if (Tours) {
                setReview(Tours)
            }
        }
    }
    useEffect(() => {
        fetchReview();
    }, []);

    return (
        <Box sx={{
            padding: '25px',
            fontSize: '35px',
            display: 'flex',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            textAlign: 'justify',
            maxWidth: '90%',
            margin: 'auto',
            borderRadius: "15px",
        }}>
            <Box>
                {Array.isArray(review?.attributes.reviews.data) &&
                    review?.attributes.reviews.data.map((data) => (
                        <Box>
                            <Typography>{data.attributes.author.data.attributes.username}</Typography>
                            <Typography>{data.attributes.comment}</Typography>
                            <Typography>{data.attributes.rating}</Typography>
                        </Box>
                    ))}
                <Box>
                    
                </Box>
            </Box>


        </Box >
    )
}



export default ReviewCard;