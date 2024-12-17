export default function Textarea({ placeholder, setState }) {
  function handleOnChange(e) {
    setState((c) => e.target.value);
    placeholder = "";
    console.log("sdf");
  }
  return (
    <div
      contentEditable={true}
      className="rounded    bg-textbox p-2 text-white outline-none w-full"
      onChange={(e) => handleOnChange(e)}
    ></div>
  );
}
