import Appbar from "../components/myAppBar";
import "./Profile.css"



function Profilepage() {
    return (
        <div>
            <Appbar></Appbar>
                <div className="Box">
                    <div className="Profile-Card">
                        <div className="avatar1">
                            <img className="useravatar1" src="useravatar.png" alt="" />
                        </div>
                        <div className="infobox">
                            <div className="infobox1">
                                <h2>ชื่อผู้ใช้ :</h2>
                                <div className="infobox2">
                                    <h2>อีเมล :</h2>
                                </div>
                            </div>
                        </div>
                        <div className="info">
                            <div className="username"></div>
                            <div className="email"></div>
                        </div>
                        <div className="touricon">
                            <img className="touricon1" src="touricon.png" alt="" />
                        </div>
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
