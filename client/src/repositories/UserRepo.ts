import { IRepository } from "./IRepository";
import UserData from "../models/User";
import conf from "../config/conf";

export class UserRepo implements IRepository<UserData> {

    urlPrefix = `${conf.apiPrefix}/api/users`

    async getAll(): Promise<UserData[] | null> {
        const resp = await fetch(`${this.urlPrefix}?populate=*`)
        const data = await resp.json()
        return data.data
    }
    async get(id: string): Promise<UserData | null> {
        const resp = await fetch(`${this.urlPrefix}/${id}?populate=*`)
        const data = await resp.json()
        return data
    }
}