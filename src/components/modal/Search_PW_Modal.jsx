import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { SearchEmail } from "../../api/api";

const Search_PW_Modal = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const gotosearch = () => {
    navigate("/search");
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(SearchEmail, {
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const onEmailHandler = (event) => {
    event.preventDefault();
    const search_Email = {
      email,
    };
    console.log({
      email,
    });
    mutation.mutate(search_Email);
  };

  return (
    <>
      <StBox>
        <StTxtContainer>
          <div>이메일을 입력하세요</div>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </StTxtContainer>
        <StCheckBtn onClick={onEmailHandler}>확인</StCheckBtn>
      </StBox>
    </>
  );
};

export default Search_PW_Modal;

const StBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`;
const StTxtContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 2;
`;

const StCheckBtn = styled.button`
  background-color: #636fd7;
  border-radius: 35px;
  width: 120px;
  height: 48px;
  color: white;
  font-size: 16px;
  font-weight: 700;
`;
