import axios from "axios";
import { baseURL } from "./Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `bearer ${token}`,
  },
});
