import axios from "axios";
import UserInfo from "../../others/UserInfo";

export default function Item({ item, imgSize = "w-14 h-14", textSize }) {
  function handleSendRequest() {
    async function sendRequest() {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/request/send-friend",
          {
            receiver_slug: item.slug,
            type: "friend-request",
          }
        );
        console.log("request sent");
      } catch (err) {
        console.log(err);
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
            <button onClick={handleSendRequest}>
              <i className="fa-solid fa-user-plus fa-l text-icons group-hover:text-white "></i>
            </button>
            <span className=" cursor-pointer"></span>
          </div>
        </div>
      )}
    </div>
  );
}
