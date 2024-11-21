import SimpleBtn from "../../fregments/buttons/SimpleBtn";
import Textbox from "../../fregments/inputs/Textbox";

export default function RegisterForm() {
  return (
    <div className=" lg:w-2/5 h-fit m-auto rounded ">
      <form className="w-full flex flex-col gap-4">
        <Textbox placeholder={"Name ..."} />
        <span className="text-sm text-gray-600">(opotinal)</span>
        <Textbox placeholder={"phone ..."} />
        <Textbox placeholder={"Email ..."} />
        <Textbox placeholder={"Password ..."} />
        <div className="w-full sm:w-2/5 flex flex-col gap-2 place-self-center">
          <SimpleBtn children={"Sign up"} />
        </div>
        <span className="text-icons">Already have an accaount ?</span>
      </form>
    </div>
  );
}
