import React from "react";
import AdminMenuBar from "../components/admin/AdminMenuBar";
import { useSelector } from "react-redux";
import AdminDashBoard from "../components/admin/AdminDashBoard";
import AdminApproveList from "../components/admin/AdminApproveList";
import Navbar from "../components/navbar/Navbar";

export default function AdminMain() {
  const { menu } = useSelector((state) => state.AdminMenuSlice);
  console.log(menu);
  return (
    <>
      <Navbar />
      <AdminMenuBar menu={menu} />
      {menu === "dashboard" && <AdminDashBoard />}
      {menu === "approve" && <AdminApproveList />}
    </>
  );
}
