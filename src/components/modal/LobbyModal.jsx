import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { submitlobbycheckin } from "../../api/api";

const LobbyModal = (props) => {
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
    const confirmform = {
      startDate: props.startDate,
    };
    console.log({
      startDate: props.startDate,
    });
    mutation.mutate(confirmform);
  };

  return (
    <div>
      <span>입장 하시겠습니까?</span>
      <br />
      <button onClick={onSubmitHandler}>확인</button>{" "}
      <button
        onClick={() => {
          props.setShowModal(false);
        }}
      >
        취소
      </button>
    </div>
  );
};

export default LobbyModal;
