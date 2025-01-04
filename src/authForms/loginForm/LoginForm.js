import { useContext, useEffect, useState } from "react";
import SimpleBtn from "../../fregments/buttons/SimpleBtn";
import Textbox from "../../fregments/inputs/Textbox";
import axios from "axios";
import { clear } from "@testing-library/user-event/dist/clear";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import SimpleCircleSpinner from "../../fregments/spinners/SimpleCircleSpinner";
import { echoInit } from "../../echo";

export default function LoginForm() {
  const { setAuth } = useContext(AuthContext);
  const [errFromServer, setErrFromServer] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function reset() {
    setErrFromServer("");
    setEmailError("");
    setPasswordError("");
  }

  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     try {
  //       await axios.get(
  //         process.env.REACT_APP_BACKEND_DOMAIN + "/sanctum/csrf-cookie"
  //       );
  //       console.log("CSRF set");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getCsrfToken();
  // }, []);

  function handleLogin(e) {
    e.preventDefault();
    reset();
    async function login() {
      try {
        setIsLoading(true);
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/login",
          {
            email: email,
            password: password,
          }
        );

        if (res.data.status === false) {
          setEmailError(res.data.errors?.email?.pop());
          setPasswordError(res.data.errors?.password?.pop());
        } else {
          // console.log("ok:", res);
          sessionStorage.setItem("access_token", res.data.access_token);
          echoInit();
          const user_res = await axios.get(
            process.env.REACT_APP_BACKEND_DOMAIN + "/api/auth/user",
            {
              headers: {
                Authorization: "Bearer " + res.data.access_token,
              },
            }
          );
          const user = user_res.data;
          sessionStorage.setItem("user", JSON.stringify(user));
          setAuth(user);
          navigate("home");
        }
      } catch (err) {
        console.log("err :  ", err);
      } finally {
        setIsLoading(false);
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
        {/* {errFromServer && (
          <span className="text-errColor">{errFromServer}</span>
        )} */}
        <div className="w-full sm:w-2/5 flex flex-col gap-2 place-self-center">
          <SimpleBtn
            children={isLoading ? <SimpleCircleSpinner /> : "Login"}
            onClick={handleLogin}
          />
        </div>
        <Link to={"/register"} className=" w-fit">
          <span className="text-icons ">New to Check ?</span>
        </Link>
      </form>
    </div>
  );
}
