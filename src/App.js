import AuthPage from "./authForms/AuthPage";
import LoginForm from "./authForms/loginForm/LoginForm";
import RegisterForm from "./authForms/registerForm/RegisterForm";
import { Main } from "./chat/Main";
import Message from "./chat/messages/Message";
import TypeBar from "./chat/typeBar/TypeBar";
import SimpleBtn from "./fregments/buttons/SimpleBtn";
import FormInput from "./fregments/inputs/FormInput";
import Textbox from "./fregments/inputs/Textbox";
import TextExpander from "./fregments/others/TextExpander";
import Header from "./header/Header";
import { ItemsList } from "./sidebar/ItemsList";
import Sidebar from "./sidebar/Sidebar";
import { motion } from "motion/react";

const objItem = {
  name: "mentheman4",
  image:
    "https://th.bing.com/th/id/OIP.VTBzGQySOYLDke_xg2OfEQHaFj?w=244&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
};

const items = [
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
];

// const items = [];

const message = {
  text: "hello man !",
  user: objItem,
};

const messages = [
  message,
  message,
  message,
  message,
  message,
  message,
  message,
  message,
];

function App() {
  return (
    <>
      <AuthPage>
        <LoginForm />
      </AuthPage>
      {/* <div className="grid grid-cols-1 h-screen bg-slate-600">
        <div className="flex overflow-hidden">
          <Sidebar>
            <ItemsList items={items} />
          </Sidebar>
        </div>
      </div> */}
    </>
  );
}

export default App;
