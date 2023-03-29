import instance from "./instance";

const loginguest = async (user) => {
  return await instance.post("/login/guest", user);
};

const loginbusiness = async (user) => {
  return await instance.post("/login/business", user);
};

const guestSignUpUser = async (user) => {
  return await instance.post(`/signup/guest`, user);
};

const adminSignUpUser = async (admin) => {
  return await instance.post(`/signup/business`, admin);
};

const guestdeleteVisit = async (id) => {
  return await instance.delete(`/visit/${id}`);
};

const guestVisit = async () => {
  return await instance.get(`/visit/guest`);
};

const adminVisit = async () => {
  return await instance.get(`/visit/admin`);
};

const adminModify = async (payload) => {
  console.log(payload);
  return await instance.put(`/visit/admin/${payload.id}`, {
    status: payload.status,
  });
};
export {
  loginguest,
  loginbusiness,
  guestSignUpUser,
  adminSignUpUser,
  guestdeleteVisit,
  guestVisit,
  adminVisit,
  adminModify,
};
