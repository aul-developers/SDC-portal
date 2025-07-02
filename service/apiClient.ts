import axios from "axios";

export const DataApiClient = axios.create({
    baseURL: "http://127.0.0.1:7002",
    withCredentials: true,
});
