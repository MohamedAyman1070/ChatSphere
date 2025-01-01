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
import Guest from "./middlewares/Guest";
import Auth from "./middlewares/Auth";
import AuthProvider from "./context/AuthProvider";
import { Main } from "./chat/Main";
import DataProvider from "./context/DataProvider";
import SimpleCircelSpinner from "./fregments/spinners/SimpleCircleSpinner";
import Room from "./chat/Room";
import Slider from "./fregments/others/Slider";
import UserInfo from "./itemInfo/UserInfo";
import GroupInfo from "./itemInfo/GroupInfo";
import Message from "./chat/messages/Message";
import GroupInvetationAcceptor from "./acceptInvetationsPage/GroupInvetationAcceptor";
import { clear } from "@testing-library/user-event/dist/clear";
import SimpleBtn from "./fregments/buttons/SimpleBtn";
import ImageSlider from "./chat/ImagesSlider";
// import { Cloudinary } from "cloudinary";

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
            <Route path="home" element={<Home />}>
              <Route path="chat-room/:slug" element={<Room />}>
                <Route
                  path="display-images/:message_slug"
                  element={<ImageSlider />}
                />
              </Route>
              <Route path="user/profile/:slug" element={<UserInfo />} />
              <Route path="group/profile/:slug" element={<GroupInfo />} />
              <Route
                path="group-invitation/:param"
                element={<GroupInvetationAcceptor />}
              />
            </Route>
          </Route>

          <Route path="*" element={<p>this device can't be</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
