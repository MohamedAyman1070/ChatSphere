import { Link } from "react-router-dom";
import GroupItem from "./GroupItem";

export default function GroupList({ list, OnSelectItem }) {
  return list.length ? (
    <ul>
      <p className="p-2 text-xl  font-bold text"># Groups</p>

      {list.map((item) => (
        <Link to={`/home/${item.slug}`}>
          <GroupItem
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
