import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Guest() {
  const { auth } = useContext(AuthContext);
  return auth !== null ? <Navigate to="home" /> : <Outlet />;
}
