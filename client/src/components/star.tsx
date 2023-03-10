import { Star, StarBorder } from '@mui/icons-material';

interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<Star key={i} color="primary" />);
    } 
  }

  return <>{stars}</>;
}

export default StarRating