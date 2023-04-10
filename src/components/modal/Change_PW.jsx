import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ChangeAdminPW } from "../../api/api";

function Change_PW() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation(ChangeAdminPW, {
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const change_PW = {
      password,
      newPassword,
    };
    console.log({
      password,
      newPassword,
    });
    mutation.mutate(change_PW);
  };

  return (
    <>
      <div>
        현재 비밀번호
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div>
        변경할 비밀번호
        <input
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        ></input>
      </div>
      <button onClick={onSubmitHandler}>확인</button>
    </>
  );
}

export default Change_PW;
