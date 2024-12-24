import axios from "axios";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import useClickOutsideEvent from "../hooks/useClickOutsideEvent";
import { useRef } from "react";
export default function OptionMenu({ OnShow }) {
  const navigate = useNavigate();
  const listDiv = useRef(null);
  useClickOutsideEvent(listDiv, OnShow);
  async function logout() {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_DOMAIN + "/logout"
      );
      console.log("logged out");
      sessionStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <motion.div
      className="absolute rounded w-40 text-white p-2 z-50  bg-listItem right-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={listDiv}
    >
      <ul className="flex flex-col gap-2">
        <li className="border-l-2 border-gray-400 p-2 hover:bg-headerColor duration-500">
          My Profile
        </li>
        <li className="border-l-2 border-gray-400 p-2 hover:bg-headerColor duration-500">
          About item
        </li>
        <li
          className="border-l-2 border-gray-400 cursor-pointer p-2 hover:bg-headerColor duration-500"
          onClick={() => logout()}
        >
          <span className="text-red-500">Logout</span>
        </li>
      </ul>
    </motion.div>
  );
}
