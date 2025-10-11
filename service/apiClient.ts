import axios from "axios";

export const DataApiClient = axios.create({
    baseURL: "hhttps://sdc-backend-7173.onrender.com",
    // baseURL: "http://127.0.0.1:7007",
    withCredentials: true,
});
