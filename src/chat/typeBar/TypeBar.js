import Emoji from "./Emoji";
import Searchbox from "../../fregments/inputs/Searchbox";
import Textbox from "../../fregments/inputs/Textbox";

export default function TypeBar() {
  return (
    <div className="flex justify-between p-2  self-end bg-headerColor h-fit">
      <Emoji />
      <div className="w-96">
        <Textbox placeholder={"Type a Message"} />
      </div>
      <button>
        <i class="fa-solid fa-image fa-xl text-icons"></i>
      </button>
    </div>
  );
}
