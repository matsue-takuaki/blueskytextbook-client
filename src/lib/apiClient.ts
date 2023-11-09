import axios from "axios";

const apiSchool = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    Accept: "application/json",
  },
});

export default apiSchool;
