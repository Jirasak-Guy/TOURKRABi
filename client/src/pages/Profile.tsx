import Appbar from "../components/myAppBar";
import "./Profile.css"



function Profilepage() {
    return (
        <div>
            <Appbar></Appbar>
                <div className="Box">
                    <div className="Profile-Card">
                        <div className="username"></div>
                        <div className="email"></div>
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
