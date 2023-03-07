import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'; // add useState and useEffect imports
import AppBar from "../components/myAppBar";
import Repo from '../repositories';
import DetailHead from "../components/DetailHead";
import Tour from "../models/Tours";
import "../fonts/FCOrbitRounded.ttf"


function Tourreview() {
    const url = useParams()
    const id = url.id
    const [data, setData] = useState<Tour>();

    const fetchTourData = async () => {
        if (id) {
            const Tours = await Repo.TourRepo.get(id);
            if (Tours) {
                setData(Tours)
            }
        }

    }

    useEffect(() => {
        fetchTourData();
    }, []);

    return (
        <Box>
            <AppBar></AppBar>
            <DetailHead tourdata={data} />
            <Box>
                <Typography variant="body1" fontWeight="bold" sx={{
                    padding: '5px',
                    fontSize: '35px',
                    marginTop: '30px',
                    marginLeft: '10px',
                    border: 'none',
                    marginRight: '10px',
                    borderRadius: '10px',
                    display: 'inline-block',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                }}>รายละเอียด</Typography>
            </Box>
            <Box>
                <Typography variant="body1" sx={{
                    padding: '10px',
                    fontSize: '24px',
                    marginTop: '30px',
                    marginLeft: '10px',
                    border: 'none',
                    marginRight: '10px',
                    borderRadius: '10px',
                    display: 'inline-block',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    textAlign: 'justify',
                    fontWeight: "regular",
                }}>{data?.attributes.tour_detial}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: '30px' }}>
                <Typography variant="body1" sx={{
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    fontSize: '35px',
                    marginTop: '30px',
                    marginLeft: '10px',
                    border: 'none',
                    marginRight: '10px',
                    borderRadius: '10px',
                    display: 'inline-block',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    textAlign: 'justify',
                }}>ราคา
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1">
                    {(data?.attributes.price_onedaytrip) ?
                        <Typography variant="body1" sx={{
                            padding: '5px',
                            fontSize: '35px',
                            marginLeft: '10px',
                            marginRight: '10px',
                            border: 'none',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                            textAlign: 'justify',
                            display: 'inline-block',
                        }}>{data?.attributes.price_onedaytrip.price} บาท </Typography>
                        :
                        <Box sx={{
                            padding: '5px',
                            fontSize: '35px',
                            display: 'flex',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                            textAlign: 'justify',
                            maxWidth: '90%',
                            margin: 'auto',
                        }}>
                            <Table sx={{ maxWidth: '100%', borderCollapse: 'collapse' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid black', backgroundColor: 'lightgray', color: 'black' }}>
                                            <Typography variant="h6">ประเภทห้อง</Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: '1px solid black', backgroundColor: 'lightgray', color: 'black' }}>
                                            <Typography variant="h6">ราคา</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.isArray(data?.attributes.price_package) &&
                                        data?.attributes.price_package.map((price, index) => (
                                            <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'lightblue' } }}>
                                                <TableCell sx={{ border: '1px solid black', padding: 2 }}>
                                                    <Typography variant="body1">{price.room_class_hotel}</Typography>
                                                </TableCell>
                                                <TableCell sx={{ border: '1px solid black', padding: 2 }}>
                                                    <Typography variant="body1">{price.price}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    }

                </Typography>
            </Box>
            <Box>
                <Typography sx={{
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    fontSize: '35px',
                    marginTop: '30px',
                    marginLeft: '10px',
                    border: 'none',
                    marginRight: '10px',
                    borderRadius: '10px',
                    display: 'inline-block',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    textAlign: 'justify',
                }}>รีวิว</Typography>
            </Box>
        </Box>
    )

}

export default Tourreview;
