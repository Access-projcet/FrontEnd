import React, { useEffect } from "react";
import styled from "styled-components";
import Portal from "./Portal";
import CloseIcon from "@mui/icons-material/Close";

const MarkerModal = ({ children, onClose }) => {
  useEffect(() => {
    //현재위치에 고정
    document.body.style.cssText = `
            position: fixed;
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;
            `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <Portal>
      <ModalOverlay>
        <ModalWrapper>
          <ModalInner>
            {children}
            <CloseIcon
              onClick={onClose}
              style={{
                fontSize: "xx-large",
                color: "#B1B1B1",
                cursor: "pointer",
                position: "absolute",
                top: "45px",
                right: "15px",
              }}
            ></CloseIcon>
          </ModalInner>
        </ModalWrapper>
      </ModalOverlay>
    </Portal>
  );
};

export default MarkerModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  /* background-color: white;
  width: 40%;
  height: 700px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
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

const ButtonClose = styled.button`
  /* width: 40px;
  height: 20px;
  position: absolute;
  top: 20px;
  right: 10px;
  background-color: transparent;
  font-size: 40px;
  color: grey;
  cursor: pointer; */
`;
