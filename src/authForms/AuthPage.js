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
          src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=muXZvm3dsoQqwg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-person-icon-png-people-person-user-icon-2240.png&ehk=MfHYkGonqy7I%2fGTKUAzUFpbYm9DhfXA9Q70oeFxWmH8%3d&risl=&pid=ImgRaw&r=0"
          alt="user"
          className="w-40 h-40 rounded object-cover"
        />
      </div>
      <div className="w-full sm:w-4/5 m-auto -mt-4">{children}</div>
    </div>
  );
}
