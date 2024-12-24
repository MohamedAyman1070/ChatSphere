import { useContext, useEffect, useState } from "react";
import Searchbox from "../fregments/inputs/searchInput/Searchbox";
import { motion } from "motion/react";
import axios from "axios";
import useSearch from "../hooks/useSearch";
import Notification from "./notification/Notification";
import Form from "./Form";
import FriendList from "./friendsList/FriendList";
import GroupList from "./groupsList/GroupList";
import { DataContext } from "../context/DataProvider";

export default function Sidebar() {
  const {
    selectedItem,
    OnRefetchItems,
    OnSelectItem,
    items,
    notifications,
    notifyAction,
  } = useContext(DataContext);
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
          OnRefetchItems={OnRefetchItems}
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
        {items.friends?.length > 0 || items.groups?.length > 0 ? (
          <>
            <FriendList list={items.friends} OnSelectItem={OnSelectItem} />
            <GroupList list={items.groups} OnSelectItem={OnSelectItem} />
          </>
        ) : (
          <img src="/placeholder.png" alt="not found" className="m-auto" />
        )}
      </div>
    </motion.div>
  );
}
