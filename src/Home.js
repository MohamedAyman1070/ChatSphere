import { Main } from "./chat/Main";
import Message from "./chat/messages/Message";
import TypeBar from "./chat/typeBar/TypeBar";
import echo from "./echo";
import Toast from "./fregments/others/Toast";
import Header from "./header/Header";
import { ItemsList } from "./sidebar/ItemsList";
import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";

let objItem = {
  name: "mentheman4",
  image:
    "https://th.bing.com/th/id/OIP.VTBzGQySOYLDke_xg2OfEQHaFj?w=244&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
};

const items = [
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
  objItem,
];

// const items = [];

const message = {
  text: "hello man !",
  user: objItem,
};
const myMessage = {
  text: "hi there",
  user: {
    name: "John",
    image:
      "https://th.bing.com/th/id/OIP.VTBzGQySOYLDke_xg2OfEQHaFj?w=244&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
};

const messages = [
  message,
  myMessage,
  message,
  myMessage,
  message,
  message,
  myMessage,
  message,
];
objItem = null;

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [refetchFriends, setRefetchFriends] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  function reducer(notifications, notify) {
    switch (notify.type) {
      case "notify-hasRequest":
        return { ...notifications, hasNewRequest: true };
      case "notify-request-seen":
        return { ...notifications, hasNewRequest: false };
      case "notify-hasNewFriend":
        return { ...notifications, hasNewFriend: true };
      default:
        throw new Error("undefined notification type (" + notify.type + ")");
    }
  }

  const [notifications, dispatch] = useReducer(reducer, {
    hasNewRequest: false,
    hasNewFriend: false,
    hasNotifications: function () {
      return this.hasNewFriend || this.hasNewRequest;
    },
  });

  // listen for request notifications
  useEffect(() => {
    const channel = echo
      .private(`request.sent.${JSON.parse(localStorage.getItem("user"))?.slug}`)
      .listen(".request-event", (e) => {
        dispatch({ type: "notify-hasRequest" });
      });
    return () => {
      channel.stopListening(".request-event");
    };
  }, []);

  // listen for accepted requests
  useEffect(() => {
    const channel = echo
      .private(
        `request.accepted.${JSON.parse(localStorage.getItem("user"))?.slug}`
      )
      .listen(".request-event", (e) => {
        dispatch({ type: "notify-hasNewFriend" });
        setRefetchFriends((c) => !c);
      });
    return () => {
      channel.stopListening(".request-event");
    };
  }, []);

  // get preRequests in intial render
  useEffect(() => {
    async function requests() {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/request/received"
        );

        if (res.data.data.length > 0) {
          dispatch({ type: "notify-hasRequest" });
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }
    requests();
  }, []);

  //fetch friends
  useEffect(() => {
    async function fetchFriends() {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/friends"
        );
        console.log("refetching friends");
        console.log(res);
        setItems((c) => res.data.friends);
      } catch (err) {
        console.log(err?.response?.data);
      }
    }
    fetchFriends();
  }, [refetchFriends]);
  return (
    <>
      <div className="grid grid-cols-1 h-screen bg-slate-600">
        <div className="flex overflow-hidden ">
          {/* {showToast && <Toast setShowToast={setShowToast} />} */}
          {showSidebar && (
            <Sidebar
              show={showSidebar}
              selectedItem={selectedItem}
              OnSelectItem={setSelectedItem}
              OnRefetchFriends={setRefetchFriends}
              items={items}
              notifications={notifications}
              notifyAction={dispatch}
            />
          )}
          <div className="flex flex-col w-full ">
            <Header
              selectedItem={selectedItem}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              notifications={notifications}
            />
            <div className="bg-roomColor flex flex-col overflow-hidden h-full">
              {selectedItem ? (
                <>
                  <Main selectedItem={selectedItem} />
                  <TypeBar selectedItem={selectedItem} />
                </>
              ) : (
                <p
                  className="text-4xl text-center"
                  style={{ fontFamily: "Monoton" }}
                >
                  ChatSphere
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
