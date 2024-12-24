import { useContext, useEffect, useRef, useState } from "react";
import TypeBar from "./typeBar/TypeBar";
import axios from "axios";
import Message from "./messages/Message";
import echo from "../echo";
import useClickOutsideEvent from "../hooks/useClickOutsideEvent";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import CircelSpinner from "../fregments/spinners/CircleSpinner";

export function Main({ children }) {
  const { selectedItem } = useContext(DataContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const main_dev = useRef(null);
  // console.log(messages);
  const { slug } = useParams();
  console.log(slug, selectedItem);

  useEffect(() => {
    main_dev.current.scrollTop = main_dev.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    async function getMessages() {
      try {
        setIsLoading(true);
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/chatMessages",
          {
            socket_id: selectedItem?.socket_id,
          }
        );
        console.log("messages fetched");
        setMessages((c) => res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
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
        console.log("broadcast");
        setMessages((c) => [...c, e.message]);
      })
      .listenForWhisper("typing", (e) => {
        // alert("go");
      });
    console.log("listen");
    return () => {
      console.log("leave");
      echo.leave(`message.${selectedItem?.socket_id}`);
    };
  }, [selectedItem]);

  return (
    <div
      className="
        flex-col  flex-grow overflow-auto  p-2  bg-roomColor
        hide-scrollbar
      "
      ref={main_dev}
    >
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <CircelSpinner />
        </div>
      ) : (
        messages.map((m, i) => (
          <Message
            message={m}
            key={i}
            isInGroup={selectedItem.friend === undefined}
          />
        ))
      )}
    </div>
  );
}
