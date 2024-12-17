import { useEffect, useState } from "react";
import Searchbox from "../fregments/inputs/searchInput/Searchbox";
import { motion } from "motion/react";
import axios from "axios";
import useSearch from "../hooks/useSearch";
import Notification from "./notification/Notification";
import Form from "./Form";
import Item from "./Item";
export default function Sidebar({
  children,
  show = false,
  selectedItem,
  OnRefetchFriends,
  OnSelectItem,
  items = [],
  notifications,
  notifyAction,
}) {
  const [query, setQuery] = useState("");
  const [showFrom, setShowFrom] = useState(false);

  const result = useSearch(query);

  const divIconsStyle = selectedItem
    ? "bg-headerColor  p-6 flex justify-between "
    : "bg-headerColor  p-4 flex justify-between ";
  const sidebarStyle = selectedItem
    ? "flex flex-col sm:static fixed z-40 h-full sm:mt-0  mt-16 sm:w-96 w-full  "
    : "flex flex-col sm:static fixed h-full  sm:mt-0 mt-12 sm:w-96 w-full  ";
  return (
    <motion.div
      className={sidebarStyle}
      // initial={{ x: "-24rem" }}
      // animate={{ x: show ? "0" : "-24rem" }}
      // transition={{ duration: 0 }}
    >
      <div className={divIconsStyle}>
        <Notification
          OnRefetchFriends={OnRefetchFriends}
          hasNewRequest={notifications.hasNewRequest}
          notifyAction={notifyAction}
        />

        <button onClick={() => setShowFrom((curr) => !curr)}>
          <span className="p-2 ">
            <i className="fa-solid fa-plus fa-xl text-plumButton hover:rotate-90 transition-transform"></i>
          </span>
        </button>
      </div>
      {showFrom && <Form setShowForm={setShowFrom} />}

      {selectedItem && (
        <div className="bg-headerColor p-2 ">
          <div className="w-full relative h-12">
            <Searchbox
              placeholder={"search ... "}
              setState={setQuery}
              results={result}
            />
          </div>
        </div>
      )}
      {/* items list*/}
      <div
        className="flex flex-col h-full  bg-customBlue overflow-auto 
    hide-scrollbar"
      >
        {items?.length > 0 ? (
          items.map((item, k) => (
            <Item item={item} key={k} OnSelectItem={OnSelectItem} />
          ))
        ) : (
          <img src="/placeholder.png" alt="not found" className="m-auto" />
        )}
      </div>
    </motion.div>
  );
}
