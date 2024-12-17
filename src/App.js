import AuthPage from "./authForms/AuthPage";
import LoginForm from "./authForms/loginForm/LoginForm";
import RegisterForm from "./authForms/registerForm/RegisterForm";
import axios from "axios";
import { useEffect, useState } from "react";
import Home from "./Home";
import echo from "./echo";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  return (
    <>
      {/* <AuthPage>
        <LoginForm />
      </AuthPage> */}
      <Home />
    </>
  );
}

export default App;
