import { IRepository } from "./IRepository";
import Review from "../models/Reviews";
import { BEARER } from "../constant";
import { getToken } from "../helpers";
import ReviewData from "../models/Reviewdata";
import conf from "../config/conf";

export class ReviewRepo implements IRepository<Review> {

    urlPrefix = `${conf.apiPrefix}/api/reviews`
    token = getToken();

    async getAll(id: string): Promise<Review[] | null> {
        const resp = await fetch(`${this.urlPrefix}?populate=*`)
        const data = await resp.json()
        return data.data
    }

    async get(id: string): Promise<Review | null> {
        const resp = await fetch(`${this.urlPrefix}/${id}?populate[author][populate]=*`)
        const data = await resp.json()
        return data.data
    }

    async createReview(data: ReviewData): Promise<ReviewData> {
        const resp = await fetch(`${this.urlPrefix}?populate=*`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${BEARER} ${this.token}`
            },
            body: JSON.stringify(data)
        });
        const data_res = await resp.json()
        return data_res;
    }

    async deleteReview(id: string): Promise<ReviewData> {
        const resp = await fetch(`${this.urlPrefix}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `${BEARER} ${this.token}`
            },
        });
        const data_res = await resp.json()
        return data_res;

        

}
}