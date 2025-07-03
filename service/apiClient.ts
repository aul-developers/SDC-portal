import axios from "axios";

export const DataApiClient = axios.create({
    baseURL: "https://sdc-backend-drbw.onrender.com",
    withCredentials: true,
});
