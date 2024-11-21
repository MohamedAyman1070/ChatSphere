import { useState } from "react";
import Searchbox from "../fregments/inputs/Searchbox";
import UserInfo from "../fregments/others/UserInfo";
import MenuIcon from "./MenuIcon";
import OptionMenu from "./OptionMenu";
import { AnimatePresence } from "motion/react";

export default function Header({ selectedObj }) {
  const [showOptionMenue, setShowOptionMenue] = useState(false);
  return (
    <div className="bg-headerColor p-2 flex  h-fit items-center gap-4">
      {/* <MenuIcon /> */}
      {selectedObj ? (
        <div className="flex justify-between items-center w-full">
          <UserInfo user={selectedObj} gap={"gap-4"} />
          <div className="relative ">
            <button
              className="p-2 cursor-pointer"
              onClick={() => setShowOptionMenue((curr) => !curr)}
            >
              <i class="fa-solid fa-ellipsis-vertical fa-xl text-icons animate-pulse"></i>
            </button>
            <AnimatePresence>
              {showOptionMenue && <OptionMenu />}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center">
          <div className="w-3/5 lg:w-2/5   ">
            <Searchbox placeholder={"search ..."} />
          </div>
        </div>
      )}
    </div>
  );
}
