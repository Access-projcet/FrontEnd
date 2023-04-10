import React from "react";
import AdminMenuBar from "../components/AdminMenuBar";
import { useSelector } from "react-redux";
import AdminDashBoard from "../components/AdminDashBoard";
import AdminApproveList from "../components/AdminApproveList";
import Navbar from "../components/navbar/Navbar";
import { getCookie } from "../api/cookies";

export default function AdminMain() {
  const { menu } = useSelector((state) => state.AdminMenuSlice);
  const isLogin = getCookie("ACCESS_TOKEN");
  if (!isLogin) {
    window.location.href = "/";
  }
  return (
    <>
      <Navbar />
      <AdminMenuBar menu={menu} />
      {menu === "dashboard" && <AdminDashBoard />}
      {menu === "approve" && <AdminApproveList />}
    </>
  );
}
