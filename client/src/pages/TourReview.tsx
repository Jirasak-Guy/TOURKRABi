import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, autocompleteClasses } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppBar from "../components/myAppBar";
import Repo from '../repositories';
import DetailHead from "../components/DetailHead";
import Tour from "../models/Tours";
import ReviewCard from "../components/reviewcard";
import './TourReview.css'
import AcceptBookingPopup from '../components/AcceptBookingPopup';
import ReactMarkdown from 'react-markdown';

function Tourreview() {
    const url = useParams()
    const id = url.id
    const [data, setData] = useState<Tour>();
    const [acceptBooking, setacceptBooking] = useState(false);
    const navigate = useNavigate();

    const fetchTourData = async () => {
        if (id) {
            const Tours = await Repo.TourRepo.get(id);
            if (Tours) {
                setData(Tours)
            } else {
                navigate('/')
            }
        }
    }

    const ismax = (data?.attributes?.current_participate ?? 0) >= (data?.attributes?.maximun_participate ?? 0) ? true : false

    useEffect(() => {
        fetchTourData();
    }, []);

    const handleBookingClick = () => {
        setacceptBooking(!acceptBooking);
    };

    return (
        <Box>
            <AppBar></AppBar>
            <Box>{(data != undefined) ?
                <DetailHead tourdata={data} />
                :
                <Box>
                    Error
                </Box>
            }
            </Box>

            <Box>
                <Typography className="detailhead"
                    sx={{
                        fontSize: '35px',
                        marginLeft: '2vw',
                        marginTop: '2.5vh',
                    }}
                >
                    รายละเอียด
                </Typography>
            </Box>
            <Box className="detail" display={'flex'} justifyContent={'center'}>
                <Typography
                    sx={{
                        textAlign: 'justify',
                        display:'inline-block',
                        displayPrint:'block',
                    }}>
                    {data?.attributes.tour_detial ?
                        <Box marginX={'2.5%'} width={'95%'}><ReactMarkdown>
                            {data.attributes.tour_detial}
                        </ReactMarkdown></Box>
                        :
                        <h1>No detail</h1>
                    }
                </Typography>
            </Box>
            <Box sx={{ marginBottom: '30px' }}>
                <Typography
                    className="detailhead"
                    sx={{
                        paddingLeft: '2.5vw',
                        paddingRight: '2.5vw',
                        fontSize: '35px',
                        marginTop: '3vh',
                        marginLeft: '2.5vw',
                    }}
                >
                    ราคา
                </Typography>
            </Box>
            <Box>
                <Typography>
                    {(data?.attributes.price_onedaytrip) ?
                        <Typography
                            className="price"
                            sx={{
                                fontSize: '35px',
                                marginLeft: '2.5vw',
                                marginRight: '2.5vw',
                            }}>{data?.attributes.price_onedaytrip.price} บาท </Typography>
                        :
                        <Box sx={{
                            padding: '5px',
                            display: 'flex',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
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
                <Typography className="detailhead"
                    sx={{
                        fontSize: '35px',
                        marginTop: '3.5vh',
                        marginLeft: '2.5vw',
                        paddingLeft: '2.5vw',
                        paddingRight: '2.5vw',
                        marginBottom: '2vh'
                    }}
                >รีวิว</Typography>
            </Box>
            <Box>{(data) ?
                < ReviewCard tour={data} />
                :
                <Box>
                    No Review
                </Box>
            }
            </Box>

            <Box
                sx={{
                    backgroundColor: ismax ? '#FF0000' : '#F0298A',
                    position: 'fixed',
                    bottom: '5%',
                    right: '2%',
                    borderRadius: '50px',
                    justifyItems: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}
            >
                <Button
                    disabled={ismax}
                    onClick={handleBookingClick}
                    sx={{
                        color: 'white',
                        fontSize: '20px',
                        borderRadius: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        margin: '5px'
                    }}
                >
                    {ismax ? 'เต็ม' : `จอง ${data?.attributes.current_participate}/${data?.attributes.maximun_participate}`}
                    <img src="../people.png" width={'30'} height={'30'} alt="not found" />
                </Button>
                {acceptBooking && data && <AcceptBookingPopup onClose={handleBookingClick} data={data} />}
            </Box>
        </Box >
    )

}

export default Tourreview;
