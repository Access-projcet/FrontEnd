import React from "react";
import styled from "styled-components";
import Portal from "./Portal";

const Modal = ({ children, onClose }) => {
  return (
    <Portal>
      <ModalOverlay>
        <ModalWrapper>
          <ModalInner>{children}</ModalInner>
        </ModalWrapper>
      </ModalOverlay>
    </Portal>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: white;
  width: 360px;
  height: 218px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalInner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
