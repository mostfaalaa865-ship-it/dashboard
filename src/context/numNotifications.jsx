import { createContext, useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { notifications } from "../Api/Api";
import useUser from "../hooks/useUser";

export const NotificationsContext = createContext();
export function NotificationsProvider({ children }) {
  const [notifications2, setnotifications2] = useState([]);

  useEffect(() => {
    Axios.get(`${notifications}?per_page=50`).then((res) =>
      setnotifications2(res.data.data),
    );
  }, []);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;
    const ws = new WebSocket("wss://mostafa.nageeb-darwish.cloud/app/469630");
    const channel_name = `private-user.${user.id}`;

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = async (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.event == "pusher:connection_established") {
          const data = JSON.parse(parsed.data);
          const socket_id = data.socket_id;

          const AuthRes = await Axios.post(`/broadcasting/auth`, {
            socket_id,
            channel_name,
          });
          const auth = AuthRes.data.auth;

          ws.send(
            JSON.stringify({
              event: "pusher:subscribe",
              data: {
                channel: channel_name,
                auth: auth,
              },
            }),
          );
        }
        if (parsed.event == "notification.created") {
          const notification = JSON.parse(parsed.data);

          setnotifications2((prev) => [...prev, notification]);
          console.log(notification);
        }
        console.log(parsed);
      } catch (error) {
        console.log(error);
      }
    };
    return () => {
      ws.close();
    };
  }, [user?.id]);

  return (
    <NotificationsContext.Provider
      value={{ notifications2, setnotifications2 }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
