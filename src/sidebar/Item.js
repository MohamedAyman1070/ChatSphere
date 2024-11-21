import UserInfo from "../fregments/others/UserInfo";

export default function Item({ item }) {
  return (
    <div
      className="flex justify-between items-center p-4 bg-listItem 
        hover:bg-plum transition duration-300 hover:scale-105  group
        hover:shadow-xl hover:shadow-hoverPlum
    "
    >
      <UserInfo user={item} gap={"gap-4"} />
      <div className="flex gap-2 items-center">
        <span className="bg-plum rounded-xl w-6 flex justify-center items-center text-white group-hover:bg-listItem ">
          20
        </span>
      </div>
    </div>
  );
}
