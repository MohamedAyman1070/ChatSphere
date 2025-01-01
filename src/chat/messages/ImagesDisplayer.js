import { Link, useParams } from "react-router-dom";

export default function ImageDispalyer({ assets, message_slug }) {
  let remaining = assets.length > 3 ? assets.length - 3 : 0;
  const { slug } = useParams();
  return (
    <>
      {assets.length < 3 ? (
        assets.map((img) => (
          <div key={img.id} className="rounded">
            <Link to={`/home/chat-room/${slug}/display-images/${message_slug}`}>
              <img src={img.URL} alt="message asset" />
            </Link>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-2 grid-rows-2  ">
          {assets.map((img, k) => {
            return (
              <div key={img.id} className="p-1 ">
                {k < 3 && (
                  <Link
                    to={`/home/chat-room/${slug}/display-images/${message_slug}`}
                  >
                    <img
                      src={img.URL}
                      className="object-cover h-40 rounded-xl"
                      alt="message asset"
                    />
                  </Link>
                )}
                {k === 3 && (
                  <div className="relative">
                    <Link
                      to={`/home/chat-room/${slug}/display-images/${message_slug}`}
                    >
                      <img
                        src={img.URL}
                        className="object-cover h-40 rounded-xl"
                        alt="message asset"
                      />
                    </Link>
                    {remaining > 0 && (
                      <div className="bg-black top-0 w-full flex justify-center items-center  h-full rounded-xl absolute bg-opacity-50">
                        <p className="text-normalTextColor text-3xl">
                          {"+" + (remaining - 1)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
