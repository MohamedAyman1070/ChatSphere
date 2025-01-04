import Emoji from "./Emoji";
import Textbox from "../../fregments/inputs/Textbox";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";
import { getEcho } from "../../echo";
import { AuthContext } from "../../context/AuthProvider";
import { debounce } from "lodash";

export default function TypeBar({}) {
  const { selectedItem, setIsSendingMessage, setToasts } =
    useContext(DataContext);
  const [message, setMessage] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  const textareaRef = useRef(null);
  const { auth } = useContext(AuthContext);
  const echo = getEcho();
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

  async function uploadImage(image) {
    if (image.size > 1024 * 1024 * 2) {
      //2mb
      //dispatch a toast
      setToasts((c) => [...c, "image size must be less than or equal to 2mb"]);
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    // formData.append("folder", "Avatars");
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          withCredentials: false,
          withXSRFToken: false,
        }
      );
      var cloudImage = res.data;
    } catch (err) {
      setToasts((c) => [...c, err?.response?.data?.message]);
    }
    return cloudImage.secure_url;
  }

  function handleOnChangeMessage(e) {
    echo
      .join(`message.${selectedItem?.socket_id}`)
      .whisper("typing", { user: auth });
    setMessage(e.target.value);
    handleStopeTypeing();
  }
  const handleStopeTypeing = debounce(() => {
    echo
      .join(`message.${selectedItem?.socket_id}`)
      .whisper("stoppedTyping", { user: auth });
  }, 2000);

  async function handleSendMessage() {
    try {
      setIsSendingMessage(true);
      const msg = message;
      setMessage((m) => "");
      const asset_array = [];
      if (imagesArray.length > 0) {
        for (let image of imagesArray) {
          asset_array.push(await uploadImage(image));
        }
      }
      setImagesArray([]);
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_DOMAIN + "/api/messages",
        {
          text: msg,
          socket_id: selectedItem?.socket_id,
          asset_array,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        }
      );
      textareaRef.current.style.height = "2.5rem";
    } catch (err) {
      setToasts((c) => [...c, err?.response?.data?.message]);
    } finally {
      setIsSendingMessage(false);
    }
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
            onChange={(e) => handleOnChangeMessage(e)}
          ></textarea>
          <div className="flex  items-center">
            <label htmlFor="upload" className="m-1 cursor-pointer relative">
              <i className="fa-solid fa-image fa-xl text-icons"></i>
              {imagesArray.length > 0 && (
                <span className="text-xs rounded-full w-4 h-4 bg-plumButton text-center  text-normalTextColor absolute -top-2 right-3 ">
                  {imagesArray.length}
                </span>
              )}
            </label>
            <input
              id="upload"
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImagesArray((c) => [...c, e.target.files[0]]);
              }}
            />
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
