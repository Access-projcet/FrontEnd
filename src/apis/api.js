import instance from "./instance";

const adminSignUpUser = async (admin) => {
  return await instance.post(`/signup/business`, admin);
};

const guestSignUp = async (guest) => {
  return await instance.post(`/signup/guest`, guest);
};

const getMap = async () => {
  const response = await instance.get(`/company`);
  return response.data;
};
export { adminSignUpUser, guestSignUp, getMap };
