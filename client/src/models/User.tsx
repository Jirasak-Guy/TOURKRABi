export default interface UserData {
    id: number;
    username: string;
    email: string;
    Avatar: {
        url: string;
    }
    reservations: [
        {
            reservation_date: Date
            reservation_expire_date: Date
            total_price: number
            payment_status: boolean
            tour: {
                tour_name: string
                current_participate: number
                maximun_participate: number
            }
        }
    ]
}