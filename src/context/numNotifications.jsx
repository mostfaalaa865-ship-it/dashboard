import { createContext, useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { notifications } from "../Api/Api";

export const NotificationsContext = createContext();
export function NotificationsProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [notifications2, setnotifications2] = useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${notifications}?per_page=8&page=${page}`)
      .then((res) => {
        setnotifications2((prev) => [...prev, ...res.data.data]);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <NotificationsContext.Provider
      value={{ notifications2, setnotifications2, setPage, loading }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
