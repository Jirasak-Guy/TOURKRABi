import { IRepository } from "./IRepository";
import Tour from "../models/Tours";

export interface TFilter {
  keyword?: string
}

export class TourRepo implements IRepository<Tour> {
  urlPrefix = "http://localhost:1338/api/tours"
  
  async getAll(filter?: TFilter): Promise<Tour[] | null> {
    const resp = await fetch(`${this.urlPrefix}?populate=*`)
    const data = await resp.json()
    return data.data
  }
}