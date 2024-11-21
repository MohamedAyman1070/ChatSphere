export default function Searcbox({ placeholder, setState }) {
  return (
    <div className="rounded-2xl bg-textbox p-2">
      <input
        type="text"
        placeholder={placeholder}
        className=" ml-2 bg-textbox text-white outline-none w-full"
        onChange={(e) => setState((curr) => e.target.value)}
      />
    </div>
  );
}
