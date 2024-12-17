import SimpleBtn from "../fregments/buttons/SimpleBtn";
import Textbox from "../fregments/inputs/Textbox";

export default function Form({ setShowForm }) {
  function hideForm(e) {
    e.preventDefault();
    setShowForm(false);
  }

  return (
    <div className="grid grid-cols-1 h-screen w-screen bg-black bg-opacity-50 fixed top-0 left-0 z-50">
      <form className="m-auto flex flex-col gap-2 w-80 justify-center h-fit p-2 rounded bg-gradient-to-tr from-plum to-customBlue">
        <div className="flex justify-end w-full">
          <button onClick={(e) => hideForm(e)}>&#10006;</button>
        </div>
        <div className="w-full flex justify-center">
          <h1 className="text-xl text-normalTextColor">Create New Group</h1>
        </div>
        <div>
          <Textbox placeholder={"Name"} />
          <span className="text-errColor text-sm"></span>
        </div>
        <div>
          <Textbox placeholder={"description"} />
          <span className="text-errColor text-sm"></span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-normalTextColor">Status</label>
          <select className="rounded bg-textbox p-2 text-white outline-none w-full">
            <option>public</option>
            <option>private</option>
          </select>
        </div>

        <div className="flex w-full justify-center">
          <div className="w-2/5">
            <SimpleBtn>Save</SimpleBtn>
          </div>
        </div>
      </form>
    </div>
  );
}
