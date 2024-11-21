import Searchbox from "../fregments/inputs/Searchbox";
import { motion } from "motion/react";

export default function Sidebar({ children }) {
  return (
    <motion.div
      className="flex flex-col sm:w-96 w-full overflow-hidden "
      initial={{ x: "-24rem" }}
      animate={{ x: "0" }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-headerColor p-4 flex justify-between ">
        <button>
          <span className="p-2">
            <i class="fa-solid fa-bars fa-xl text-icons"></i>
          </span>
        </button>
        <Searchbox placeholder={"search ... "} />
        <button>
          <span className="p-2">
            <i class="fa-solid fa-plus fa-xl text-plumButton"></i>
          </span>
        </button>
      </div>
      {children}
    </motion.div>
  );
}
