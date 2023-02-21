import { IRepository } from "./IRepository";
import PKT from "../models/PKT";

export interface PKTFilter {
  keyword?: string
}

export class PackageTripRepo implements IRepository<PKT> {
  
  async getAll(filter: PKTFilter): Promise<PKT[] | null> {
    const params = {...filter}
    return [
      {id: 1,
      tourname: "เที่ยวทะเลแหวก",
      price: 1399,
      customer: 9,
      maxcustomer: 10,
      picture: "imgtest/ทะเลแหวก.jpg"},
      {id: 2,
      tourname: "วัดถ้ำเสือ",
      price: 1199,
      customer: 8,
      maxcustomer: 10,
      picture: "imgtest/วัดถ้ำเสือ.jpg"},
      {id: 3,
      tourname: "หาดนพรัตน์ธารา",
      price: 999,
      customer: 6,
      maxcustomer: 10,
      picture: "imgtest/หาดนพรัตน์ธารา.jpg"},
      {id: 4,
      tourname: "หาดไรเลย์",
      price: 1599,
      customer: 7,
      maxcustomer: 10,
      picture: "imgtest/หาดไรลีย์.jpg"},
      {id: 5,
      tourname: "หาดถ้ำพระนาง",
      price: 1299,
      customer: 10,
      maxcustomer: 10,
      picture: "imgtest/หาดถ้ำพระนาง.jpg"}
    ]
  }
}