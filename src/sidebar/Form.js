import axios from "axios";
import SimpleBtn from "../fregments/buttons/SimpleBtn";
import Textbox from "../fregments/inputs/Textbox";
import { useContext, useReducer, useState } from "react";
import { DataContext } from "../context/DataProvider";

export default function Form({ setShowForm }) {
  // const onRefetchItems = null;
  const { OnRefetchItems, items } = useContext(DataContext);

  function reducer(errors, action) {
    switch (action.type) {
      case "nameError":
        return { ...errors, name: action.errorMsg };
      case "descriptionError":
        return { ...errors, description: action.errorMsg };
      case "statusError":
        return { ...errors, status: action.errorMsg };
      default:
        throw new Error("Invalid action: " + action.type);
    }
  }
  const [group, setGroup] = useState({ name: "", description: "", status: "" });
  const [errors, dispatch] = useReducer(reducer, {
    name: "",
    description: "",
    status: "",
  });

  function hideForm(e) {
    setShowForm(false);
  }

  function setName(name) {
    setGroup({ ...group, name: name });
  }
  function setDescription(description) {
    setGroup({ ...group, description: description });
  }
  function setStatus(status) {
    setGroup({ ...group, status: status });
  }

  async function handleCreateGroup(e) {
    try {
      e.preventDefault();
      console.log(group);
      if (group.name === "") {
        dispatch({ type: "nameError", errorMsg: "Group name is required" });
        return;
      }
      if (group.description === "") {
        dispatch({
          type: "descriptionError",
          errorMsg: "Group description is required",
        });
        return;
      }
      if (group.status === "") {
        dispatch({ type: "statusError", errorMsg: "Group status is required" });
        return;
      }
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_DOMAIN + "/api/groups",
        {
          name: group.name,
          description: group.description,
          status: group.status,
        }
      );
      console.log(res);
      OnRefetchItems((c) => !c);
      setShowForm(false);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return (
    <div className="grid grid-cols-1 h-screen w-screen bg-black bg-opacity-50 fixed top-0 left-0 z-50">
      <form
        onSubmit={(e) => handleCreateGroup(e)}
        className="m-auto flex flex-col gap-2 w-80 justify-center h-fit p-2 rounded bg-gradient-to-tr from-plum to-customBlue"
      >
        <div className="flex justify-end w-full">
          <button onClick={(e) => hideForm(e)}>&#10006;</button>
        </div>
        <div className="w-full flex justify-center">
          <h1 className="text-xl text-normalTextColor">Create New Group</h1>
        </div>
        <div>
          <Textbox placeholder={"Name"} setState={setName} />
          <span className="text-errColor text-sm">{errors.name}</span>
        </div>
        <div>
          <Textbox placeholder={"description"} setState={setDescription} />
          <span className="text-errColor text-sm">{errors.description}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-normalTextColor">Status</label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="rounded bg-textbox p-2 text-white outline-none w-full"
          >
            <option value="">-- select a status --</option>
            <option value="public">public</option>
            <option value="private">private</option>
          </select>
          <span className="text-errColor text-sm">{errors.status}</span>
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
