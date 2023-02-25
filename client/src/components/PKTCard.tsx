import * as React from 'react';
import Card from '@mui/material/Card';
import { CardActions, Typography, Button, CardMedia, CardContent, CardActionArea } from '@mui/material';
import PKT from '../models/PKT';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import '../App.css'

interface Prop {
    packageTrip: PKT;
    onUpdatepackageTrip: (pkt: PKT) => void;
}

function PKTCard(props: Prop) {
    const navigate = useNavigate();
    const packageTrip = props.packageTrip;

    const maxbooking = (packageTrip.attributes.current_reserve >= packageTrip.attributes.max_reserve) ? true : false
    const img = `http://localhost:1338${packageTrip.attributes.image.data[0].attributes.url}`

    return (
        <Box>
            <Card>
                <CardActionArea onClick={() => navigate(`/packagetrip/${packageTrip.id}`)}>
                    <CardMedia
                        component="img"
                        alt={img}
                        height="300"
                        image={img}
                    />
                    <CardContent>
                        <Box textAlign={'center'}>
                            <Typography gutterBottom variant="h4" component="div">
                                {packageTrip.attributes.tourname}
                            </Typography>
                            <Typography variant="h5" className='textpricecolor'>
                                THB {packageTrip.attributes.price}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'center' }}>
                    {maxbooking ?
                        <Box sx={{ backgroundColor: '#FF0000', borderRadius: '50px' }}>
                            <Button sx={{ color: 'white', fontSize: '20px', borderRadius: '30px' }}>
                                <Box sx={{ backgroundColor: '#FF0000', height: '20px', width: '30px', }} />
                                เต็ม
                                <Box sx={{ backgroundColor: '#FF0000', height: '20px', width: '30px', }} />
                            </Button>
                        </Box>
                        :
                        <Box sx={{ backgroundColor: '#F0298A', borderRadius: '50px' }}>
                            <Button sx={{ color: 'white', fontSize: '20px', borderRadius: '30px' }}>
                                <Box sx={{ backgroundColor: '#F0298A', height: '20px', width: '30px', }} />
                                จอง &nbsp;{packageTrip.attributes.current_reserve}/{packageTrip.attributes.max_reserve}&nbsp;
                                <img src='people.png' width={'30'} height={'30'} />
                            </Button>
                        </Box>}
                </CardActions>
            </Card>
        </Box>
    );
}

export default PKTCard;