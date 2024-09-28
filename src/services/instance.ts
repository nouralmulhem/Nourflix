import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENV === "development"
      ? process.env.NEXT_PUBLIC_PROXY_DEVELOPMENT
      : process.env.NEXT_PUBLIC_PROXY_PRODUCTION,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PROXY_ACCESS_TOKEN}`,
  },
});

export default instance;
