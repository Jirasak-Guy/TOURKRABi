import { Box, Typography } from '@mui/material';
import Reviews from "../models/Reviews";
import Repo from '../repositories';
import { useEffect, useState } from 'react';
import { Result } from 'antd';

function ReviewCard() {
    const [review, setReview] = useState<Reviews[]>([]);

    const fetchReview = async () => {
        const result = await Repo.ReviewRepo.getAll()
        if (result) {
            setReview(result);
        }
    }

    useEffect(() => {
        fetchReview()
    }, [])

    review.forEach(element => {
        console.log(element.attributes.author.data.attributes.username)
    });

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
                {review.map((review) => (
                    <Box key={review.id} sx={{
                        padding: '25px',
                        fontSize: '35px',
                        display: 'flex',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                        textAlign: 'justify',
                        maxWidth: '100%',
                        margin: 'auto',
                        borderRadius: "15px",
                    }}>
                        <Typography variant="h6">{review.attributes.author.data.attributes.username}</Typography>
                        <Typography variant="body1">{review.attributes.rating}</Typography>
                        <Typography variant="subtitle2">{review.attributes.comment}</Typography>
                    </Box>
                ))}
                {review.length === 0 && <Result status="404" title="No Reviews Found" />}
            </Box>
        </Box>
    )
}



export default ReviewCard;