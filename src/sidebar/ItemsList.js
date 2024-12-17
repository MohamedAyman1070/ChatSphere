import { useEffect } from "react";
import Item from "./Item";
import axios from "axios";

/**
 *
 * @deprecated this is deprecated and will be removed
 */
export function ItemsList({ items = [] }) {
  return (
    <div
      className="flex flex-col h-full  bg-customBlue overflow-auto 
    hide-scrollbar"
    >
      {items?.length > 0 ? (
        items.map((item, k) => <Item item={item} key={k} />)
      ) : (
        <img src="/placeholder.png" alt="not found" className="m-auto" />
      )}
    </div>
  );
}
