import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CircelSpinner from "../fregments/spinners/CircleSpinner";

export default function GroupInvetationAcceptor() {
  const { param } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!param) return;
    async function acceptInvetation() {
      try {
        setIsLoading(true);
        setError("");
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN +
            "/join-group/" +
            param +
            `?expires=${searchParams.get(
              "expires"
            )}&signature=${searchParams.get("signature")}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );
        console.log(res);
        navigate(`/home/chat-room/${param}`);
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    acceptInvetation();
  }, [param]);
  return (
    <div className="flex-grow flex items-center bg-roomColor ">
      <div className="m-auto p-2 w-fit rounded  ">
        <p className="text-2xl text-normalTextColor">
          accepting your group invetations
        </p>

        <div className="flex p-2 justify-center">
          {isLoading && <CircelSpinner />}
        </div>

        <p className="text-sm text-errColor text-center">{error}</p>
      </div>
    </div>
  );
}
