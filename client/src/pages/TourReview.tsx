import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import AppBar from "../components/myAppBar";

function  Tourreview() {
    const id = useParams();

    return (
        <Box>
            <AppBar></AppBar>
            <h1>Tour Review</h1>
            <p>id: {id.id}</p>
        </Box>
    )
}

export default Tourreview;
