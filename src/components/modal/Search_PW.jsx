import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SearchAdminPW } from "../../api/api";
import Search_PW_Modal from "./Search_PW_Modal";

function Search_PW() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(SearchAdminPW, {
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
    const search_PW = {
      userId,
      name,
      phoneNum,
      email,
      code,
    };
    console.log({
      userId,
      name,
      phoneNum,
      email,
      code,
    });
    mutation.mutate(search_PW);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <h4>비밀번호 찾기</h4>
        <div>
          <h5>아이디</h5>
          <input
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h5>이름</h5>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h5>전화번호</h5>
          <input
            value={phoneNum}
            onChange={(e) => {
              setPhoneNum(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h5>이메일</h5>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h5>코드</h5>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></input>
        </div>
        <button
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          확인
        </button>
      </form>
      {showModal === true ? (
        <Search_PW_Modal
          onClose={() => {
            setShowModal(false);
          }}
        />
      ) : null}
    </div>
  );
}

export default Search_PW;
