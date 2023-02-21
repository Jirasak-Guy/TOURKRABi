import { Box, TextField, InputAdornment, Grid } from "@mui/material";
import { Search } from '@mui/icons-material';
import AppBar from "../components/myAppBar";
import { useEffect ,useState, ChangeEvent } from 'react';
import PKT from '../models/PKT';
import { PackageTripRepo, PKTFilter } from '../repositories/PackageTripRepo'
import '../App.css'

import ODTCard from '../components/ODTCard'

function  PackageTrip() {
  const [PackageTrip, setPackageTrip] = useState<PKT[]>([])
  const [searchFilter, setSearchFilter] = useState('')

  const onUpdatePackagetrip = (PackageTrip : PKT) => {
    setPackageTrip(prevPackageTrip => 
      prevPackageTrip.map(item => item.id === PackageTrip.id ? PackageTrip : item))}

  const fetchODT = async () => {
    const filter: PKTFilter = {
      keyword: searchFilter,
    };
    const repo = new PackageTripRepo();
    const result = await repo.getAll(filter);
    if (result) {
      setPackageTrip(result);
    }
  };

  const handleChangeSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value)
  }

  const filteredTrips = PackageTrip.filter(trip =>
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
      <Box 
      sx={{ '& > :not(style)': 
      { m: 2, ml:5 ,minWidth:'120px' ,width:'30%'},
      '@media(max-width:450px)':
        {'& > :not(style)': {
          width: '75%',
        }}
      }} 
      >
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
          columns={{ xs: 1, sm: 2, md: 12, lg: 12, xl: 6}}
        >
        {filteredTrips.map((ODT, index) => (
          <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
            <ODTCard onedaytrip={ODT} onUpdateOnedaytrip={onUpdatePackagetrip}/>
          </Grid>
        ))}
        </Grid>
      </div>
    </Box>
  );
};

export default PackageTrip;