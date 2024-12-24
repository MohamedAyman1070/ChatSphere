import AuthPage from "./authForms/AuthPage";
import LoginForm from "./authForms/loginForm/LoginForm";
import RegisterForm from "./authForms/registerForm/RegisterForm";
import axios from "axios";
import { useEffect, useState } from "react";
import Home from "./Home";
import echo from "./echo";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { nav } from "motion/react-client";
import Guest from "./middlewares/Guest";
import Auth from "./middlewares/Auth";
import AuthProvider from "./context/AuthProvider";
import { Main } from "./chat/Main";
import DataProvider from "./context/DataProvider";
import CircelSpinner from "./fregments/spinners/CircleSpinner";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Guest />}>
            <Route
              index
              element={
                <AuthPage>
                  <LoginForm />
                </AuthPage>
              }
            />
          </Route>
          <Route
            path="/signup"
            element={
              <AuthPage>
                <LoginForm />
              </AuthPage>
            }
          />
          <Route element={<Auth />}>
            <Route path="home" element={<Home />} />
            <Route path="home/:slug" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
