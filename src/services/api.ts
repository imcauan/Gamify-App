import axios from "axios";
import { getToken } from "./token";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = axios.create({
    baseURL: `${baseURL}`
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

