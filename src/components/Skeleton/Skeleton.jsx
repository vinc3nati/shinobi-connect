import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export const Skeleton = () => {
  return (
    <>
      <Navbar />
      <main className="p-2 mt-4">
        <Outlet />
      </main>
    </>
  );
};
