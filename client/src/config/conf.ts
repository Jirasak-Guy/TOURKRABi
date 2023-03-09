import { API } from "../constant";

const isProd = !(!process.env.NODE_ENV || process.env.NODE_ENV === "development")

const conf = {
    isProd,
    apiPrefix: isProd ? "https://s01x.coe.psu.ac.th" : API,
}

export default conf;