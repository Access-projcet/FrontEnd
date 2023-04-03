import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setMenu } from "../redux/store/AdminMenuSlice";

export default function AdminMenuBar({ menu }) {
  const dispatch = useDispatch();
  const HandlerChangeMenu = (target) => {
    dispatch(setMenu(target));
  };

  return (
    <DivMenubar>
      <MenuButton
        onClick={() => HandlerChangeMenu("dashboard")}
        selected={menu === "dashboard"}
      >
        출입 현황
      </MenuButton>
      <MenuButton
        onClick={() => HandlerChangeMenu("approve")}
        selected={menu === "approve"}
      >
        승인 현황
      </MenuButton>
    </DivMenubar>
  );
}

const DivMenubar = styled.div`
  /* position: fixed; */
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 50px 0px;

  width: 100%;
  height: 100%;
`;

const MenuButton = styled.button`
  background-color: ${(props) => (props.selected ? "#636FD7" : "#D9D9D9")};
  width: 200px;
  height: 54px;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
`;
