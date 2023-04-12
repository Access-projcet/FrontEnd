import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./../pages/Login";
import GuestMain from "./../pages/GuestMain";
// import AdminSignUp from "../pages/AdminSignUp";
// import GuestSignUp from "../pages/GuestSignUp";
import ConfirmForm from "../pages/ConfirmForm";
import Company from "../pages/Company";
import GuestMyPage from "../pages/GuestMyPage";
import AdminMain from "../pages/AdminMain";
import Lobby from "../pages/Lobby";
import NotFound from "../pages/NotFound";
import ChangeAdminPw from "../pages/ChangeAdminPW";
import SignUp from "../pages/SignUp";
import ChangeGuestPw from "../pages/ChangeGuestPW";
import AdminDashBoard from "../components/admin/AdminDashBoard";
import AdminApproveList from "../components/admin/AdminApproveList";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/guest/main" element={<GuestMain />} />
        <Route path="/guest/company" element={<Company />} />
        <Route path="/guest/confirmform" element={<ConfirmForm />} />
        <Route path="/guest/mypage" element={<GuestMyPage />} />
        <Route path="/admin/main" element={<AdminMain />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/change_pw/admin" element={<ChangeAdminPw />} />
        <Route path="/change_pw/guest" element={<ChangeGuestPw />} />
        <Route path="/admin/dashBoard" element={<AdminDashBoard />} />
        <Route path="/admin/approvelist" element={<AdminApproveList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
