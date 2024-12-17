import { useEffect, useState } from "react";

export default function MenuIcon({ onShow, notifications }) {
  function handleClick() {
    onShow((show) => !show);
  }
  return (
    <div
      className="flex flex-col relative w-fit cursor-pointer gap-1"
      onClick={() => handleClick()}
    >
      {notifications.hasNotification && (
        <span className="absolute top-0 right-0 p-1 rounded-full bg-plumButton"></span>
      )}
      <div className="rounded-xl w-2 h-1 bg-icons" />
      <div className="rounded-xl w-4 h-1 bg-icons" />
      <div className="rounded-xl w-6 h-1 bg-icons" />
    </div>
  );
}
