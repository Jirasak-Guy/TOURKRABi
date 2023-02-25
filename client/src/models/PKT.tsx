export default interface PKT{
  id: number
  attributes: {
    tourname: string
    description: string
    price: number
    current_reserve: number
    max_reserve: number
    image: {
      data: [
        {
          id: number
          attributes: {
            url: string
          }
        }
      ]
    }
  }
}