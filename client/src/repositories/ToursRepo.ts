import { IRepository } from "./IRepository";
import Tour from "../models/Tours";
import axios from "axios";



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

  async get(id: string): Promise<Tour | null> {
    const resp = await fetch(`${this.urlPrefix}/${id}?populate=*`)
    const data = await resp.json()
    return data.data
  }

  async getReview(id: string): Promise<Tour | null> {
    const resp = await fetch(`http://localhost:1338/api/tours/${id}?populate[reviews][populate]=author`)
    const data = await resp.json()
    return data.data
  }
}