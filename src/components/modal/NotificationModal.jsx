import React from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { readNotification } from "../../api/api";
import { QueryClient } from "react-query";

export const NotificationModal = ({ position, onClose, data, refetch }) => {
  console.log(position);
  // const queryClient = new QueryClient();
  const deleteMutation = useMutation(readNotification, {
    onSuccess: (res) => {
      console.log("알림 삭제 성공", res);
      // queryClient.invalidateQueries("notification");
      refetch();
    },
  });

  const handlerDeleteNotification = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <StContainer position={position}>
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
      <ButtonClose onClick={onClose}>X</ButtonClose>
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
  border-radius: 10px;
  overflow: hidden;
  border-radius: 5px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
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

const StNotificationList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
`;
const StNotification = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cbcbcb;
  margin: 10px 0px;
  width: 100%;
  padding-bottom: 10px;
`;
const StConformBtn = styled.button`
  background-color: transparent;
  cursor: pointer;
`;
