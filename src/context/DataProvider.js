import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { AuthContext } from "./AuthProvider";
import echo from "../echo";
import axios from "axios";

export const DataContext = createContext({});

export default function DataProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [refetchItems, setRefetchItems] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { auth } = useContext(AuthContext);
  const user = auth;
  console.log("from provider");
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
        const ApiItems = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/friends-and-groups"
        );
        console.log("refetching items");

        setItems((c) => ApiItems.data);
        // console.log(ApiItems);
      } catch (err) {
        console.log("err from items fetch : ", err?.response?.data);
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
