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

const guestModify = async (payload) => {
  return await instance.put(`/visit/guest/${payload.id}`, payload.data);
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

const getNotifications = async () => {
  const response = await instance.get("/notifications");
  return response.data;
};
const readNotification = async (id) => {
  const response = await instance.put(`/notification/${id}`);
  return response.data;
};

const SearchGuestID = async (user) => {
  return await instance.post("/guest/user-id", user);
};

const SearchGuestPW = async (user) => {
  return await instance.post("/guest/password", user);
};

const SearchAdminPW = async (user) => {
  return await instance.post("/admin/password", user);
};

const SearchAdminID = async (user) => {
  return await instance.post("/admin/user-id", user);
};

const ChangeAdminPW = async (user) => {
  return await instance.put("/admin/password", user);
};

const ChangeGuestPW = async (user) => {
  return await instance.put("/guest/password", user);
};

const getEnterPeople = async () => {
  const response = await instance.get(`/access`);
  return response.data;
};

const DownLoadExcel = async () => {
  return await instance.get("/excel/access", {
    responseType: "arraybuffer",
  });
};

export {
  loginGuest,
  loginBusiness,
  submitConfirmForm,
  submitLobbyCheckIn,
  submitLobbyCheckOut,
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
  submitLobbyCheckInQr,
  submitLobbyCheckOutQr,
  getUserInfoQr,
  getNotifications,
  readNotification,
  SearchAdminID,
  SearchGuestID,
  SearchGuestPW,
  ChangeGuestPW,
  getEnterPeople,
  DownLoadExcel,
  guestModify,
};
