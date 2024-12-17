export default function UserInfo({
  user,
  flex_dir,
  gap,
  size = "w-14 h-14",
  textSize,
  msg,
}) {
  const tailStyle = `flex ${flex_dir} ${gap}  items-center text-white`;

  const imgStyle = `rounded-full  ${size}   object-cover border-2 border-red-200`;

  return (
    <div className={tailStyle}>
      <img className={imgStyle} src={user.image} alt={user.name} />
      <div className="flex flex-col">
        <span className={textSize}>{user.name}</span>
        <small className="text-normalTextColor">{msg}</small>
      </div>
    </div>
  );
}
