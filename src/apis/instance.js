import axios from "axios";
import { getCookie } from "./cookies"

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  //요청을 보내기 전 수행
  function (config) {
    // // 토큰을 요청이 시작될 때 가져옴
    const accessToken = getCookie("ACCESS_TOKEN");
    // // 요청 config headers에 토큰을 넣어 줌
    config.headers["Authorization"] = accessToken;
    // // config.headers["RT_Authorization"] = accessToken;
    return config;

    // return config;
  },

  // 오류 요청을 보내기 전 수행
  function (error) {
    console.log("데이터 보내는중 오류!");
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  //서버로부터 정상 응답을 받는 경우
  function (config) {
    const accessToken = getCookie("ACCESS_TOKEN");
    config.headers["Authorization"] = accessToken;

    return config;
  },

  function (error) {
    
    // if (error.response.statusCode === 400) {
    //   alert("데이터 수신중에 오류가 났어요!!!");
    // }
    return Promise.reject(error);
  },
);
export default instance;