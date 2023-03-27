import instance from "./instance";

const loginguest = async (user) => {
  return await instance.post("/login/guest", user);
};

const loginbusiness = async (user) => {
  return await instance.post("/login/business", user);
};

export { loginguest, loginbusiness };
