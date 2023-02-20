import { Box, TextField, InputAdornment, Grid } from "@mui/material";
import { Search } from '@mui/icons-material';
import AppBar from "../components/myAppBar";
import { useEffect ,useState, ChangeEvent } from 'react';
import ODT from '../models/ODT';
import { OneDayTripRepo, ODTFilter } from '../repositories/OneDayTripRepo'
import '../App.css'

import ODTCard from '../components/ODTCard'

function  OneDayTrip() {
  const [OneDayTrip, setOneDayTrip] = useState<ODT[]>([])
  const [searchFilter, setSearchFilter] = useState('')

  const onUpdateOnedaytrip = (OneDayTrip: ODT) => {
    setOneDayTrip(prevOneDayTrip => 
      prevOneDayTrip.map(item => item.id === OneDayTrip.id ? OneDayTrip : item))}

  const fetchODT = async () => {
    const filter: ODTFilter = {
      keyword: searchFilter,
    };
    const repo = new OneDayTripRepo();
    const result = await repo.getAll(filter);
    if (result) {
      setOneDayTrip(result);
    }
  };

  const handleChangeSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value)
  }

  const filteredTrips = OneDayTrip.filter(trip =>
    trip.tourname.toLowerCase().includes(searchFilter.toLowerCase())
  );
  
  useEffect(() => {
    fetchODT()
  },[searchFilter])

  return (
    <Box>
      <AppBar></AppBar>
      <Box>
        <img src="OneDayTrip.png" width={"100%"}/>
      </Box>
      <Box sx={{ '& > :not(style)': { m: 2, ml:5 ,minWidth:'120px' ,width:'30%'} }} >
        <TextField 
        className='SearchFilter' 
        label="Search" 
        variant='outlined' 
        value={searchFilter} 
        onChange={handleChangeSearchFilter} 
        InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search fontSize="large"/>
          </InputAdornment>
        ),
        }}
      />
      </Box>
      <div>
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10}}
        >
        {filteredTrips.map((ODT, index) => (
          <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
            <ODTCard onedaytrip={ODT} onUpdateOnedaytrip={onUpdateOnedaytrip}/>
          </Grid>
        ))}
        </Grid>
      </div>
    </Box>
  );
};

export default OneDayTrip;
