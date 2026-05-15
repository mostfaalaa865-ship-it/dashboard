import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "./context/numNotifications";
import { MessageContextProvider } from "./context/messagesContext";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GetUser from "./context/GetUser.jsx";
import Render from "./context/ReRender.jsx";
import FilterProvider from "./context/FilterProvider.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <GetUser>
      <Render>
        <FilterProvider>
          <MessageContextProvider>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </MessageContextProvider>
        </FilterProvider>
      </Render>
    </GetUser>
  </BrowserRouter>,
  // </StrictMode>,
);
