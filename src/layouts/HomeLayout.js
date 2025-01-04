import { Outlet, useParams } from "react-router-dom";
import Room from "../chat/Room";
import { DataContext } from "../context/DataProvider";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Toast from "../fregments/others/Toast";
export default function HomeLayout() {
  const { showSidebar, items, selectedItem, OnSelectItem, toasts } =
    useContext(DataContext);
  const { slug, param } = useParams();
  useEffect(() => {
    const friends = items.friends;
    const groups = items.groups;
    if (slug === undefined) {
      OnSelectItem(null);
      return;
    }
    if (friends === undefined && groups === undefined) return;
    let selected =
      friends && friends.filter((obj) => obj.friend.slug === slug).pop();
    if (!selected) {
      selected = groups.filter((group) => group.slug === slug).pop();
    }
    OnSelectItem(selected);
  }, [slug, OnSelectItem, items]);
  return (
    <div className="grid grid-cols-1 h-screen bg-slate-600">
      <div className="flex h-full  overflow-auto ">
        <div className="flex flex-col absolute top-20 right-5 gap-2  ">
          {toasts.map((toast, k) => (
            <Toast key={k} text={toast} />
          ))}
        </div>
        {showSidebar && <Sidebar />}
        <div className="flex flex-col w-full   bg-roomColor ">
          <Header />

          {selectedItem || param ? (
            <>
              <Outlet />
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
