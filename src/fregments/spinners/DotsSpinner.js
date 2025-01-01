export default function DotsSpinner() {
  return (
    <div className="flex space-x-2 p-1 justify-center items-center dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-3 w-3 bg-plum rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-plum rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-plum rounded-full animate-bounce"></div>
    </div>
  );
}
