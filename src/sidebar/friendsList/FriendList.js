import { Link } from "react-router-dom";
import FriendItem from "./FriendItem";

export default function FriendList({ list, OnSelectItem }) {
  return list.length > 0 ? (
    <ul>
      <p className="p-2 text-xl  font-bold text"># Friends</p>

      {list.map((item) => (
        <Link to={`/home/${item.friend.slug}`}>
          <FriendItem
            item={item}
            key={item.socket_id}
            OnSelectItem={OnSelectItem}
          />
        </Link>
      ))}
    </ul>
  ) : (
    ""
  );
}
