import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { AuthContext } from "./AuthProvider";
import { getEcho } from "../echo";
import axios from "axios";
import { useParams } from "react-router-dom";

export const DataContext = createContext({});

export default function DataProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [refetchItems, setRefetchItems] = useState(false);
  const [items, setItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [invetationTempURL, setInvetationTempURL] = useState(null);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [userTyping, setUserTyping] = useState("");
  const { auth } = useContext(AuthContext);
  const echo = getEcho();
  const user = auth;
  function reducer(notifications, notify) {
    switch (notify.type) {
      case "notify-hasRequest":
        return { ...notifications, hasNewRequest: true };
      case "notify-request-seen":
        return { ...notifications, hasNewRequest: false };
      case "notify-hasNewFriend":
        return { ...notifications, hasNewFriend: true };
      case "notify-joinedGroup":
        return { ...notifications, hasNewGroup: true };
      default:
        throw new Error("undefined notification type (" + notify.type + ")");
    }
  }

  const [notifications, dispatch] = useReducer(reducer, {
    hasNewRequest: false,
    hasNewFriend: false,
    hasNewGroup: false,
    hasNotifications: function () {
      return this.hasNewRequest;
    },
  });

  // listen for request notifications
  useEffect(() => {
    const channel = echo
      .private(`request.sent.${user?.slug}`)
      .listen(".request-event", (e) => {
        dispatch({ type: "notify-hasRequest" });
      });
    return () => {
      channel.stopListening(".request-event");
    };
  }, [user]);

  // listen for accepted requests
  useEffect(() => {
    const channel = echo
      .private(`request.accepted.${user?.slug}`)
      .listen(".request-event", (e) => {
        dispatch({ type: "notify-hasNewFriend" });
        setRefetchItems((c) => !c);
      });
    return () => {
      channel.stopListening(".request-event");
    };
  }, [user]);

  // get preRequests in intial render
  useEffect(() => {
    async function requests() {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/request/received",
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );

        if (res.data.data.length > 0) {
          dispatch({ type: "notify-hasRequest" });
        }
      } catch (err) {
        setToasts((c) => [...c, err?.response?.data?.message]);
      }
    }
    requests();
  }, []);

  //fetch friends
  useEffect(() => {
    async function fetchFriends() {
      try {
        setIsLoadingItems(true);
        const ApiItems = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/friends-and-groups",
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );
        console.log("refetching items");

        setItems((c) => ApiItems.data);
        // console.log(ApiItems);
      } catch (err) {
        setToasts((c) => [...c, err?.response?.data?.message]);
      } finally {
        setIsLoadingItems(false);
      }
    }
    fetchFriends();
  }, [refetchItems]);

  return (
    <DataContext.Provider
      value={{
        selectedItem,
        OnRefetchItems: setRefetchItems,
        OnSelectItem: setSelectedItem,
        items,
        notifications,
        notifyAction: dispatch,
        showSidebar,
        setShowSidebar,
        isLoadingItems,
        isSendingMessage,
        setIsSendingMessage,
        toasts,
        setToasts,
        userTyping,
        setUserTyping,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
