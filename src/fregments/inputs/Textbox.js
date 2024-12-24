export default function Textbox({ placeholder, type = "text", setState }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="rounded    bg-textbox p-2 text-white outline-none w-full"
      onChange={(e) => setState(e.target.value)}
    />
  );
}
