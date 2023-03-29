import instance from "./instance";

const loginguest = async (user) => {
  return await instance.post("/login/guest", user);
};

const loginbusiness = async (user) => {
  return await instance.post("/login/business", user);
};

const getMap = async () => {
  const response = await instance.get(`/company`);
  return response.data;
};

export { loginguest, loginbusiness, getMap };
