import { useRef, useState } from "react";
import Item from "./Item";
import useClickOutsideEvent from "../../hooks/useClickOutsideEvent";
import axios from "axios";
import SimpleCircleSpinner from "../../fregments/spinners/SimpleCircleSpinner";

export default function Notification({
  OnRefetchItems,
  hasNewRequest,
  notifyAction,
}) {
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const notificationList = useRef(null);
  useClickOutsideEvent(notificationList, setShowList, null);

  function received_requests() {
    async function requests() {
      try {
        notifyAction({ type: "notify-request-seen" });
        setIsLoading(true);
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/request/received",
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );
        console.log(res.data);
        setRequests(res.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.response.data);
      }
    }
    requests();
    setShowList((c) => !c);
  }
  function handleAcceptRequest(requestObj) {
    async function acceptRequest() {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/request/accept",
          {
            request_id: requestObj.id,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );
      } catch (err) {
        console.log(err.response.data);
      }
    }
    acceptRequest();
    setRequests((curr) => curr.filter((req) => req.id !== requestObj.id));
    OnRefetchItems((c) => !c);
  }
  function handleDeclineRequest(requestObj) {
    async function declineRequest() {
      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_DOMAIN + "/api/request/reject",
          {
            request_id: requestObj.id,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );
        console.log("Request rejected");
      } catch (err) {
        console.log(err?.response?.data);
      }
    }
    declineRequest();
    setRequests((curr) => curr.filter((req) => req.id !== requestObj.id));
  }

  return (
    <div className="flex flex-col justify-center ">
      <button className="relative" onClick={() => received_requests()}>
        <span className="p-2">
          <i className="fa-solid fa-bell text-icons fa-xl hover:text-plum duration-300"></i>
        </span>
        {hasNewRequest && (
          <span className="absolute p-1 bg-plumButton rounded-full"></span>
        )}
      </button>
      {showList && (
        <div
          className="absolute top-16 left-4 min-w-56 min-h-40   flex items-center  z-50 bg-container p-2 rounded  "
          ref={notificationList}
        >
          <div className="absolute -top-4 w-0 h-0  border-l-[15px] border-b-[20px] border-r-[15px] border-transparent border-b-container "></div>
          {isLoading ? (
            <div className="flex  w-full justify-center">
              <SimpleCircleSpinner height="h-10" width="w-10" />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center w-56 gap-1 hide-scrollbar max-h-72 overflow-auto ">
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <Item
                      requestObj={request}
                      key={request.id}
                      handleAcceptRequest={handleAcceptRequest}
                      handleDeclineRequest={handleDeclineRequest}
                    />
                  ))
                ) : (
                  <p className="text-normalTextColor">No Notification</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
