export default function AuthPage({ children }) {
  return (
    <div
      className="bg-gradient-to-br  from-plum to-customBlue 
      grid grid-cols-1
      h-screen
  "
    >
      <div className="m-auto">
        <img
          src="https://res.cloudinary.com/drm3bzgpi/image/upload/v1789231366/user_gufcpx.png"
          alt="user"
          className="w-40 h-40 rounded object-cover"
        />
      </div>
      <div className="w-full sm:w-4/5 m-auto -mt-4">{children}</div>
    </div>
  );
}
