import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Clients from "./pages/Clients";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import RequireAuth from "./Auth/RequireAuth";
import Companies from "./pages/Companies";
import Products from "./pages/Products";
import Messages from "./pages/Messages";
import Chat from "./Chat";
import { useContext, useEffect } from "react";
import { Axios } from "./Api/Axios";
import useUser from "./hooks/useUser";
import { NotificationsContext } from "./context/numNotifications";
import { MessageContext } from "./context/messagesContext";
import showDesktopNotification from "./helper/showDesktopNotification"
import logo from "./assets/Icons/logo.svg";
// import {
//   RPProvider,
//   RPDefaultLayout,
//   RPPages,
//   RPConfig,
// } from "@pdf-viewer/react";

import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function showNotification(message) {
  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission === "granted") {
    new Notification("new message", {
      body: message.message.body,
      tag: Date.now().toString(),
      icon: logo,
    });
  }
}

function App() {
  const { user } = useUser();
  const { setnotifications2 } = useContext(NotificationsContext);
  const { setGetMessages } = useContext(MessageContext);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

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
          showDesktopNotification(
            "New Notification",
            notification.data.body
          );
          setnotifications2((prev) => [notification, ...prev]);
        } else if (parsed.event == "MessageSent") {
          console.log(parsed.data);
          const message = JSON.parse(parsed.data);
          showNotification(message);
          setGetMessages((prev) => [...prev, message.message]);
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
    <>
      ;
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="Clients" element={<Clients />} />
            <Route path="Companies" element={<Companies />} />
            <Route path="Products" element={<Products />} />
            <Route path="Messages" element={<Messages />} />
            <Route path="chat/:id" element={<Chat />} />{" "}
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
