import { useEffect, useRef, useState } from "react";
import TypeBar from "./typeBar/TypeBar";
import axios from "axios";
import Message from "./messages/Message";
import echo from "../echo";
import useClickOutsideEvent from "../hooks/useClickOutsideEvent";

export function Main({ children, selectedItem }) {
  const [messages, setMessages] = useState([]);
  const main_dev = useRef(null);

  useEffect(() => {
    main_dev.current.scrollTop = main_dev.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    async function getMessages() {
      try {
        let url =
          selectedItem?.friend?.type === "user"
            ? process.env.REACT_APP_BACKEND_DOMAIN + "/api/friendship_messages"
            : process.env.REACT_APP_BACKEND_DOMAIN + "/api/...";
        const res = await axios.post(url, {
          socket_id: selectedItem?.socket_id,
        });
        console.log("messages fetched");
        setMessages((c) => res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getMessages();
  }, [selectedItem]);

  // listen for incoming messages
  useEffect(() => {
    echo
      .join(`message.${selectedItem?.socket_id}`)
      .here((user) => {
        console.log("socket => ", user);
      })
      .listen(".message-event", (e) => {
        setMessages((c) => [...c, e.message]);
      })
      .listenForWhisper("typing", (e) => {
        // alert("go");
      });
    return () => {
      echo.leaveChannel("p2p_message");
    };
  }, [selectedItem]);

  return (
    <div
      className="flex flex-col h-full p-2 overflow-auto bg-roomColor
    hide-scrollbar"
      ref={main_dev}
    >
      {/* {children} */}
      {messages.map((m, i) => (
        <Message message={m} key={i} isInGroup={false} />
      ))}
    </div>
  );
}
