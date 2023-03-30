import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookies";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    //   // // 토큰을 요청이 시작될 때 가져옴
    //   const accessToken = getCookie("ACCESS_TOKEN");
    //   config.headers["Authorization"] = accessToken;
    //   // const refresh_token = localStorage.getItem("REFRESH_TOKEN");
    // 요청 config headers에 토큰모두(refresh, access) 넣어 줌
    // const accessToken = getCookie("ACCESS_TOKEN");
    // // 요청 config headers에 토큰을 넣어 줌
    // config.headers["Authorization"] = accessToken;
    const accessToken = getCookie("ACCESS_TOKEN");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },

  (error) => {
    console.log("데이터 보내는중 오류!");
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  //서버로부터 정상 응답을 받는 경우
  (response) => {
    console.log("response", response);
    //request에 토큰 두개 담아서 보냈으니? access가 만료되었으면 알아서 access를 재발급해준다고 하였음.
    // 그럼 우선적으로 access_token을 받아와 기존 Cookie에 저장되어있는 값이랑 비교해서 다르면 교체?
    // 그럼 refresh까지 만료되었다면? 어떤 메시지를 줄것인가?
    // console.log("intercepter response", response);
    // const access_token = getCookie("ACCESS_TOKEN");
    if (response.headers.authorization) {
      console.log("토큰 받앗다?");
      const re_access_token = response.headers.authorization.split("")[1];
      setCookie("ACCESS_TOKEN", re_access_token);
    } else {
    }
    return response;
  },

  (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (error.response.status === 400) {
      console.log("400에러");
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("401에러");
      try {
        console.log("access_token 만료...재발급중...");
        originalRequest._retry = true;

        //리프레쉬토큰을 받아와서 헤더에 추가
        const refresh_token = localStorage.getItem("REFRESH_TOKEN");
        originalRequest.headers["Refresh_Token"] = `Bearer ${refresh_token}`;
        //재요청
        console.log("재요청ㄹ합니다", originalRequest);
        return instance(originalRequest);
      } catch (error) {
        //refresh_token이 만료
        console.log("refresh 토큰 만료...");
        //토큰들 지워
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("name");
        removeCookie("ACCESS_TOKEN");
        alert("다시 로그인하세욧!");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
export default instance;
