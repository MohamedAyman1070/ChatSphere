export default function UserInfo({ user, flex_dir, gap }) {
  let tailStyle = `flex ${flex_dir} ${gap}  items-center text-white`;

  return (
    <div className={tailStyle}>
      <img
        className="rounded-full w-14 h-14 object-cover border-2 border-red-200"
        src={user.image}
        alt={user.name}
      />
      <span>{user.name}</span>
    </div>
  );
}
