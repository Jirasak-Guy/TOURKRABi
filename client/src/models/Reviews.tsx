export default interface Review {
    id: number
    attributes: {
        tour_name: string
        current_participate: number
        maximun_participate: number
        tour_detial: string
        tour_type: string
        tour_image: {
            data: [
                {
                    attributes: {
                        url: string
                    }
                }
            ]
        }
        price_onedaytrip?: {
            price: number
        }
        price_package?: [
            {
                room_class_hotel: string
                price: number
            }
        ]
        reviews: {
            data: [
                {
                    id: number
                    attributes: {
                        rating: number
                        comment: string
                        author: {
                            data: {
                                id: number
                                attributes: {
                                    username: string,  
                                }
                            }
                        }

                    }
                }
            ]
        }
    }
}