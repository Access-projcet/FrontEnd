import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { EventSourcePolyfill } from "event-source-polyfill";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useQuery, QueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsIcon from "@mui/icons-material/Settings";

import logo from "../../utils/img/VISITUS_logo.png";
import logout from "../../utils/img/logout_icon.png";
import { Link } from "react-router-dom";

import { getCookie, removeCookie } from "./../../api/cookies";
import { NotificationModal } from "../modal/NotificationModal";
import { getNotifications } from "../../api/api";

const Navbar = () => {
  const navigate = useNavigate();
  const menu = localStorage.getItem("usertype");
  const [message, setMessage] = useState("not yet");
  const [showNotification, setShowNotification] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isConnection, setIsConnection] = useState(false);
  const [notificationCnt, setNotificationCnt] = useState(0);

  const notify = (msg) => toast(msg);


  const queryClient = new QueryClient();

  const { data, isError, isLoading, refetch } = useQuery(
    "notification",
    getNotifications,
    {
      onSuccess: (res) => {
        console.log("알람 리스트 불러왔습니다.", res);
        const temp = res.filter((item) => !item.isRead).length;
        setNotificationCnt(temp);
      },

      enabled: menu === "admin",

    }
  );

  useEffect(() => {
    const accessToken = getCookie("ACCESS_TOKEN");
    const eventSource = new EventSourcePolyfill(
      `${process.env.REACT_APP_SERVER_URL}/subscribe/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    eventSource.onopen = () => {
      console.log("최초 오픈!");
      setIsConnection(true);
      refetch();
    };

    eventSource.onmessage = (event) => {
      const target = event.data.split(" ")[0];
      console.log("여기 왜 안옴?", event.data.split(" "));
      if (isConnection) {
        if (target === "EventStream" || target === "event:") {
          return;
        }
        setMessage(event.data);
        notify(message);
      }
      // refetch();
      // queryClient.invalidateQueries("notification");
    };

    eventSource.onerror = (e) => {
      // error log here
      console.log("errorerorororo", e);
      // eventSource.close();
    };
    return () => {
      console.log("SSE종료되었음!");
      eventSource.close();
    };
  }, [message, isConnection, refetch]);

  const logoutBtn = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("usertype");
    removeCookie("ACCESS_TOKEN", { path: "/" });
    navigate("/");
  };

  const HandlerMain = (e) => {
    e.stopPropagation();
    menu === "guest" ? navigate("/guest/main") : navigate("/admin/main");
  };
  const handleClickNotification = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const modalPosition = { top: y + "px", left: x + "px" };
    setShowNotification(true);
    setModalPosition(modalPosition);
  };

  const handleCloseNotification = () => {
    console.log("눌림!");
    setShowNotification(false);
    queryClient.invalidateQueries("notification");
  };

  // navigate 이동 함수
  const navigateMap = () => {
    navigate("/guest/company");
  };
  const navigateMyPage = () => {
    navigate("/guest/mypage");
  };
  const navigateAdminPage = () => {
    navigate("/admin/main");
  };
  const navigateLobby = () => {
    navigate("/lobby");
  };
  return (
    <>
      <StNavBar>
        <StNavbarContainer>
          <StLogo src={logo} alt="visitus.logo" onClick={HandlerMain} />
          {menu === "guest" ? (
            <StMenuDiv>
              <StMenuUl>
                <StMenuLi onClick={navigateMap}>맵보러가기</StMenuLi>
                <StMenuLi onClick={navigateMyPage}>내가 신청한 목록</StMenuLi>
              </StMenuUl>
            </StMenuDiv>
          ) : (
            <StMenuDiv>
              <StMenuUl>
                <StMenuLi onClick={navigateLobby}>로비 메뉴</StMenuLi>
                <StMenuLi onClick={navigateAdminPage}>관리자 페이지</StMenuLi>
              </StMenuUl>
            </StMenuDiv>
          )}
          <StUser>
            <StName>
              <StNotification onClick={handleClickNotification}>
                <NotificationImportantIcon />
                {notificationCnt > 0 && (

                  <StNotificationCnt>{notificationCnt}</StNotificationCnt>

                )}
              </StNotification>
              {showNotification && (
                <NotificationModal
                  onClose={handleCloseNotification}
                  position={modalPosition}
                  data={data}
                />
              )}
              {localStorage.getItem("name")}님 반갑습니다
            </StName>
            <StLogOutContainer>
              <Link to={"/"}>
                <StLogOut onClick={logoutBtn}>LOGOUT</StLogOut>

                <StLogOutImg
                  src={logout}
                  alt="logoutImg"
                  onClick={logoutBtn}
                ></StLogOutImg>
              </Link>
              {menu === "guest" ? (
                <Link to={"/change_pw/guest"}>
                  <StLogOut>
                    <SettingsIcon />
                  </StLogOut>
                </Link>
              ) : (
                <Link to={"/change_pw/admin"}>
                  <StLogOut>
                    <SettingsIcon />
                  </StLogOut>
                </Link>
              )}
            </StLogOutContainer>
          </StUser>
        </StNavbarContainer>
      </StNavBar>
    </>
  );
};

export default Navbar;

const StNavBar = styled.div`
  background-color: #636fd7;
  width: 100%;
`;
const StNavbarContainer = styled.div`
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`;

const StLogo = styled.img`
  cursor: pointer;
`;

const StUser = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
const StName = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 800;
`;
const StLogOutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StLogOut = styled.button`
  color: white;
  font-size: 16px;
  font-weight: 800;
  background-color: transparent;
  cursor: pointer;
`;
const StLogOutImg = styled.img``;

const StMenuDiv = styled.div``;

const StMenuUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const StMenuLi = styled.li`
  color: white;
  font-size: 18;
  font-weight: 700;
  margin: 0 20px;
`;

const StNotification = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: 800;
  margin-right: 5px;
`;
const StNotificationCnt = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: 800;
  border-radius: 50%;
  padding: 2px;
  width: 18px;
  height: 18px;
`;
