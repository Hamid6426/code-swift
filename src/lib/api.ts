import axios from "axios";

  const isProd = process.env.NODE_ENV === "production";

export const api = axios.create({
  baseURL:  isProd ? process.env.BASE_URL : "http://localhost:3000/api", // relative to your Next.js app
  withCredentials: true, // very important to send cookies
});
