export default function SimpleBtn({ children, onClick }) {
  return (
    <button
      onClick={(e) => onClick?.(e)}
      className="bg-plum text-white 
    text-xl p-2 w-full rounded group overflow-hidden relative"
    >
      <span
        className="absolute  z-0   bg-hoverPlum  p-2 rounded-full
      -right-4 -bottom-4 
      
        group-hover:scale-[75]
      transition-transform duration-[380ms]"
      ></span>

      <span className="relative z-10 flex justify-center">{children}</span>
    </button>
  );
}
