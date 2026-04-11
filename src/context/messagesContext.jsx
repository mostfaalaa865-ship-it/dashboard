import React, { createContext, useState } from "react";

export const MessageContext = createContext("222");
export function MessageContextProvider({ children }) {
  const [GetMessages, setGetMessages] = useState([]);
  return (
    <MessageContext.Provider vlaue={{ GetMessages, setGetMessages }}>
      {children}
    </MessageContext.Provider>
  );
}
