import { createContext } from "react";
import useUser from "../hooks/useUser";

export const User = createContext("");

export default function GetUser({ children }) {
  const user = useUser();
  return <User.Provider value={user}>{children}</User.Provider>;
}
