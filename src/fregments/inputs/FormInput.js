export default function FormInput({ placeholder, setState }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="rounded bg-textbox p-2 text-white outline-none w-full"
      onChange={(e) => setState((curr) => e.target.value)}
    />
  );
}
