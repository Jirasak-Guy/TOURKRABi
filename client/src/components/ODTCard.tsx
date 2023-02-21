import * as React from 'react';
import Card from '@mui/material/Card';
import {CardActions, Typography, Button, CardMedia, CardContent, CardActionArea, CardHeader } from '@mui/material';
import ODT from '../models/ODT';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import '../App.css'

interface Prop {
    onedaytrip: ODT;
    onUpdateOnedaytrip: (odt: ODT) => void;
    }

function ODTCard(props: Prop) {
    const navigate = useNavigate();
    const onedaytrip = props.onedaytrip;

    const maxbooking = (onedaytrip.customer >= onedaytrip.maxcustomer) ? true : false

    return (
        <Box>
            <Card>
                <CardActionArea onClick={()=>navigate(`/onedaytrip/${onedaytrip.id}`)}>
                    <CardMedia
                        component="img"
                        alt={onedaytrip.picture}
                        height="300"
                        image={onedaytrip.picture}
                    />
                    <CardContent>
                        <Box textAlign={'center'}>
                            <Typography gutterBottom variant="h4" component="div">
                            {onedaytrip.tourname}
                            </Typography>
                            <Typography variant="h5" className='textpricecolor'>
                            THB {onedaytrip.price} 
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{justifyContent:'center'}}>
                    {maxbooking ? 
                    <Box sx={{ backgroundColor:'#FF0000',borderRadius:'50px' }}>
                        <Button sx={{color:'white', fontSize:'20px', borderRadius:'30px'}}>
                            <Box sx={{backgroundColor: '#FF0000', height: '20px', width: '30px', }}/>
                            เต็ม
                            <Box sx={{backgroundColor: '#FF0000', height: '20px', width: '30px', }}/>
                        </Button>
                    </Box>
                    :
                    <Box sx={{ backgroundColor:'#F0298A',borderRadius:'50px' }}>
                        <Button sx={{color:'white', fontSize:'20px', borderRadius:'30px'}}>
                            <Box sx={{backgroundColor: '#F0298A', height: '20px', width: '30px', }}/>
                            จอง &nbsp;{onedaytrip.customer}/{onedaytrip.maxcustomer}&nbsp;
                            <img src='people.png' width={'30'} height={'30'} />
                        </Button>
                    </Box>}
                </CardActions>
            </Card>
        </Box>
    );
}

export default ODTCard;