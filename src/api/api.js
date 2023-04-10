import instance from "./instance";

const loginguest = async (user) => {
  return await instance.post("/guest/login", user);
};

const loginbusiness = async (user) => {
  return await instance.post("/admin/login", user);
};

const guestSignUpUser = async (user) => {
  return await instance.post(`/guest/signup`, user);
};

const adminSignUpUser = async (admin) => {
  return await instance.post(`/admin/signup`, admin);
};

const guestdeleteVisit = async (id) => {
  return await instance.delete(`/visit/${id}`);
};

const guestVisit = async () => {
  return await instance.get(`/visit/guest`);
};

const adminVisit = async (payload) => {
  return await instance.get(`/visit/admin`);
};

const adminVisitSort = async (payload) => {
  return await instance.get(`/visit-forms/sort`, {
    params: {
      orderby: payload.orderby,
    },
  });
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

const submitconfirmform = async (user) => {
  return await instance.post("/visit", user);
};

const submitlobbycheckin = async (user) => {
  return await instance.post("access-in", user);
};

const getConfirmList = async () => {
  const response = await instance.get(`/visit/access-status`);
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

export {
  loginguest,
  loginbusiness,
  submitconfirmform,
  submitlobbycheckin,
  guestSignUpUser,
  adminSignUpUser,
  guestdeleteVisit,
  guestVisit,
  adminVisit,
  adminModify,
  getMap,
  getConfirmList,
  adminVisitSort,
  getNotifications,
  readNotification,
};
