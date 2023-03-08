export default interface Review {
    id: number
    attributes: {
        rating: number
        comment: string
        author: {
            data: {
                attributes: {
                    username: string
                }
            }
        }
    }
}