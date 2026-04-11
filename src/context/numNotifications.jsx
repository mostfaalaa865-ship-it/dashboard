import { createContext, useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { notifications } from "../Api/Api";

export const NotificationsContext = createContext();
export function NotificationsProvider({ children }) {
  const [notifications2, setnotifications2] = useState([]);
  console.log(notifications2);

  useEffect(() => {
    Axios.get(`${notifications}?per_page=50`).then((res) =>
      setnotifications2(res.data.data),
    );
  }, []);

  return (
    <NotificationsContext.Provider
      value={{ notifications2, setnotifications2 }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
