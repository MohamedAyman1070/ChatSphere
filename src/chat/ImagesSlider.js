import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CircelSpinner from "../fregments/spinners/CircleSpinner";
export default function ImageSlider() {
  const { message_slug } = useParams();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function getMessage() {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN +
            `/api/messages/${message_slug}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );
        setAssets(res.data.data.assets);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getMessage();
  }, [message_slug]);
  return (
    <div className="flex flex-col top-0 left-0 w-full h-full absolute z-50 bg-black bg-opacity-80  ">
      {/* close button */}
      <div className="w-full ">
        <button
          onClick={handleBack}
          className="rounded-full m-2 flex justify-center items-center w-10 h-10 bg-slate-900 text-xl hover:text-plum duration-300 text-normalTextColor"
        >
          <span className="-mt-1">&larr;</span>
        </button>
      </div>
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <CircelSpinner />
        </div>
      ) : (
        <div className="overflow-auto m-auto w-4/5 h-full  hide-scrollbar ">
          {assets?.map((img) => (
            <img
              src={img.URL}
              alt="asset"
              key={img.id}
              className="m-4 w-full object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
