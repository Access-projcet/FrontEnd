import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { submitlobbycheckin } from "../../api/api";
import styled from "styled-components";

const LobbyModal = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(submitlobbycheckin, {
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      alert(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const checkin = {
      // 현재시간,
    };
    console.log({
      // 현재시간,
    });
    mutation.mutate(checkin);
  };

  return (
    <>
      <ModalOverlay>
        <ModalWrapper>
          <ModalInner>
            이름
            <input />
            전화번호
            <input />
            <ButtonClose>x</ButtonClose>
          </ModalInner>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
};

export default LobbyModal;

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
  background-color: white;
  width: 500px;
  height: 500px;
  border-radius: 4px;
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

const ButtonClose = styled.button`
  width: 40px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  font-size: 35px;
  cursor: pointer;
`;
