import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GetUser from "./context/GetUser.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GetUser>
      <App />
    </GetUser>
  </BrowserRouter>,
);
