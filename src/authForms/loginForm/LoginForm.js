import { useEffect } from "react";
import SimpleBtn from "../../fregments/buttons/SimpleBtn";
import Textbox from "../../fregments/inputs/Textbox";
import axios from "axios";
import { clear } from "@testing-library/user-event/dist/clear";

export default function LoginForm() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

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
    async function login() {
      try {
        let csrf = document.cookie
          .split(";")
          .filter((item) => item.includes("XSRF"))
          .pop()
          .split("=")
          .pop();
        const res = await axios.post(
          "http://localhost:8000/login",
          {
            email: "brennon.stanton@example.com",
            password: "password",
          },
          {
            headers: {
              "X-XSRF-TOKEN": csrf,
            },
          }
        );
        console.log("login successful:", res.data);
      } catch (err) {
        console.log(err);
      }
    }

    login();
  }

  return (
    <div className=" lg:w-2/5 h-fit m-auto rounded ">
      <form className="w-full flex flex-col gap-4">
        <Textbox placeholder={"Email ..."} />
        <Textbox placeholder={"Password ..."} />
        <div className="w-full sm:w-2/5 flex flex-col gap-2 place-self-center">
          <SimpleBtn children={"Login"} onClick={handleLogin} />
        </div>
        <span className="text-icons">New to Check ?</span>
      </form>
    </div>
  );
}
