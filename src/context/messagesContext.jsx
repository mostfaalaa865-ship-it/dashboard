import React, { createContext, useState } from "react";

export const MessageContext = createContext();
export function MessageContextProvider({ children }) {
  const [GetMessages, setGetMessages] = useState([]);
  console.log(GetMessages);

  return (
    <MessageContext.Provider value={{ GetMessages, setGetMessages }}>
      {children}
    </MessageContext.Provider>
  );
}
