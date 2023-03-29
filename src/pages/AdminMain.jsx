import React from "react";
import AdminMenuBar from "../components/AdminMenuBar";
import { useSelector } from "react-redux";
import AdminDashBoard from "../components/AdminDashBoard";
import AdminApproveList from "../components/AdminApproveList";

export default function AdminMain() {
  const { menu } = useSelector((state) => state.AdminMenuSlice);
  console.log(menu);
  return (
    <>
      <AdminMenuBar menu={menu} />
      {menu === "dashboard" && <AdminDashBoard />}
      {menu === "approve" && <AdminApproveList />}
    </>
  );
}
