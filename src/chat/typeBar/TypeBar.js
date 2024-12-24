import Emoji from "./Emoji";
import Textbox from "../../fregments/inputs/Textbox";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";

export default function TypeBar({}) {
  const { selectedItem } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    function resizeTextarea() {
      textarea.style.height = "2.5rem";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    textarea.addEventListener("input", resizeTextarea);
    resizeTextarea();
    return () => {
      textarea.removeEventListener("input", resizeTextarea);
    };
  }, []);

  function handleSendMessage() {
    console.log("typebar");
    async function sendMessage() {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/messages",
          {
            text: message,
            socket_id: selectedItem.socket_id,
          }
        );
        console.log("msg is sent");
        setMessage((m) => "");
      } catch (err) {
        console.log(err);
      }
    }
    sendMessage();
  }

  return (
    <div className="flex p-2 w-full  self-end bg-headerColor h-fit">
      {/* <Emoji /> */}
      <div
        className="flex items-center gap-2 flex-grow 
      justify-center"
      >
        <div className="rounded-3xl  p-1 overflow-hidden  bg-textbox h-fit flex sm:w-2/5 w-4/5 ">
          {/* <Textbox placeholder={"Type a Message"} setState={setMessage} /> */}
          <textarea
            value={message}
            ref={textareaRef}
            className=" hide-scrollbar  p-2 bg-textbox  resize-none h-10 max-h-52  text-white outline-none w-full"
            placeholder="Type a Message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="flex  items-center">
            <button className="m-1">
              <i className="fa-solid fa-image fa-xl text-icons"></i>
            </button>
          </div>
        </div>
        {/* send message button */}
        <div className="flex h-full p-2  items-end">
          <button onClick={() => handleSendMessage()}>
            <i className="fa-solid fa-paper-plane fa-xl text-icons hover:scale-125 hover:text-plumButton duration-300"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
