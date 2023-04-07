import React from "react";
import styled from "styled-components";

export const NotificationModal = ({ position, onClose }) => {
  console.log(position.top, position.left);
  return (
    <StContainer position={position}>
      모달창입니다.
      <ButtonClose onClick={onClose}>X</ButtonClose>
    </StContainer>
  );
};

const StContainer = styled.div`
  position: absolute;
  top: ${(props) => props.position.top};
  left: ${(props) => props.position.left};

  width: 300px;
  height: 500px;
  background-color: white;
`;
const ButtonClose = styled.button`
  width: 40px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  font-size: x-large;
  cursor: pointer;
`;
