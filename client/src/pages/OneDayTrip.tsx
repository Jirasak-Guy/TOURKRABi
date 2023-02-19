import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from '@mui/icons-material';
import AppBar from "../components/myAppBar";
import { useEffect ,useState, ChangeEvent } from 'react';
import ODT from '../models/ODT';
import Repo from '../repositories'
import '../App.css'


function  OnDaTr() {
  const [ODT, setODT] = useState<ODT[]>([])
  const [searchFilter, setSearchFilter] = useState('')


  const fetchODT = async () => {
    const result = await Repo.userResult.getAll()
    if(result){
      setODT(result)
    }
  }

  const handleChangeSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value)
  }

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
        <h1>Test</h1>
        {ODT.map(ODT => (
          <div key={ODT.id}>
            <p>ID : {ODT.id}</p>
            <p>Tourname : {ODT.tourname}</p>
            <p>Price : {ODT.price}</p>
            <p>picture : {ODT.picture}</p>
             <img src={ODT.picture} width={100}></img>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default OnDaTr;
