import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../fregments/others/Slider";
import CircleSpinner from "../fregments/spinners/CircleSpinner";
import { DataContext } from "../context/DataProvider";
export default function UserInfo() {
  const { slug } = useParams();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setRefetchItems, setToasts } = useContext(DataContext);
  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN + `/api/users/${slug}`
        );
        setUser(res.data.data);
        console.log("hay", res.data);
      } catch (err) {
        setToasts((c) => [...c, err?.response?.data?.message]);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, [slug]);
  function handleGoBack() {
    navigate(-1);
  }
  async function handleRemoveFriend() {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_DOMAIN + "/api/remove-friend",
        {
          slug: user.slug,
        }
      );
      setRefetchItems((c) => !c);
      navigate("/home");
    } catch (err) {
      setToasts((c) => [...c, err?.response?.data?.message]);
    }
  }
  return (
    <div className="flex flex-col items-center   flex-grow overflow-auto hide-scrollbar">
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

          <div className="flex flex-col p-2  w-full items-center gap-4 ">
            {/* profile image and name */}
            <img
              className="w-60 border-4 border-black  h-60 rounded-full object-cover"
              src={user?.image}
              alt="user"
            />
            <span className="text-normalTextColor font-bold text-3xl">
              {user?.name}
            </span>
          </div>

          {/* description */}
          <div className="p-2 flex flex-col gap-2  w-full ">
            <p className="text-xl text-normalTextColor">Description</p>
            {user.description ? (
              <div className=" w-full sm:w-4/5 m-auto rounded">
                <p className="text-normalTextColor ml-2 bg-listHeader p-2">
                  {user?.description}
                </p>
              </div>
            ) : (
              <div className="p-2 w-4/5 m-auto rounded bg-listHeader text-center text-normalTextColor">
                no descritpion!
              </div>
            )}
          </div>

          {/* friends and groups */}
          <div className=" w-full">
            <div className="p-2 flex flex-col gap-2  w-full">
              <p className="text-xl text-normalTextColor">Friends</p>
              {user.relations.friends ? (
                <div className="p-2 w-full sm:w-4/5 m-auto rounded  bg-listHeader">
                  <Slider dataCollection={user?.relations?.friends} />
                </div>
              ) : (
                <div className="p-2 bg-listHeader text-center text-normalTextColor">
                  no Friends!
                </div>
              )}
            </div>

            <div className="p-2 flex flex-col gap-2  w-full">
              <p className="text-xl text-normalTextColor">Groups</p>
              {user.relations.owned_groups.length > 0 ||
              user.relations.subscribed_group.length > 0 ? (
                <div className="p-2 w-full rounded m-auto sm:w-4/5 bg-listHeader">
                  <Slider
                    dataCollection={user?.relations?.owned_groups
                      .concat(user?.relations?.subscribed_group)
                      .filter((el) => el)}
                  />
                </div>
              ) : (
                <div className="p-2  bg-listHeader text-center text-normalTextColor">
                  no Groups!
                </div>
              )}
            </div>

            {/* remove friend script */}
            {/* <div className="w-full flex justify-center ">
              <button
                onClick={() => handleRemoveFriend()}
                className="bg-red-700 m-2 rounded p-2 w-fit text-normalTextColor"
              >
                unFriend
              </button>
            </div> */}

            <div>
              {/* for owner 
                {
                    edit profile
                }
            */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
