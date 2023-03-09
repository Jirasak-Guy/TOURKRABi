import { Box, Typography, Button, List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import Tour from "../models/Tours";
import conf from "../config/conf";
import './AcceptBookingPopup.css';
import { BEARER } from "../constant";
import { getToken } from "../helpers";

interface Props {
    onClose: () => void;
    data: Tour;
}

function AcceptBookingPopup(props: Props) {
    const [bookingroom, setbookingroom] = useState('กรุณาเลือกห้องพัก');
    const [PKGprice, setPKGprice] = useState(0);
    const [selectRoom, setselectRoom] = useState(false);
    const { data, onClose } = props;

    const handleSelectClick = () => {
        setselectRoom(!selectRoom);
    };

    const handleBooking = async () => {
        try {
            const token = getToken();
            if (token) {
                const UserData = token.split('.');
                const User = JSON.parse(atob(UserData[1]));
                if (User.id && data.id) {
                    if (PKGprice || data?.attributes.price_onedaytrip) {
                        const Tourdata = [data.id]
                        const UserID = [User.id]
                        const Price = (data.attributes.tour_type === "onedaytrip") ? data.attributes.price_onedaytrip?.price : PKGprice
                        const reservations = await fetch(`${conf.apiPrefix}/api/reservations/`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${BEARER} ${token}`
                            },
                            body: JSON.stringify({
                                data: {
                                    total_price: Price,
                                    payment_status: false,
                                    tour: {
                                        set: Tourdata
                                    },
                                    user: {
                                        set: UserID
                                    }
                                }
                            })
                        })
                        onClose()
                    }
                }
            }
        } catch {
            console.log(Error)
        }
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
            }}>
            <div className='popup-overlay' onClick={onClose} />
            <div className='popup-container'>
                <Box>
                    <Typography variant="h3" textAlign={'center'}>
                        {`ต้องการจองทัวร์`}
                    </Typography>
                    <Box height={'15px'} />
                    <Typography variant="h3" textAlign={'center'}>
                        {`" ${data.attributes.tour_name} "`}
                    </Typography>
                    <Box height={'15px'} />
                    <Typography variant="h3" textAlign={'center'}>
                        {(data.attributes.tour_type === 'onedaytrip') ?
                            <div>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        position: 'fixed',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%,-50%)',
                                    }}>
                                    {`ราคา ${data.attributes.price_onedaytrip?.price} บาท`}
                                </Typography>
                            </div>
                            :
                            <div>
                                <List
                                    sx={{
                                        position: 'fixed',
                                        top: '45%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '75%',
                                        borderRadius: '10px',
                                        bgcolor: 'rgba(0,0,0,0.1)',
                                        fontSize: '100%',
                                    }}
                                >
                                    <ListItemButton onClick={handleSelectClick}>
                                        <ListItemText
                                            sx={{
                                                textAlign: 'center',
                                            }}
                                            primary={`${bookingroom}`}
                                        />
                                        {(PKGprice != 0) &&
                                            <ListItemText
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                                primary={`${(PKGprice === 0) ? 'ราคา' : `${PKGprice}   บาท`}`}
                                            />
                                        }
                                        {selectRoom ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    {Array.isArray(data?.attributes.price_package) &&
                                        data?.attributes.price_package.map((price) => (
                                            <Collapse in={selectRoom} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItemButton
                                                        disabled={bookingroom === price.room_class_hotel}
                                                        onClick={() => {
                                                            setbookingroom(price.room_class_hotel);
                                                            setPKGprice(price.price)
                                                            handleSelectClick();
                                                        }}
                                                        sx={{
                                                            boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.5)',
                                                        }}
                                                    >
                                                        <ListItemText
                                                            sx={{
                                                                textAlign: 'center',
                                                            }}
                                                            primary={`${price.room_class_hotel}`}
                                                        />
                                                        <ListItemText
                                                            sx={{
                                                                textAlign: 'center',
                                                            }}
                                                            primary={`${price.price}  บาท`}
                                                        />
                                                    </ListItemButton>
                                                </List>
                                            </Collapse>
                                        ))
                                    }
                                </List>
                            </div>
                        }
                        {!selectRoom &&
                            <div>
                                <Box height={'13vh'} />
                                <Typography variant="h3" textAlign={'center'}>
                                    {`ใช่หรือไม่`}
                                </Typography>
                            </div>}
                    </Typography>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: '28%',
                            width: '75%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            onClick={handleBooking}
                            sx={{
                                backgroundColor: 'rgba(60,185,60,1)',
                                color: 'white',
                                height: '5vh',
                                width: '10vh',
                                fontSize: '3vh'
                            }}>
                            ตกลง
                        </Button>
                        <Box width={'12%'} />
                        <Button
                            onClick={onClose}
                            sx={{
                                backgroundColor: 'rgba(255,0,0,1)',
                                color: 'white',
                                height: '5vh',
                                width: '10vh',
                                fontSize: '3vh'
                            }}>
                            ยกเลิก
                        </Button>
                    </Box>
                </Box>
            </div>
        </Box>
    );
}

export default AcceptBookingPopup;