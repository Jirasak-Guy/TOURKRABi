import { IRepository } from "./IRepository";
import PKT from "../models/PKT";

export interface PKTFilter {
  keyword?: string
}

export class PackageTripRepo implements IRepository<PKT> {
  urlPrefix = "http://localhost:1338/api/packagetours"
  
  async getAll(filter: PKTFilter): Promise<PKT[] | null> {
    const resp = await fetch(`${this.urlPrefix}?populate=*`)
    const data = await resp.json()
    return data.data
  }
}