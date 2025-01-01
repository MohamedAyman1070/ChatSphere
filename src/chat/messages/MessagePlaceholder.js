import TextExpander from "../../fregments/others/TextExpander";
import MessageLeftTail from "./MessageLeftTail";
import MessageRightTail from "./MessageRightTail";
import UserInfo from "../../fregments/others/UserInfo";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import DotsSpinner from "../../fregments/spinners/DotsSpinner";

export default function MessagePlaceholder({ isInGroup = false }) {
  const { auth } = useContext(AuthContext);
  const currUser = auth;
  const otherMessageStyle = "flex  gap-8 p-6   items-center w-full  h-fit ";
  const myMessageStyle =
    "flex  gap-8  items-center  w-full   h-fit p-6   flex flex-row-reverse";

  let style = myMessageStyle;

  let msgStyle =
    " p-4 h-fit max-w-60 relative   bg-myMessageColor mr-2  rounded  text-normalTextColor";

  return (
    <div className={style}>
      {isInGroup && (
        <div className=" place-self-end">
          <UserInfo user={currUser} flex_dir={"flex-col"} />
        </div>
      )}
      <div className={msgStyle}>
        <DotsSpinner />
        <MessageRightTail tailColor={"bg-myMessageColor"} />
      </div>
    </div>
  );
}
