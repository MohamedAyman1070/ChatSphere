import { Link, useParams } from "react-router-dom";
import GroupItem from "./GroupItem";

export default function GroupList({ list, OnSelectItem }) {
  const { slug } = useParams();
  return list.length ? (
    <ul>
      <p className="p-2 text-xl  font-bold text"># Groups</p>

      {list.map((item) => (
        <Link
          to={item.slug === slug ? "/home" : `/home/chat-room/${item.slug}`}
          key={item.socket_id}
        >
          <GroupItem item={item} OnSelectItem={OnSelectItem} />
        </Link>
      ))}
    </ul>
  ) : (
    ""
  );
}
