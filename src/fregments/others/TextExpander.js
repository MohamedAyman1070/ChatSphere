import { useParams } from "react-router-dom";
import Linkify from "linkify-react";
import { useState } from "react";
export default function TextExpander({ children }) {
  const { slug } = useParams();
  const NUMBER_OF_CHARS = 160;
  const [expand, setExpand] = useState(function () {
    return children.length > NUMBER_OF_CHARS ? false : true;
  });
  function handleExpand() {
    setExpand((c) => !c);
  }
  return (
    <div className="break-words p-2 ml-1 ">
      <div className="  text-wrap whitespace-pre-wrap">
        <Linkify options={{ className: "text-blue-700" }}>
          <div>
            <span>
              {!expand ? (
                <>
                  {children.slice(0, 160)}
                  <button
                    onClick={handleExpand}
                    className="font-bold text-plum"
                  >
                    ....Read more
                  </button>
                </>
              ) : (
                children
              )}
            </span>
          </div>
        </Linkify>
      </div>
    </div>
  );
}
