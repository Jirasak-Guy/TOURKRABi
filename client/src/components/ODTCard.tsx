import * as React from 'react';
import Card from '@mui/material/Card';
import {CardActions, Typography, Button, CardMedia, CardContent, CardActionArea, CardHeader } from '@mui/material';
import ODT from '../models/ODT';
import { Box } from '@mui/system';
import '../App.css'

interface Prop {
    onedaytrip: ODT;
    onUpdateOnedaytrip: (odt: ODT) => void;
    }

function ODTCard(props: Prop) {
    const onedaytrip = props.onedaytrip;

    return (
        <Box>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={onedaytrip.picture}
                        height="150"
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
                    <Box sx={{ backgroundColor:'#F0298A',borderRadius:'50px' }}>
                        <Button sx={{color: 'white'}}> จอง </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}

export default ODTCard;