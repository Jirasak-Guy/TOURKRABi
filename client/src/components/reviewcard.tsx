import { Box, Typography } from '@mui/material';
import Reviews from "../models/Reviews";
import Repo from '../repositories';
import { useEffect, useState } from 'react'; 
import { Result } from 'antd';

function ReviewCard() {
    const [review, setReview] = useState<Reviews[]>([]);

    const fetchReview= async () => {
        const result = await Repo.ReviewRepo.getAll()
        if (result){
            setReview(result);
        }
    }

    useEffect(() => {
        fetchReview()
      }, [])
    return (
        <Box>
        {review.map((review) => (
            <div key={review.id}>
                <Typography variant="h6">{review.id}</Typography>
                <Typography variant="body1">{review.attributes.rating}</Typography>
                <Typography variant="subtitle2">{review.attributes.comment}</Typography>
            </div>
        ))}
        {review.length === 0 && <Result status="404" title="No Reviews Found" />}
    </Box>
        )
}



export default ReviewCard;