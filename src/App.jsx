import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Clients from "./Clients";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import RequireAuth from "./RequireAuth";
import Companies from "./Companies";
function App() {
  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="Clients" element={<Clients />} />
            <Route path="Companies" element={<Companies />} />
          </Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
