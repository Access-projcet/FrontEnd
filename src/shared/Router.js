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
import SignUp from "../pages/SignUp"
import NotFound from "../pages/NotFound";
import Search_PW from "../components/modal/Search_PW";
import Change_PW from "../components/modal/Change_PW";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/guest/signup" element={<GuestSignUp />} />
        <Route path="/admin/signup" element={<AdminSignUp />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/guest/main" element={<GuestMain />} />
        <Route path="/guest/company" element={<Company />} />
        <Route path="/guest/confirmform" element={<ConfirmForm />} />
        <Route path="/guest/mypage" element={<GuestMyPage />} />
        <Route path="/admin/main" element={<AdminMain />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/search" element={<Search_PW/>} />
        <Route path="/change" element={<Change_PW/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
