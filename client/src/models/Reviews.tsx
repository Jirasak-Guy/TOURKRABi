export default interface Review {
    id: number
    attributes: {
        rating: number
        comment: string
        author: {
            data: {
                attributes: {
                    username: string
                    Avatar: {
                        data: {
                            id: string
                            attributes: {
                                formats: {
                                    thumbnail: {
                                        url: string
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        tour: {
            data: {
                attributes: {
                    id : number
                }
            }
        }
    }
}