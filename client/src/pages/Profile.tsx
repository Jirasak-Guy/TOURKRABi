import { useState, useEffect } from 'react';
import Appbar from "../components/myAppBar";
import Avatar from '@mui/material/Avatar';
import { useAuthContext } from '../context/AuthContext';
import { API, API_URL } from '../constant';
import { getToken } from '../helpers';

import "./Profile.css"

function Profilepage() {

    const [avatar, setAvatar] = useState<string>()
    const { user } = useAuthContext()

    const fetchProfiles = async () => {
        try {
            const response = await fetch(`${API}/users/me?populate[Avatar][fields][0]=url`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                }
            })
            const data = await response.json();
            setAvatar(API_URL + data.Avatar.url)
        } catch (error: any) {
            setAvatar("https://static.thenounproject.com/png/363633-200.png")
        }
    };

    useEffect(() => {
        if (user) {
            fetchProfiles();
        }
    }, [user]);

    return (
        <div>
            <Appbar />
            <div className="Box">
                <div className="Profile-Card">
                    <img className="useravatar1" src={avatar} alt="Not found" />
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
                    <tr>
                        <th>ชื่อโปรแกรม</th>
                        <th>จำนวน</th>
                        <th>วันที่จอง</th>
                        <th>ราคา</th>
                        <th>สถานะการจอง</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Profilepage;
