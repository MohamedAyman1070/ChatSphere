import Item from "./Item";

export function ItemsList({ items = [] }) {
  return (
    <div
      className="flex flex-col h-full  bg-customBlue overflow-auto 
    hide-scrollbar"
    >
      {items.length > 0
        ? items.map((item) => <Item item={item} />)
        : "no items yet"}
    </div>
  );
}
