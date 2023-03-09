export default interface reservation {
    id: number;
    attributes: {
        createdAt: Date;
        reservation_expire_date: Date;
        total_price: number;
        payment_status: boolean;
        tour: {
            data: {
                attributes: {
                    tour_name: string;
                    current_participate: number;
                    maximun_participate: number;
                }
            }
        }
        user: {
            data: {
                id: number;
            }
        }
    }
}
