import { io } from "socket.io-client";

const URL =
  import.meta.env.MODE === "production" ? undefined : "http://localhost:5173/";
export const socket = io(URL, { autoConnect: true });
