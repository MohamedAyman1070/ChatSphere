import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Message from "./messages/Message";
import echo from "../echo";
import { Outlet } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import CircelSpinner from "../fregments/spinners/CircleSpinner";
import MessagePlaceholder from "./messages/MessagePlaceholder";

export function Main({ children }) {
  const { selectedItem, isSendingMessage, setToasts, setUserTyping } =
    useContext(DataContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const main_dev = useRef(null);
  useEffect(() => {
    main_dev.current.scrollTop = main_dev.current.scrollHeight;
  }, [messages, isSendingMessage]);

  useEffect(() => {
    async function getMessages() {
      try {
        setIsLoading(true);
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/chatMessages",
          {
            socket_id: selectedItem?.socket_id,
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );
        setMessages((c) => res.data);
        //if(res.data === '') navigate(-1)
      } catch (err) {
        setToasts((c) => [...c, err?.response?.data?.message]);
      } finally {
        setIsLoading(false);
      }
    }

    getMessages();
  }, [selectedItem, setToasts]);

  // listen for incoming messages
  useEffect(() => {
    echo
      .join(`message.${selectedItem?.socket_id}`)
      .here((user) => {
        // console.log("socket => ", user);
      })
      .listen(".message-event", (e) => {
        console.log("broadcast");
        setMessages((c) => [...c, e.message]);
      })
      .listenForWhisper("typing", (e) => {
        setUserTyping(e.user.name);
      })
      .listenForWhisper("stoppedTyping", (e) => {
        setUserTyping("");
      });
    return () => {
      echo.leave(`message.${selectedItem?.socket_id}`);
    };
  }, [selectedItem]);

  return (
    <div
      className="flex-col  flex-grow overflow-auto   p-2  bg-roomColor
        hide-scrollbar 
      "
      ref={main_dev}
    >
      <Outlet />
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <CircelSpinner />
        </div>
      ) : (
        messages?.map?.((m, i) => (
          <Message
            message={m}
            key={i}
            isInGroup={selectedItem?.friend === undefined}
          />
        ))
      )}
      {isSendingMessage && (
        <MessagePlaceholder isInGroup={selectedItem?.friend === undefined} />
      )}
    </div>
  );
}
