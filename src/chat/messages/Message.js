import TextExpander from "../../fregments/others/TextExpander";
import MessageLeftTail from "./MessageLeftTail";
import MessageRightTail from "./MessageRightTail";
import UserInfo from "../../fregments/others/UserInfo";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import DotsSpinner from "../../fregments/spinners/DotsSpinner";
import ImageDispalyer from "./ImagesDisplayer";
export default function Message({ message, isInGroup, placeholder = false }) {
  const { auth } = useContext(AuthContext);
  const [timestamps, setTimeStamps] = useState(function () {
    const date = new Date(message.timestamps.pop());

    return date.toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });
  const currUser = auth;
  const otherMessageStyle = "flex  gap-8 p-6   items-center w-full  h-fit ";
  const myMessageStyle =
    "flex  gap-8  items-center  w-full   h-fit p-6   flex flex-row-reverse";
  let style =
    currUser.slug === message.owner.slug ? myMessageStyle : otherMessageStyle;

  let msgStyle = "  h-fit max-w-60 relative   rounded  text-normalTextColor";

  currUser.slug === message.owner.slug
    ? (msgStyle += " bg-myMessageColor mr-2 ")
    : (msgStyle += " bg-otherMessageColor ml-2");

  return (
    <div className={style}>
      {isInGroup && (
        <div className=" place-self-end">
          <UserInfo user={message.owner} flex_dir={"flex-col"} />
        </div>
      )}
      <div className={msgStyle}>
        <ImageDispalyer assets={message.assets} message_slug={message.slug} />
        <TextExpander>{message.text}</TextExpander>
        {currUser.slug === message.owner.slug ? (
          <MessageRightTail tailColor={"bg-myMessageColor"} />
        ) : (
          <MessageLeftTail tailColor={"bg-otherMessageColor"} />
        )}
        <div className=" w-32 ml-2">
          <span className="text-xs font-light  text-gray-500">
            {timestamps}
          </span>
        </div>
      </div>
    </div>
  );
}
