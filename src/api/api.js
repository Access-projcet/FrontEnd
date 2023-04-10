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
  const response = await instance.get(`/access-status`);
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
  SearchAdminPW,
  ChangeAdminPW,
  SearchEmail,
};
