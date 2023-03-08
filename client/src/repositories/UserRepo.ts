import { IRepository } from "./IRepository";
import UserData from "../models/User";

export class UserRepo implements IRepository<UserData> {

    urlPrefix = "http://localhost:1338/api/users"

    async getAll(): Promise<UserData[] | null> {
        const resp = await fetch(`${this.urlPrefix}?populate=*`)
        const data = await resp.json()
        return data.data
    }
    async get(id: string): Promise<UserData | null> {
        const resp = await fetch(`http://localhost:1338/api/users/${id}?populate=*`)
        const data = await resp.json()
        return data
    }
}