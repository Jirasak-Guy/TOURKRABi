import Appbar from "../components/myAppBar";
import { useAuthContext } from '../context/AuthContext';
import conf from "../config/conf";
import DataTable from "../components/reservationTable";
import { useState, useEffect } from "react";
import reservation from "../models/Reservation";
import repositories from "../repositories";

import "./Profile.css"

function Profilepage() {

    const { user } = useAuthContext()
    const [reservations, setReservations] = useState<reservation[]>();

    const fetchReservations = async () => {
        const response = await repositories.ReserveRepo.getAll()
        if (response) {
            setReservations(response);
        }
    }

    useEffect(() => {
        fetchReservations();
    }, [])

    return (
        <div>
            <Appbar />
            <div className="Box">
                <div className="Profile-Card">
                    <img className="useravatar1" src={conf.apiPrefix + user?.Avatar.url} alt="Not found" />
                    <div className="info-container">
                        <div className="username-box">
                            <label>ชื่อผู้ใช้ :</label>
                            <div className="box-info">
                                <h4>{user?.username}</h4>
                            </div>
                        </div>
                        <div className="email-box">
                            <label>อีเมล :</label>
                            <div className="box-info">
                                <h4>{user?.email}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="touricon" />
                </div>
                <div className="History-Booking">
                    <h1>ประวัติการจอง</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ชื่อโปรแกรม</th>
                            <th>จำนวนผู้จอง</th>
                            <th>วันที่จอง</th>
                            <th>ราคา</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    {reservations !== undefined &&
                        reservations.map((data) => {
                            if (data?.attributes?.user?.data?.id === user?.id) {
                                return <DataTable userRevserv={data} />
                            } return null;
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default Profilepage;
