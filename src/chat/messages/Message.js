import TextExpander from "../../fregments/others/TextExpander";
import MessageLeftTail from "./MessageLeftTail";
import MessageRightTail from "./MessageRightTail";
import UserInfo from "../../fregments/others/UserInfo";

export default function Message({ message }) {
  return (
    <div className="flex p-2 gap-8 items-center w-full h-fit place-self-center ">
      <UserInfo user={message.user} flex_dir={"flex-col"} />
      <div className=" p-4 h-fit bg-myMessageColor relative rounded text-normalTextColor">
        <TextExpander>{message.text}</TextExpander>
        <MessageLeftTail tailColor={"bg-myMessageColor"} />
        {/* <MessageRightTail tailColor={"bg-myMessageColor"} /> */}
      </div>
    </div>
  );
}
