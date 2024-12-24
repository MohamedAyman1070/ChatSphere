import TextExpander from "../../fregments/others/TextExpander";
import MessageLeftTail from "./MessageLeftTail";
import MessageRightTail from "./MessageRightTail";
import UserInfo from "../../fregments/others/UserInfo";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Message({ message, isInGroup }) {
  const { auth } = useContext(AuthContext);
  const currUser = auth;
  console.log("in group", isInGroup);
  const otherMessageStyle = "flex  gap-8 p-6   items-center w-full  h-fit ";
  const myMessageStyle =
    "flex  gap-8  items-center  w-full  h-fit p-6   flex flex-row-reverse";

  let style =
    currUser.slug === message.owner.slug ? myMessageStyle : otherMessageStyle;

  let msgStyle = " p-4 h-fit  relative  rounded  text-normalTextColor";

  currUser.slug === message.owner.slug
    ? (msgStyle += " bg-myMessageColor mr-2 ")
    : (msgStyle += " bg-otherMessageColor ml-2");
  return (
    <div className={style}>
      {isInGroup && <UserInfo user={message.owner} flex_dir={"flex-col"} />}
      <div className={msgStyle}>
        <TextExpander>{message.text}</TextExpander>
        {currUser.slug === message.owner.slug ? (
          <MessageRightTail tailColor={"bg-myMessageColor"} />
        ) : (
          <MessageLeftTail tailColor={"bg-otherMessageColor"} />
        )}
      </div>
    </div>
  );
}
