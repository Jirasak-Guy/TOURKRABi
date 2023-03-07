import Appbar from "../components/myAppBar";
import { useAuthContext } from '../context/AuthContext';
import { API_URL } from '../constant';
import DataTable from "../components/reservationTable";

import "./Profile.css"

function Profilepage() {

    const { user } = useAuthContext()

    return (
        <div>
            <Appbar />
            <div className="Box">
                <div className="Profile-Card">
                    <img className="useravatar1" src={API_URL + user?.Avatar.url} alt="Not found" />
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
                    {user?.reservations.map((reservation) => {
                        return <DataTable userReservation={reservation} />;
                    })}
                </table>
            </div>
        </div>
    )
}

export default Profilepage;
