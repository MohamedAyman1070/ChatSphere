import { Link } from "react-router-dom";
import Item from "./Item";
import useSearch from "../../../hooks/useSearch";
import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { DataContext } from "../../../context/DataProvider";

export default function Searcbox({}) {
  const [query, setQuery] = useState("");
  const [results, setResult] = useState({ groups: [], users: [] });
  const { setToasts } = useContext(DataContext);
  useEffect(() => {
    async function search() {
      try {
        if (query.length < 2) {
          setResult({ groups: [], users: [] });
          return;
        }
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/api/search?q=${query}`
        );
        setResult(res.data?.result);
      } catch (err) {
        setToasts((c) => [...c, err?.response?.data?.message]);
      }
    }
    search();
  }, [query, setToasts]);
  const debounceChange = debounce((e) => setQuery(e.target.value), 500);
  return (
    <div className="rounded-2xl overflow-hidden w-full max-h-60 z-40 bg-textbox p-2 flex flex-col gap-2">
      <input
        type="text"
        placeholder="search..."
        className=" ml-2 bg-textbox text-white outline-none w-full"
        onChange={(e) => debounceChange(e)}
      />
      {results.users.length > 0 || results.groups.length > 0 ? (
        <div className=" border-t-2 hide-scrollbar overflow-auto border-t-container p-2  flex flex-col gap-2  w-full">
          {results.users.map((user) => (
            <Item
              key={user.slug}
              item={user}
              imgSize={"w-12 h-12"}
              textSize={"text-sm"}
            />
          ))}
          {/* {results.groups.map((group) => (
            <Link to={`/home/group/profile/${group.slug}`} key={group.slug}>
              <Item item={group} />
            </Link>
          ))} */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
