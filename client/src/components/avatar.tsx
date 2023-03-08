import { Box, Typography, TextField, Button, Grid, Rating, CardMedia } from '@mui/material';
import UserData from "../models/User";
import Repo from '../repositories';
import { useEffect, useState } from 'react';


interface Item {
    ID: number;
}

function Avatar(props: Item) {
    const [avatar, setAvatar] = useState<UserData>()
    
    const userID = props.ID.toString()
    const fetchAvatar = async () => {
        const result = await Repo.UserRepo.get(userID);
        if (result) {
            setAvatar(result)
        }
    }
    const img = `http://localhost:1338${avatar?.Avatar.url}`
    useEffect(() => {
        fetchAvatar();
    }, []);
    return (
        <Box>
            <CardMedia
                component="img"
                alt={img}
                height="300"
                image={img}
            />
        </Box>
    )
}

export default Avatar