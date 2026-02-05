import axios from "axios";

export const api = axios.create({
  baseURL: "/", // relative to your Next.js app
  withCredentials: true, // very important to send cookies
});
