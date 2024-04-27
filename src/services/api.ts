import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_API_URL;
const baseURL = process.env.BASE_URL;

export const api = axios.create({
    baseURL: `${baseURL}/api`
});