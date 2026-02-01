import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Clients from "./Clients";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="Clients" element={<Clients />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
