import axios from "axios";
import SimpleBtn from "../../fregments/buttons/SimpleBtn";
import UserInfo from "../../fregments/others/UserInfo";

export default function Item({
  requestObj,
  handleAcceptRequest,
  handleDeclineRequest,
}) {
  return (
    <div className="flex flex-col  w-56 gap-2 p-2  bg-listItem  ">
      <UserInfo
        user={requestObj.sender}
        gap={"gap-4"}
        size={"w-12 h-12"}
        msg={"has sent you a friend request"}
      />

      <div className="flex  justify-between w-">
        <button
          className="text-green-400 h-fit  rounded"
          onClick={() => handleAcceptRequest(requestObj)}
        >
          accept
        </button>
        <button
          className="text-red-400  h-fit  rounded"
          onClick={() => handleDeclineRequest(requestObj)}
        >
          decline
        </button>
      </div>
    </div>
  );
}
