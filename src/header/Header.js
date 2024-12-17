import { useState } from "react";
import Searchbox from "../fregments/inputs/searchInput/Searchbox";
import UserInfo from "../fregments/others/UserInfo";
import MenuIcon from "./MenuIcon";
import OptionMenu from "./OptionMenu";
import { AnimatePresence, motion } from "motion/react";
import useSearch from "../hooks/useSearch";

export default function Header({
  selectedItem,
  showSidebar,
  setShowSidebar,
  notifications,
}) {
  const [showOptionMenue, setShowOptionMenue] = useState(false);
  const [query, setQuery] = useState("");
  const results = useSearch(query);
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
          <UserInfo user={selectedItem.friend} gap={"gap-4"} />
          <div className="relative ">
            <button
              className="p-2 cursor-pointer"
              onClick={() => setShowOptionMenue((curr) => !curr)}
            >
              <i className="fa-solid fa-ellipsis-vertical fa-xl text-icons "></i>
            </button>
            <AnimatePresence>
              {showOptionMenue && <OptionMenu />}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center">
          <div className="w-4/5 lg:w-2/5  relative h-10">
            <Searchbox
              placeholder={"search ..."}
              setState={setQuery}
              results={results}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
