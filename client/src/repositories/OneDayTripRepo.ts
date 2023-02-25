import { IRepository } from "./IRepository";
import ODT from "../models/ODT";

export interface ODTFilter {
  keyword?: string
}

export class OneDayTripRepo implements IRepository<ODT> {
  urlPrefix = "http://localhost:1338/api/onedaytrips"

  async getAll(filter: ODTFilter): Promise<ODT[] | null> {
    const resp = await fetch(`${this.urlPrefix}?populate=*`)
    const data = await resp.json()
    return data.data
  }
}
