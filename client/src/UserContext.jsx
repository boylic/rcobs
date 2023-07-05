import { createContext, useEffect } from "react";
import { useState } from "react";
import { api } from "./api/api";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get(api + "/user").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, ready, setReady, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
