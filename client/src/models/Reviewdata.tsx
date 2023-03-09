export default interface ReviewData {
    data: {
        rating: number,
        comment: string | number | undefined,
        tour: {
            id: string,
        },
        author: {
            id: string,
        }
    }
}
