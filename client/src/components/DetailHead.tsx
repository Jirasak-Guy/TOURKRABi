import { Box, Typography } from '@mui/material';
import Tour from "../models/Tours";

interface Prop {
    tourdata: Tour;
}
function DetailHead(props: Prop) {
    const tour = props.tourdata;
    if (tour) {
        const img = `http://localhost:1338${tour.attributes.tour_image.data[0].attributes.url}`
        const containerStyle = {
            width: "100%",
            height: "36rem",
            position: "relative",
            alignItems: "center",
            flexDirection: "column",
            backgroundSize: "cover",
            backgroundImage: `url(${img})`,
            justifyContent: "flex-end",
            backgroundPosition: "center",
            display: "flex",
        };

        const textStyle = {
            color: "white",
            marginBottom: "60px",
            textDecoration: "underline",
            fontSize: 'clamp(40px, 5vw, 80px)',
        }
        return (
            <Box sx={containerStyle}>
                <Typography variant="body1" sx={textStyle}>{tour.attributes.tour_name}</Typography>
            </Box>
        )
    } else {
        return (
            <Box>
                Error
            </Box>
        )
    }
}


export default DetailHead;