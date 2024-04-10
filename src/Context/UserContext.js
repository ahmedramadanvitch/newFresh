import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setIsUser] = useState(null);
  const [login, setLogin] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <UserContext.Provider
      value={{ user, setIsUser, login, setLogin, open, setOpen }}
    >
      {children}
    </UserContext.Provider>
  );
}
