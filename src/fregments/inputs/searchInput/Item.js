import axios from "axios";
import UserInfo from "../../others/UserInfo";
import { useContext, useState } from "react";
import { DataContext } from "../../../context/DataProvider";

export default function Item({ item, imgSize = "w-14 h-14", textSize }) {
  const { setToasts } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  function handleSendRequest() {
    async function sendRequest() {
      try {
        setIsLoading(true);
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/request/send-friend",
          {
            receiver_slug: item.slug,
            type: "friend-request",
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        );
      } catch (err) {
        setToasts((c) => [...c, err?.response?.data?.message]);
      } finally {
        setIsLoading(false);
      }
    }
    sendRequest();
  }

  return (
    <div className="flex justify-between flex-wrap items-center p-4 bg-listItem hover:bg-plum transition duration-300 group">
      <UserInfo user={item} gap={"gap-4"} size={imgSize} textSize={textSize} />
      {item.type === "user" && (
        <div className="flex gap-2 items-center">
          <div>
            {isLoading ? (
              <p className="text-gray-600 animate-pulse duration-300 text-sm">
                loading
              </p>
            ) : (
              <button onClick={handleSendRequest}>
                <i className="fa-solid fa-user-plus fa-l text-icons group-hover:text-white "></i>
              </button>
            )}
            <span className=" cursor-pointer"></span>
          </div>
        </div>
      )}
    </div>
  );
}
