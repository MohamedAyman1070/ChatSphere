import axios from "axios";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import useClickOutsideEvent from "../hooks/useClickOutsideEvent";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { DataContext } from "../context/DataProvider";
export default function OptionMenu({ OnShow }) {
  const navigate = useNavigate();
  const listDiv = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const { setToasts } = useContext(DataContext);
  useClickOutsideEvent(listDiv, OnShow, null);
  async function logout() {
    try {
      setIsLoading(true);
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_DOMAIN + "/api/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        }
      );
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("access_token");
      setAuth(null);
      navigate("/");
    } catch (err) {
      setToasts((c) => [...c, err?.response?.data?.message]);
    } finally {
      setIsLoading(false);
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
        {/* <Link to={`/home/user/profile/${auth.slug}`}>
          <li className="border-l-2 border-gray-400 p-2 hover:bg-headerColor duration-500">
            My Profile
          </li>
        </Link> */}
        {isLoading ? (
          <li className="cursor-pointer p-2 hover:bg-headerColor duration-500">
            <p className="text-plum animate-pulse duration-300">loading</p>
          </li>
        ) : (
          <li
            className="cursor-pointer p-2 hover:bg-headerColor duration-500"
            onClick={() => logout()}
          >
            <span className="text-red-500">Logout</span>
          </li>
        )}
      </ul>
    </motion.div>
  );
}
