import TypeBar from "./typeBar/TypeBar";

export function Main({ children }) {
  return (
    <div
      className="flex flex-col h-full p-2 overflow-auto bg-roomColor
    hide-scrollbar"
    >
      {children}
    </div>
  );
}
