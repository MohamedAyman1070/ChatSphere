import { useEffect } from "react";

export default function useClickOutsideEvent(element, setState, callback) {
  useEffect(() => {
    callback?.();
    function handleClickOutside(e) {
      if (element.current && !element.current.contains(e.target))
        setState(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, element, setState]);
}
