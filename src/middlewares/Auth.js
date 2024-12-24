import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Auth() {
  const { auth } = useContext(AuthContext);
  return auth === null ? <Navigate to="/" /> : <Outlet />;
}
