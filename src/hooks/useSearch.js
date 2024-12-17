import axios from "axios";
import { useEffect, useState } from "react";

export default function useSearch(query = "") {
  const [result, setResult] = useState({ groups: [], users: [] });

  useEffect(() => {
    async function search() {
      try {
        if (query.length < 3) {
          setResult({ groups: [], users: [] });
          return;
        }
        const res = await axios.get(
          `http://localhost:8000/api/search?q=${query}`
        );
        console.log(res.data);
        setResult(res.data?.result);
      } catch (err) {
        console.log(err);
      }
    }
    search();
  }, [query]);
  return result;
}
