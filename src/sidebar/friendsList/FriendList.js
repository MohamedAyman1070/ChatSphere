import { Link, useParams } from "react-router-dom";
import FriendItem from "./FriendItem";

export default function FriendList({ list, OnSelectItem }) {
  const { slug } = useParams();
  return list.length > 0 ? (
    <ul>
      <p className="p-2 text-xl  font-bold text"># Friends</p>

      {list.map((item) => (
        <Link
          to={
            item.friend.slug === slug
              ? "/home"
              : `/home/chat-room/${item.friend.slug}`
          }
          key={item.socket_id}
        >
          <FriendItem item={item} OnSelectItem={OnSelectItem} />
        </Link>
      ))}
    </ul>
  ) : (
    ""
  );
}
