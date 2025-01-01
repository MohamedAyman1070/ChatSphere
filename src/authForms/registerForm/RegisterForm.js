import { useEffect, useState } from "react";
import SimpleBtn from "../../fregments/buttons/SimpleBtn";
import Textbox from "../../fregments/inputs/Textbox";
import axios from "axios";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfimation] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    fromServer: "",
  });

  useEffect(() => {
    const getCsrf = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN + "/sanctum/csrf-cookie"
        );
      } catch (err) {
        console.log(err);
      }
    };
    getCsrf();
  }, []);

  function handleRegister(e) {
    e.preventDefault();
    setErrors((currErr) => ({}));
    const register = async () => {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/register",
          {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            phone,
          }
        );
        console.log("res: ", res.data);
        setErrors((currErr) => ({
          ...currErr,
          name: res.data?.errors?.name,
          email: res.data?.errors?.email,
          password: res.data?.errors?.password,
        }));
        console.log(errors);
      } catch (err) {
        console.log(err);
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
          <span className="text-sm text-gray-600">(opotinal)</span>
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
          <SimpleBtn children={"Sign up"} onClick={handleRegister} />
        </div>
        <span className="text-icons">Already have an accaount ?</span>
      </form>
    </div>
  );
}
