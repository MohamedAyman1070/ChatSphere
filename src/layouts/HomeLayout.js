import Room from "../chat/Room";
import { DataContext } from "../context/DataProvider";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useContext } from "react";
export default function HomeLayout() {
  const { showSidebar, selectedItem } = useContext(DataContext);

  return (
    <div className="grid grid-cols-1 h-screen bg-slate-600">
      <div className="flex h-full  overflow-auto ">
        {/* {showToast && <Toast setShowToast={setShowToast} />} */}
        {showSidebar && <Sidebar />}
        <div className="flex flex-col w-full   bg-roomColor ">
          <Header />

          {selectedItem ? (
            <>
              <Room />
            </>
          ) : (
            <p
              className="text-4xl text-center"
              style={{ fontFamily: "Monoton" }}
            >
              ChatSphere
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
