import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Clients from "./Clients";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import RequireAuth from "./RequireAuth";
function App() {
  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="Clients" element={<Clients />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
