import TextExpander from "../../fregments/others/TextExpander";
import MessageLeftTail from "./MessageLeftTail";
import MessageRightTail from "./MessageRightTail";
import UserInfo from "../../fregments/others/UserInfo";

export default function Message({ message, isInGroup }) {
  // just for example
  // const currUser = {
  //   name: "John",
  //   image:
  //     "https://th.bing.com/th/id/OIP.VTBzGQySOYLDke_xg2OfEQHaFj?w=244&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  // };

  const currUser = JSON.parse(localStorage.getItem("user"));

  const otherMessageStyle = "flex p-4 gap-8  items-center w-full  h-fit ";
  const myMessageStyle =
    "flex p-4 gap-8  items-center w-full  h-fit    flex flex-row-reverse";

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
