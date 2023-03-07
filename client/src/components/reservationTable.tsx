import { url } from "inspector";
import React from "react";
import Swal from "sweetalert2";
import { BEARER } from "../constant";
import { getToken } from "../helpers";

interface reservation {
    id: number;
    reservation_date: Date;
    reservation_expire_date: Date;
    total_price: number;
    payment_status: boolean;
    tour: {
        tour_name: string;
        current_participate: number;
        maximun_participate: number;
    }
}

interface Props {
    userReservation: reservation;
}

function DataTable(props: Props) {

    const { userReservation } = props;
    const authToken = getToken();

    const handlePayment = () => {
        Swal.fire({
            title: 'ยกเลิกการจอง?',
            text: `คุณต้องการยกเลิกการจองทัวร์ ${userReservation.tour.tour_name} ใช่หรือไม่`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8fce00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:1338/api/reservations/${userReservation.id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `${BEARER} ${authToken}` }
                })
                Swal.fire('ยกเลิกการจองเสร็จสิ้น')
                window.location.reload()
            }
        })
    };

    const handleNotPayment = () => {
        Swal.fire({
            title: 'โปรดส่งสลิปการจ่ายเงินใน Line',
            text: `ยอดรวมทั้งสิ้น ${userReservation.total_price} บาท`,
            imageUrl: 'https://inwfile.com/s-cx/xofr1e.jpg',
            imageWidth: 280,
            imageHeight: 280,
            imageAlt: 'Custom image',
            showConfirmButton: false
        })
    };

    return (
        <tbody>
            <tr>
                <td>{userReservation.tour.tour_name}</td>
                <td>{userReservation.tour.current_participate}/{userReservation.tour.maximun_participate}</td>
                <td>{userReservation.reservation_date instanceof Date ? userReservation.reservation_date.toLocaleDateString() : userReservation.reservation_date}</td>
                <td>{userReservation.total_price} บาท</td>
                <td>{userReservation.payment_status
                    ? <button onClick={handlePayment}>ชำระเงินเสร็จสิ้น</button>
                    : <button onClick={handleNotPayment}>ยังไม่ชำระเงิน</button>}
                </td>
            </tr>
        </tbody>
    )
}

export default DataTable;
