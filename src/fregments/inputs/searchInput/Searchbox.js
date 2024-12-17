import Item from "./Item";

export default function Searcbox({ placeholder, setState, results }) {
  console.log(results);
  return (
    <div className="rounded-2xl w-full z-50 bg-textbox p-2 flex flex-col gap-2">
      <input
        type="text"
        placeholder={placeholder}
        className=" ml-2 bg-textbox text-white outline-none w-full"
        onChange={(e) => setState((curr) => e.target.value)}
      />
      {results.users.length > 0 || results.groups.length > 0 ? (
        <div className=" border-t-2 border-t-container p-2  flex flex-col gap-2  w-full">
          {results.users.map((user) => (
            <Item
              key={user.email}
              item={user}
              imgSize={"w-12 h-12"}
              textSize={"text-sm"}
            />
          ))}
          {results.groups.map((group) => console.log(group))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
