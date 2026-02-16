import { createContext, useState } from "react";

export const ReRender = createContext("");

export default function Render({ children }) {
  const [isRender, setisRender] = useState("");
  return (
    <ReRender.Provider value={{ isRender, setisRender }}>
      {children}
    </ReRender.Provider>
  );
}
