import { useEffect, useState, ChangeEvent } from 'react';
import { useLocation } from "react-router-dom";
import { Box, Grid, TextField, InputAdornment } from "@mui/material";
import { Search } from '@mui/icons-material';

import Repo from '../repositories';
import Appbar from "../components/myAppBar";
import Card from "../components/ToursCard";
import Tour from "../models/Tours";

interface filter {
    keyword?: string
}

function Tourspages() {
    const [Tours, setTours] = useState<Tour[]>([])
    const [searchFilter, setSearchFilter] = useState('')
    const location = useLocation();
    const thispath = location.pathname.split('/')[1]

    const onUpdateTour = (Tours: Tour) => {
        setTours(prevTours =>
            prevTours.map(item => item.id === Tours.id ? Tours : item))
    }

    const fetchTour = async () => {
        const filter: filter = {
            keyword: searchFilter
        }
        const result = await Repo.TourRepo.getAll(filter)
        if (result) {
            setTours(result)
        }
    }

    const handleChangeSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(event.target.value)
    }

    const filteredTrips = Tours.filter((trip) => {
        const tourType = trip.attributes.tour_type.toLowerCase()
        const tourName = trip.attributes.tour_name.toLowerCase()
        const search = searchFilter.toLowerCase()
        const type = (thispath === "packagetrip") ? "package" : "onedaytrip"
        return tourName.includes(search) && tourType.includes(type)
    });

    const imgpath = (`../${thispath}.png`)

    useEffect(() => {
        fetchTour()
    }, [searchFilter])

    return (
        <div>
            <Appbar></Appbar>
            <Box>
                <img src={imgpath} width="100%" />
            </Box>
            <TextField
                style={{ margin: '0.75% 0% 0% 1.5% ' }}
                label="Search"
                variant='outlined'
                value={searchFilter}
                onChange={handleChangeSearchFilter}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search fontSize="large" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    maxWidth: '97%',
                    width: '500px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderRadius: '50px'
                        }
                    },
                }}
            />
            <Box maxWidth={'95%'}
                style={{
                    margin: '1% auto',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 1, sm: 2, md: 8, lg: 9, xl: 8 }}
                >
                    {filteredTrips.map((Tours, index) => (
                        <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
                            <Card tour={Tours} onUpdateTour={onUpdateTour} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default Tourspages;