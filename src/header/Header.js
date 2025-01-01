import { useContext, useEffect, useState } from "react";
import Searchbox from "../fregments/inputs/searchInput/Searchbox";
import UserInfo from "../fregments/others/UserInfo";
import MenuIcon from "./MenuIcon";
import OptionMenu from "./OptionMenu";
import { AnimatePresence, motion } from "motion/react";
import useSearch from "../hooks/useSearch";
import { DataContext } from "../context/DataProvider";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";
import { AuthContext } from "../context/AuthProvider";

export default function Header() {
  const { selectedItem, setShowSidebar, notifications, userTyping } =
    useContext(DataContext);
  const [showOptionMenue, setShowOptionMenue] = useState(false);
  const [query, setQuery] = useState("");
  const results = useSearch(query);
  const { slug } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  const { auth } = useContext(AuthContext);
  async function getInvitationURL() {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_DOMAIN + `/api/get-temp-URL/${slug}`
      );
      const tempURL = res.data.TempURL;
      console.log(tempURL);
      const params = tempURL
        .split(process.env.REACT_APP_BACKEND_DOMAIN + "/api/join-group/")
        .pop();
      const URL =
        process.env.REACT_APP_FRONTEND_DOMAIN +
        "/home/group-invitation/" +
        params;
      console.log(URL);
      navigator.clipboard.writeText(URL).then(() => setIsCopied(true));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [isCopied]);
  return (
    <motion.div
      // initial={{ x: 0 }}
      // animate={{ x: showSidebar ? "0.001rem" : "0" }}
      // transition={{ duration: 5 }}
      className="bg-headerColor p-2 flex  h-fit items-center gap-4 w-full"
    >
      <MenuIcon onShow={setShowSidebar} notifications={notifications} />

      {selectedItem ? (
        <div className="flex justify-between items-center w-full">
          <Link
            to={`${
              selectedItem.friend
                ? "/home/user/profile/" + selectedItem?.friend?.slug
                : "/home/group/profile/" + selectedItem.slug
            }`}
          >
            <UserInfo
              user={selectedItem.friend ?? selectedItem}
              gap={"gap-4"}
            />
            <p className="text-xs  text-end  text-plum">
              {userTyping && userTyping + " typing..."}
            </p>
          </Link>
          <div className="flex gap-2 items-center">
            {selectedItem.friend === undefined &&
            selectedItem?.relations?.admin.slug === auth.slug ? (
              <div className="flex gap-2">
                <button className="" onClick={getInvitationURL}>
                  <i className="fa-solid fa-link text-icons"></i>
                </button>
                {isCopied ? (
                  <p className="text-normalTextColor text-sm">copied</p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <div className="relative ">
              <button
                className="p-2 cursor-pointer"
                onClick={() => setShowOptionMenue((curr) => !curr)}
              >
                <i className="fa-solid fa-ellipsis-vertical fa-xl text-icons "></i>
              </button>
              <AnimatePresence>
                {showOptionMenue && <OptionMenu OnShow={setShowOptionMenue} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center">
          <div className="w-4/5 lg:w-2/5  relative h-10">
            <Searchbox />
          </div>
        </div>
      )}
    </motion.div>
  );
}
