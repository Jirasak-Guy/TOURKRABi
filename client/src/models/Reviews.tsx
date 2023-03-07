export default interface Review {
    id: number
    attributes: {
        rating: number
        comment: string
    }
}