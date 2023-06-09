import React from "react";
import styled from "styled-components";
import GuestMyPageTable from "../components/guest/GuestMyPageTable";
import Navbar from "../components/navbar/Navbar";

const GuestMyPage = () => {
  return (
    <>
      <DivMyPageContainer>
        <Navbar />
        <DivMyPageTable>
          <GuestMyPageTable />
        </DivMyPageTable>
      </DivMyPageContainer>
    </>
  );
};

export default GuestMyPage;

const DivMyPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DivMyPageTable = styled.div`
  width: 80%;
  height: 80vh;
  margin-top: 100px;
`;
