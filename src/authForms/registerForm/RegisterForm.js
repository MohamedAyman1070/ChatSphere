import { useContext, useEffect, useState } from "react";
import SimpleBtn from "../../fregments/buttons/SimpleBtn";
import Textbox from "../../fregments/inputs/Textbox";
import axios from "axios";
import { echoInit } from "../../echo";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import SimpleCircleSpinner from "../../fregments/spinners/SimpleCircleSpinner";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfimation] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    fromServer: "",
  });

  // useEffect(() => {
  //   const getCsrf = async () => {
  //     try {
  //       const res = await axios.get(
  //         process.env.REACT_APP_BACKEND_DOMAIN + "/sanctum/csrf-cookie"
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getCsrf();
  // }, []);

  function handleRegister(e) {
    e.preventDefault();
    setErrors((currErr) => ({}));
    const register = async () => {
      try {
        setIsLoading(true);
        let data = {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        };
        if (phone.length > 0) {
          data.number = phone;
        }
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/register",
          data
        );
        if (res.data.status === false) {
          setErrors((currErr) => ({
            ...currErr,
            name: res.data?.errors?.name?.pop(),
            email: res.data?.errors?.email?.pop(),
            password: res.data?.errors?.password?.pop(),
            phone: res.data?.errors?.number?.pop(),
          }));
        } else {
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
        console.log("r", err);
      } finally {
        setIsLoading(false);
      }
    };
    register();
  }

  return (
    <div className=" lg:w-2/5 h-fit m-auto rounded ">
      <form className="w-full flex flex-col gap-4">
        <div>
          <Textbox placeholder={"Name ..."} setState={setName} />
          {errors?.name && <span className="text-errColor">{errors.name}</span>}
        </div>
        <div>
          <span className="text-sm text-normalTextColor">(optional)</span>
          <Textbox placeholder={"phone ..."} setState={setPhone} />
          {errors?.phone && (
            <span className="text-errColor">{errors.phone}</span>
          )}
        </div>
        <div>
          <Textbox placeholder={"Email ..."} setState={setEmail} />
          {errors?.email && (
            <span className="text-errColor">{errors.email}</span>
          )}
        </div>
        <div>
          <Textbox
            placeholder={"Password ..."}
            setState={setPassword}
            type="password"
          />
          {errors?.password && (
            <span className="text-errColor">{errors.password}</span>
          )}
        </div>
        <Textbox
          placeholder={"Confirm Password ..."}
          setState={setPasswordConfimation}
          type="password"
        />
        {errors?.fromServer && (
          <span className="text-errColor">{errors.fromServer}</span>
        )}
        <div className="w-full sm:w-2/5 flex flex-col gap-2 place-self-center">
          <SimpleBtn
            children={isLoading ? <SimpleCircleSpinner /> : "Sign up"}
            onClick={handleRegister}
          />
        </div>
        <Link to={"/"} className="w-fit">
          <span className="text-normalTextColor">
            Already have an accaount ?
          </span>
        </Link>
      </form>
    </div>
  );
}
