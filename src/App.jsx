import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Clients from "./Clients";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="Clients" element={<Clients />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
