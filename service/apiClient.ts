import axios from "axios";

export const DataApiClient = axios.create({
    baseURL: "https://sdc-backend-drbw.onrender.com",
    // baseURL: "http://127.0.0.1:7007",
    withCredentials: true,
});
