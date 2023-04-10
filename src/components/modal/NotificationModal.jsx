import React from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { readNotification } from "../../api/api";
import { QueryClient } from "react-query";

export const NotificationModal = ({ position, onClose, data }) => {
  const queryClient = new QueryClient();
  const deleteMutation = useMutation(readNotification, {
    onSuccess: (res) => {
      console.log("알림 삭제 성공", res);
      queryClient.invalidateQueries("notification");
    },
  });

  const handlerDeleteNotification = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <StContainer position={position}>
      <StNotificationList>
        {data?.map((item) => {
          return (
            <StNotification>
              {item.content}
              <button onClick={() => handlerDeleteNotification(item.id)}>
                읽음
              </button>
            </StNotification>
          );
        })}
      </StNotificationList>
      <ButtonClose onClick={onClose}>X</ButtonClose>
    </StContainer>
  );
};

const StContainer = styled.div`
  position: absolute;
  top: ${(props) => props.position.top};
  left: ${(props) => props.position.left};

  width: 400px;
  height: 500px;
  background-color: white;
  border: 1px solid black;
  color: black;
  z-index: 99;
  border-radius: 10px;
  overflow: hidden;
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
  margin-top: 40px;
`;
const StNotification = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin: 10px 0px;
`;
