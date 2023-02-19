import { Box } from "@mui/material";
import AppBar from "../components/myAppBar";
import { useEffect ,useState } from 'react';
import ODT from '../models/ODT';
import Repo from '../repositories'

function  OnDaTr() {
    const [ODT, setODT] = useState<ODT[]>([])

    const fetchODT = async () => {
        const result = await Repo.userResult.getAll()
        if(result){
          setODT(result)
        }
      }

    useEffect(() => {
    fetchODT()
    })

    return (
        <Box>
            <AppBar></AppBar>
            <Box>
            <img src="OneDayTrip.png" width={"100%"}/>
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
