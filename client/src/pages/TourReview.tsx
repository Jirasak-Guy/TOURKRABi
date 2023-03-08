import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, autocompleteClasses } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppBar from "../components/myAppBar";
import Repo from '../repositories';
import DetailHead from "../components/DetailHead";
import Tour from "../models/Tours";
import ReviewCard from "../components/reviewcard";
import './TourReview.css'


function Tourreview() {
    const url = useParams()
    const id = url.id
    const [data, setData] = useState<Tour>();
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

    return (
        <Box>
            <AppBar></AppBar>
            <Box>{(data != undefined)?
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
                        marginLeft: '15px',
                        marginTop: '30px',
                        marginRight: '10px',
                    }}
                >
                    รายละเอียด
                </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
                <Typography
                    className="detail"
                    sx={{
                        fontSize: '24px',
                        marginTop: '30px',
                        textAlign: 'justify',
                    }}>{data?.attributes.tour_detial}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: '30px' }}>
                <Typography
                    className="detailhead"
                    sx={{
                        paddingLeft: '50px',
                        paddingRight: '50px',
                        fontSize: '35px',
                        marginTop: '30px',
                        marginLeft: '15px',
                    }}
                >
                    ราคา
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1">
                    {(data?.attributes.price_onedaytrip) ?
                        <Typography
                            className="price"
                            sx={{
                                fontSize: '35px',
                                marginLeft: '3%',
                                marginRight: '10px',
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
                <Typography className="detailhead"
                    sx={{
                        fontSize: '35px',
                        marginTop: '30px',
                        marginLeft: '15px',
                        paddingLeft: '50px',
                        paddingRight: '50px',
                        marginBottom:'30px'
                    }}
                >รีวิว</Typography>
            </Box>
            <Box>{(data)?
                <ReviewCard tour= {data} />
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
            </Box>
        </Box >
    )

}

export default Tourreview;
