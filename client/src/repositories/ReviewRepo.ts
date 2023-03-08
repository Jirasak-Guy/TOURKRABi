import { IRepository } from "./IRepository";
import Review from "../models/Reviews";
import axios from "axios";

export class ReviewRepo implements IRepository<Review> {

    urlPrefix = "http://localhost:1338/api/reviews"

    async getAll(): Promise<Review[] | null> {
        const resp = await fetch(`${this.urlPrefix}?populate[author][fields][0]=username`)
        const data = await resp.json()
        return data.data
    }

    async create(entity: Partial<Review>): Promise<Review | null> {
        const resp = await axios.post<Review>(`${this.urlPrefix}`, entity)
        return resp.data
    }

    async update(entity: Partial<Review>): Promise<Review | null> {
        const resp = await axios.put<Review>(`${this.urlPrefix}/${entity.id}`, entity)

        return resp.data
    }

    async delete(id: string | number): Promise<void> {
        await axios.delete<void>(`${this.urlPrefix}/${id}`)
    }
}