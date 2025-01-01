import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../fregments/others/Slider";
import CircleSpinner from "../fregments/spinners/CircleSpinner";
import UserInfo from "../fregments/others/UserInfo";
import { AuthContext } from "../context/AuthProvider";
import { DataContext } from "../context/DataProvider";
export default function GroupInfo() {
  const { slug } = useParams();
  const [group, setGroup] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { OnRefetchItems, setToasts } = useContext(DataContext);
  useEffect(() => {
    async function getGroup() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN + `/api/groups/${slug}`
        );
        setGroup((g) => res.data.data);
        console.log(res.data);
        if (group === undefined) navigate(-1);
      } catch (err) {
        setToasts((c) => [...c, err?.response?.data?.message]);
      } finally {
        setIsLoading(false);
      }
    }
    getGroup();
  }, [slug]);
  function handleGoBack() {
    navigate(-1);
  }
  async function handleLeaveGroup() {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_DOMAIN + "/api/leave-group",
        { slug: group.slug }
      );
      OnRefetchItems((c) => !c);
      navigate("/home");
    } catch (err) {
      setToasts((c) => [...c, err?.response?.data?.message]);
    }
  }

  async function handleDelete() {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_DOMAIN + `/api/groups/${group.slug}`
      );
      OnRefetchItems((c) => !c);
      navigate("/home");
    } catch (err) {
      setToasts((c) => [...c, err?.response?.data?.message]);
    }
  }

  return (
    <div className="flex flex-col items-center    flex-grow overflow-auto hide-scrollbar">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <CircleSpinner />
        </div>
      ) : (
        <>
          <div className="w-full ">
            <div className="rounded-full  w-10 h-10 m-2 flex justify-center items-center bg-listHeader p-2 ">
              <button
                onClick={() => handleGoBack()}
                className="text-normalTextColor text-2xl hover:text-plumButton duration-300"
              >
                &larr;
              </button>
            </div>
          </div>
          <div className="flex flex-col p-2 w-full items-center gap-4 ">
            {/* profile image and name */}
            <img
              className="w-60 border-4 border-black  h-60 rounded-full object-cover"
              src={group?.image}
              alt="group"
            />
            <span className="text-normalTextColor font-bold text-3xl">
              {group?.name}
            </span>
          </div>

          {/* description */}
          <div className="p-2 flex flex-col gap-2 w-full ">
            <p className="text-xl text-normalTextColor">Description</p>
            {group?.description ? (
              <div className="w-ful sm:w-4/5 m-auto ">
                <p className="text-normalTextColor ml-2 bg-listHeader  p-2 ">
                  {group?.description}
                </p>
              </div>
            ) : (
              <div className="p-2 bg-listHeader text-center text-normalTextColor">
                no descritpion!
              </div>
            )}
          </div>

          {/* admin and participants */}
          <div className="  w-full">
            <div className="p-2 flex flex-col gap-2  w-full">
              <p className="text-xl text-normalTextColor">Admin</p>
              <div className="p-2 bg-listHeader w-full sm:w-3/5 m-auto rounded">
                <UserInfo user={group?.relations?.admin} gap={"gap-4"} />
              </div>
            </div>

            <div className="p-2 flex flex-col gap-2 m-auto w-full">
              <p className="text-xl text-normalTextColor">Participants</p>
              {group?.relations?.participants?.length > 0 ? (
                <div className="p-2 bg-listHeader w-full sm:w-4/5 m-auto rounded">
                  <Slider dataCollection={group?.relations?.participants} />
                </div>
              ) : (
                <div className="p-2  bg-listHeader text-center text-normalTextColor">
                  no Participants!
                </div>
              )}
            </div>

            {group?.relations?.participants
              .map((user) => user.slug)
              .includes(auth.slug) && (
              <div className="w-full flex justify-center ">
                <button
                  onClick={() => handleLeaveGroup()}
                  className="bg-red-700 m-2 rounded p-2 w-fit text-normalTextColor"
                >
                  leave
                </button>
              </div>
            )}

            <div>
              {/* for owner 
                {
                    edit profile
                }
            */}
              {auth.slug === group?.relations?.admin?.slug && (
                <div className="flex justify-center w-full">
                  <button
                    onClick={() => handleDelete()}
                    className="bg-red-700 p-2 m-2 rounded w-fit text-normalTextColor "
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
