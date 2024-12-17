export default function Toast({ onShowToast, color }) {
  return (
    <div className="fixed z-50 top-20 right-5 flex flex-col gap-2">
      <div className=" flex rounded bg-red-500 p-2  ">
        <p>
          <b>Warning:</b> this is a new toast lorem ipsum dolor sit amet,
        </p>
        <div className="">
          <button onClick={() => onShowToast((c) => false)}>✖</button>
        </div>
      </div>
    </div>
  );
}
