export default function MessageRightTail({ tailColor }) {
  let tailwindStyle = `p-5   absolute bottom-2
     -right-7
rounded-full ${tailColor}`;
  return (
    <div className={tailwindStyle}>
      <div
        className=" w-8 h-10  bg-roomColor absolute -top-0 left-5
rounded-xl 
-translate-y-2
-translate-x-2
"
      ></div>
    </div>
  );
}
