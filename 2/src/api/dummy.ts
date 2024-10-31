import axios from "axios";

export const dummyApi = axios.create({
  baseURL: "https://dummyjson.com",
});
