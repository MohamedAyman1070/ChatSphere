import { motion } from "motion/react";

export default function OptionMenu() {
  return (
    <motion.div
      className="absolute rounded w-40 text-white p-2 z-50  bg-listItem right-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ul className="flex flex-col gap-2">
        <li className="border-l-2 border-gray-400 p-2">Delete</li>
        <li className="border-l-2 border-gray-400 p-2">Edit</li>
        <li className="border-l-2 border-gray-400 p-2">Add</li>
      </ul>
    </motion.div>
  );
}
