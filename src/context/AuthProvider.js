import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(function () {
    return JSON.parse(sessionStorage.getItem("user"));
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
