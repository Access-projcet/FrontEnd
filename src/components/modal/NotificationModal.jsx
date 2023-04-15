import React from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { readNotification } from "../../api/api";
import { QueryClient } from "react-query";

export const NotificationModal = ({ position, onClose, data, refetch }) => {
  // const queryClient = new QueryClient();
  const deleteMutation = useMutation(readNotification, {
    onSuccess: (res) => {
      // queryClient.invalidateQueries("notification");
      refetch();
    },
  });

  const handlerDeleteNotification = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <StContainer position={position}>
      <StNotificationTitle> 알림</StNotificationTitle>
      <StNotificationList>
        {data
          ?.filter((item) => !item.isRead)
          .map((item) => {
            return (
              <StNotification>
                {item.content}
                <StConformBtn
                  onClick={() => handlerDeleteNotification(item.id)}
                >
                  ✔️
                </StConformBtn>
              </StNotification>
            );
          })}
        {data && data.filter((item) => !item.isRead).length === 0 && (
          <p>안 읽은 알림이 없습니다.</p>
        )}
      </StNotificationList>
      <ButtonClose onClick={onClose}>🗙</ButtonClose>
    </StContainer>
  );
};

const StContainer = styled.div`
  position: absolute;
  top: ${(props) => parseInt(props.position.top, 10) + 15}px;
  left: ${(props) => props.position.left};
  width: 400px;
  height: 400px;
  background-color: white;
  /* border: 1px solid black; */
  color: black;
  z-index: 99;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const ButtonClose = styled.button`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 15px;
  right: 40px;
  background-color: transparent;
  font-size: x-large;
  color: #b1b1b1;
  cursor: pointer;
`;

const StNotificationList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  margin-top: 10px;
  margin-left: 22px;
  margin-right: 22px;
`;
const StNotification = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cbcbcb;
  font-weight: 400;
  margin: 10px 0px;
  width: 100%;
  padding-bottom: 10px;
`;
const StConformBtn = styled.button`
  background-color: transparent;
  cursor: pointer;
`;

const StNotificationTitle = styled.div`
  margin-left: 22px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
`;
