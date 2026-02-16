import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GetUser from "./context/GetUser.jsx";
import Render from "./context/ReRender.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GetUser>
      <Render>
        <App />
      </Render>
    </GetUser>
  </BrowserRouter>,
);
