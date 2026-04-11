import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "./context/numNotifications";
import { MessageContextProvider } from "./context/messagesContext";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GetUser from "./context/GetUser.jsx";
import Render from "./context/ReRender.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <GetUser>
      <Render>
        <MessageContextProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </MessageContextProvider>
      </Render>
    </GetUser>
  </BrowserRouter>,
  // </StrictMode>,
);
