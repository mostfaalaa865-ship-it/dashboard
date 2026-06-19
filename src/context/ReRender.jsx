import { createContext, useState } from "react";

export const ReRender = createContext({});

export default function Render({ children }) {
  const [refresh, setRefresh] = useState({
    teams: 0,
    clients: 0,
    products: 0,
    company: 0,
    payment: 0,
    schedule: 0,
  });
  return (
    <ReRender.Provider value={{ refresh, setRefresh }}>
      {children}
    </ReRender.Provider>
  );
}
