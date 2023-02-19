import { IRepository } from "./IRepository";
import ODT from "../models/ODT";

export class OneDayTripRepo implements IRepository<ODT> {
    async getAll(): Promise<ODT[] | null> {
      return [
        {id: 1,
        tourname: "เที่ยวทะเลแหวก",
        price: 1399,
        member: 9,
        picture: "imgtest/ทะเลแหวก.jpg"},
        {id: 2,
        tourname: "วัดถ้ำเสือ",
        price: 1199,
        member: 8,
        picture: "imgtest/วัดถ้ำเสือ.jpg"},
        {id: 3,
        tourname: "หาดนพรัตน์ธารา",
        price: 999,
        member: 6,
        picture: "imgtest/หาดนพรัตน์ธารา.jpg"},
        {id: 4,
        tourname: "หาดไรเลย์",
        price: 1599,
        member: 7,
        picture: "imgtest/หาดไรลีย์.jpg"},
        {id: 5,
        tourname: "หาดถ้ำพระนาง",
        price: 1299,
        member: 8,
        picture: "imgtest/หาดถ้ำพระนาง.jpg"}
      ]
    }
  }
  
