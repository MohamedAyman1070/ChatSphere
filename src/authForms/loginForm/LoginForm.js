import { useContext, useEffect, useState } from "react";
import SimpleBtn from "../../fregments/buttons/SimpleBtn";
import Textbox from "../../fregments/inputs/Textbox";
import axios from "axios";
import { clear } from "@testing-library/user-event/dist/clear";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function LoginForm() {
  const { setAuth } = useContext(AuthContext);
  const [errFromServer, setErrFromServer] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function reset() {
    setErrFromServer("");
    setEmailError("");
    setPasswordError("");
  }

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
        console.log("CSRF set");
      } catch (err) {
        console.log(err);
      }
    };
    getCsrfToken();
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    reset();
    async function login() {
      try {
        const res = await axios.post("http://localhost:8000/login", {
          email: email,
          password: password,
        });
        if (res.data.status === false) {
          setErrFromServer((curr) => res.data.error);
        } else {
          console.log("ok:", res?.data?.message);
          const user_res = await axios.get(
            "http://localhost:8000/api/auth/user"
          );
          const user = user_res.data.user;
          sessionStorage.setItem("user", JSON.stringify(user));
          setAuth(user);
          navigate("home");
        }
      } catch (err) {
        console.log(err.response?.data);
        if (err.response.data.errors.email) {
          setEmailError(err.response.data.errors.email.pop());
        }
        if (err.response.data.errors.password) {
          setPasswordError(err.response.data.errors.password.pop());
        }
      }
    }

    login();
  }

  return (
    <div className=" lg:w-2/5 h-fit m-auto rounded ">
      <form className="w-full flex flex-col gap-4">
        <div>
          <Textbox placeholder={"Email ..."} setState={setEmail} />
          {emailError && <span className="text-red-300">{emailError}</span>}
        </div>
        <div>
          <Textbox
            placeholder={"Password ..."}
            setState={setPassword}
            type="password"
          />
          {passwordError && (
            <span className="text-errColor ">{passwordError}</span>
          )}
        </div>
        {errFromServer && (
          <span className="text-errColor">{errFromServer}</span>
        )}
        <div className="w-full sm:w-2/5 flex flex-col gap-2 place-self-center">
          <SimpleBtn children={"Login"} onClick={handleLogin} />
        </div>
        <span className="text-icons">New to Check ?</span>
      </form>
    </div>
  );
}
