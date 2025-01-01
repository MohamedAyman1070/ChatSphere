import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider";

export default function Toast({ color, text }) {
  const [show, setShow] = useState(true);
  const { setToasts } = useContext(DataContext);
  useEffect(() => {
    setTimeout(() => {
      setToasts((c) => c.filter((toast) => toast !== text));
    }, 3000);
  }, [text, setToasts]);
  return (
    <>
      {show && (
        <div className=" z-50  flex flex-col gap-2">
          <div className=" flex rounded justify-between gap-2 bg-headerColor p-2  ">
            <p className="text-normalTextColor">
              <b className="text-errColor">Error: </b>
              {text}
            </p>
            <div className="">
              <button onClick={() => setShow((c) => false)}>✖</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
