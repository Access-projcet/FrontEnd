import instance from "./instance";

const adminSignUpUser = async (admin) => {
    return await instance.post(`/signup/business`, admin);
  };

export {adminSignUpUser};