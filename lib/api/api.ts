
import axios from "axios";

// const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
  baseURL,
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${myKey}`,
  //   },
  withCredentials: true
});
