import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import lodash from "lodash";
/**
 * @debrecated
 */
export default function useSearch(query = "") {
  const [results, setResult] = useState({ groups: [], users: [] });

  function debounceChange(e) {
    console.log(e.target.value);
  }

  useEffect(() => {
    async function search() {
      try {
        if (query.length < 3) {
          setResult({ groups: [], users: [] });
          return;
        }
        console.log("sdfkjsd");

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
  return { results, debounceChange };
}
