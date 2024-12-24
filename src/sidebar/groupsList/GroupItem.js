import { useEffect } from "react";
import UserInfo from "../../fregments/others/UserInfo";
import axios from "axios";

export default function GroupItem({
  item,
  unreadMessage = false,
  sendRequest = false,
  acceptRequest = false,
  imgSize = "w-14 h-14",
  OnSelectItem,
}) {
  return (
    <div
      className="flex justify-between flex-wrap items-center cursor-pointer p-4 bg-listItem hover:bg-plum transition duration-300 hover:scale-105  group 
          hover:shadow-xl hover:shadow-hoverPlum"
      onClick={() => OnSelectItem((c) => item)}
    >
      <UserInfo user={item} gap={"gap-4"} size={imgSize} />
      <div className="flex gap-2 items-center">
        {unreadMessage && (
          <span className="bg-plum rounded-xl w-6 flex justify-center items-center text-white group-hover:bg-listItem ">
            20
          </span>
        )}
      </div>
    </div>
  );
}
