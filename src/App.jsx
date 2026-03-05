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
function App() {
  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>
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
