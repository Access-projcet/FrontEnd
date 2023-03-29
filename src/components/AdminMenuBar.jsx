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
        출입현황
      </MenuButton>
      <MenuButton
        onClick={() => HandlerChangeMenu("approve")}
        selected={menu === "approve"}
      >
        승인현황
      </MenuButton>
    </DivMenubar>
  );
}

const DivMenubar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  left: 0;
  top: 0;
  width: 150px;
  height: 100%;
`;

const MenuButton = styled.button`
  background-color: ${(props) => (props.selected ? "yellow" : "white")};
  width: 100%;
  color: ${(props) => (props.selected ? "red" : "black")};
  border: none;
  padding: 10px;
  cursor: pointer;
`;
