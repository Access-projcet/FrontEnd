import instance from "./instance";

const loginguest = async (user) => {
  return await instance.post("/login/guest", user);
};

const loginbusiness = async (user) => {
  return await instance.post("/login/business", user);
};
 
const submitconfirmform = async (user) => {
  return await instance.post("/visit", user);
};

const submitlobbycheckin = async (user) =>  {
  return await instance.post("access-in", user)
}


export { loginguest, loginbusiness, submitconfirmform, submitlobbycheckin };
