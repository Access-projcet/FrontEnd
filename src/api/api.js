import instance from "./instance";

const loginGuest = async (user) => {
  return await instance.post("/guest/login", user);
};

const loginBusiness = async (user) => {

  return await instance.post("/admin/login", user);
};

const guestSignUpUser = async (user) => {
  return await instance.post(`/guest/signup`, user);
};

const adminSignUpUser = async (admin) => {
  return await instance.post(`/admin/signup`, admin);
};

const guestDeleteVisit = async (id) => {
  return await instance.delete(`/visit/${id}`);
};

const guestVisit = async () => {
  return await instance.get(`/visit/guest`);
};

const adminVisit = async (payload) => {
  return await instance.get(`/visit/admin`);
};

const adminModify = async (payload) => {
  console.log(payload);
  return await instance.put(`/visit/admin/${payload.id}`, {
    status: payload.status,
  });
};

const getMap = async () => {
  const response = await instance.get(`/company`);
  return response.data;
};

const submitConfirmForm = async (user) => {
  return await instance.post("/visit", user);
};

const submitLobbyCheckIn = async (user) => {
  return await instance.post("/access-in", user);
};
const submitLobbyCheckOut = async (user) => {
  return await instance.put("/access-out", user);
};

const submitLobbyCheckInQr = async (qrUser) => {
  return await instance.post("access-in", qrUser);
};
const submitLobbyCheckOutQr = async (qrUser) => {
  return await instance.put("/access-out", qrUser);
};

const getConfirmList = async () => {
  const response = await instance.get(`/access-status`);
  return response.data;
};

const getUserInfoQr = async () => {
  const response = await instance.get(`/qrCode`);
  return response.data;
};

const SearchAdminPW = async (user) => {
  return await instance.post("/admin/password", user);
};

const ChangeAdminPW = async (user) => {
  return await instance.put("/admin/password", user);
};

const SearchEmail = async (user) => {
  return await instance.post("/email/authcode", user);
};

export {
  loginGuest,
  loginBusiness,
  submitConfirmForm,
  submitLobbyCheckIn,
  guestSignUpUser,
  adminSignUpUser,
  guestDeleteVisit,
  guestVisit,
  adminVisit,
  adminModify,
  getMap,
  getConfirmList,
  SearchAdminPW,
  ChangeAdminPW,
  SearchEmail,
  submitLobbyCheckInQr,
  submitLobbyCheckOutQr,
  getUserInfoQr,

};
