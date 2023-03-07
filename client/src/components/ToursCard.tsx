import { Card } from "@mui/material";
import { Box, CardActions, Typography, Button, CardMedia, CardContent, CardActionArea, CardHeader } from '@mui/material';
import Tour from "../models/Tours";
import { useNavigate } from "react-router-dom";

interface Prop {
    tour: Tour;
    onUpdateTour: (tour: Tour) => void;
}

function TourCard(props: Prop) {
    const navigate = useNavigate();
    const tour = props.tour;

    const img = `http://localhost:1338${tour.attributes.tour_image.data[0].attributes.url}`
    const maxbooking = (tour.attributes.current_participate >= tour.attributes.maximun_participate) ? true : false

    return (
        <Box>
            <Card>
                <CardActionArea onClick={() => navigate(`/tour/${tour.id}`)}>
                    <CardMedia
                        component="img"
                        alt={img}
                        height="300"
                        image={img}
                    />
                    <CardContent>
                        <Box
                            textAlign={'center'}
                            sx={{
                                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                            }}
                        >
                            <Typography variant="h4">
                                {tour.attributes.tour_name}
                            </Typography>
                            <Typography variant="h5" color={'#FF5E1F'}>
                                {(tour.attributes.price_onedaytrip) ?
                                    <div>
                                        THB {tour.attributes.price_onedaytrip.price}
                                    </div>
                                    :
                                    <div>
                                        {(tour.attributes.price_package != undefined) &&
                                            <div>
                                                {(tour.attributes.price_package[0]) &&
                                                    <div>
                                                        THB {tour.attributes.price_package[0].price}
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Box
                        sx={{
                            backgroundColor: maxbooking ? '#FF0000' : '#F0298A',
                            borderRadius: '50px',
                            justifyItems: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Button
                            sx={{
                                color: 'white',
                                fontSize: '20px',
                                borderRadius: '30px',
                                display: 'flex',
                                justifyContent: 'center',
                                justifyItems: 'center',
                                margin: '5px'
                            }}
                        >
                            {maxbooking ? 'เต็ม' : `จอง ${tour?.attributes.current_participate}/${tour?.attributes.maximun_participate}`}
                            <img src="../people.png" width={'30'} height={'30'} />
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}

export default TourCard;