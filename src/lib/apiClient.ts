import axios from "axios";

const apiSchool = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    Accept: "application/json",
  },
});
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL:process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiSchool, apiClient };
