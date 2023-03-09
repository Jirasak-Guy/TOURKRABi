import { IRepository } from "./IRepository";
import reservation from "../models/Reservation";
import { BEARER } from "../constant";
import { getToken } from "../helpers";

const token = getToken()

export class reservationRepo implements IRepository<reservation> {

    urlPrefix = "http://localhost:1338/api/reservations"

    async getAll(): Promise<reservation[] | null> {
        if (token) {
            const resp = await fetch(`${this.urlPrefix}?populate=*`, {
                headers: { Authorization: `${BEARER} ${token}` },
            });
            const data = await resp.json()
            return data.data
        } return null;
    }

    async delete(id: string | number): Promise<void> {
        await fetch(`${this.urlPrefix}/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `${BEARER} ${token}` }
        })
    }
}