import { Box, Typography, TextField, Button, Grid, Rating, CardMedia } from '@mui/material';
import UserData from "../models/User";
import Repo from '../repositories';
import { useEffect, useState } from 'react';
import conf from "../config/conf";



interface Item {
    ID: number;
}

function Avatar(props: Item) {
    const [avatar, setAvatar] = useState<UserData>()

    const userID = props?.ID?.toString()
    const fetchAvatar = async () => {
        const result = await Repo.UserRepo.get(userID);
        if (result) {
            setAvatar(result)
        }
    }
    const img = (avatar?.Avatar !== null) ? `${conf.apiPrefix}${avatar?.Avatar?.url}` : `${conf.apiPrefix}/uploads/3135715_f5b429867d.png?updated_at=2023-03-09T20:47:59.189Z`;
    useEffect(() => {
        fetchAvatar();
    }, []);
    return (
        <Box sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            marginBottom: 'auto',
            marginTop: 'auto',
        }}>
            <CardMedia
                component="img"
                alt={img}
                height="300"
                image={img}

                sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                }}
            />
        </Box>
    )
}

export default Avatar