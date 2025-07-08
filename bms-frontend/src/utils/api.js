import axios from "axios";

export const API = axios.create({
  baseURL: "https://bms-app-4306cdc3a8d6.herokuapp.com/",
});