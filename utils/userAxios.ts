import axios from "axios";

export const userAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string
});
