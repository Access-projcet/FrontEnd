import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { guestModify } from "../../api/api";
import styled from "styled-components";

export const ModifyForm = ({ onClose, data }) => {
  console.log(data);
  const [location, setLocation] = useState(data.location);
  const [place, setPlace] = useState(data.place);
  const [target, setTarget] = useState(data.target);
  const [purpose, setPurpose] = useState(data.purpose);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState(data.startTime.split("T")[1]);
  const [endTime, setEndTime] = useState(data.endTime.split("T")[1]);
  const [visitor, setVisitor] = useState(data.visitor);
  const [phoneNum, setPhoneNum] = useState(data.phoneNum);

  //datepicker 사용
  const [startDate, setStartDate] = useState(data.startDate.split(" ")[0]);
  const [endDate, setEndDate] = useState(data.endDate.split(" ")[0]);

  const queryClient = useQueryClient();

  const modifyMutation = useMutation(guestModify, {
    onSuccess: (response) => {
      alert("방문신청 기록 수정 성공");
      queryClient.invalidateQueries("guests");
      onClose();
    },
    onError: (error) => {
      alert("방문신청 기록 수정 실패");
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const dateTimeStart = `${startDate}T${startTime}:00`;
    const dateTimeEnd = `${endDate}T${endTime}:00`;
    const confirmForm = {
      id: data.id,
      data: {
        location,
        place,
        target,
        purpose,
        startDate,
        startTime: dateTimeStart,
        endDate,
        endTime: dateTimeEnd,
        visitor,
        phoneNum,
        status: "1",
      },
    };
    modifyMutation.mutate(confirmForm);
  };

  return (
    <MainContainer>
      <Header>
        <StTitle>방문 양식</StTitle>
      </Header>
      <MainWrapper>
        <Main1>
          <label htmlFor="location">방문지역</label>
          <input
            style={{
              marginLeft: "10px",
              marginRight: "75px",
              width: "82%",
              height: "45px",
              fontSize: "20px",
              border: "none",
              backgroundColor: "transparent",
            }}
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            readOnly
          />

          <label htmlFor="place">방문장소</label>
          <StInput
            style={{
              marginLeft: "10px",
              width: "82%",
              height: "45px",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px solid #D2D2D2",
            }}
            id={place}
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
            placeholder="방문장소를 입력해주세요."
          />
        </Main1>
        <Main2>
          <label htmlFor="target">찾아갈 분</label>
          <StInput
            style={{
              marginLeft: "10px",
              marginRight: "90px",
              width: "82%",
              height: "45px",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px solid #D2D2D2",
            }}
            id="target"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
            placeholder="찾아갈 분을 입력해주세요."
          />

          <label htmlFor="purpose">목적</label>
          <StInput
            style={{
              marginLeft: "10px",
              width: "82%",
              height: "45px",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px solid #D2D2D2",
            }}
            id="purpose"
            value={purpose}
            onChange={(e) => {
              setPurpose(e.target.value);
            }}
            placeholder="방문 목적을 입력해주세요."
          />
        </Main2>
        <StTimeWrapper>
          <TimeTable1>
            <div>
              <label htmlFor="startDate">방문 날짜 </label>
              <StInput
                style={{
                  marginLeft: "10px",
                  marginRight: "30px",
                  width: "116px",
                  height: "45px",
                  fontSize: "15px",
                  border: "1px solid #D2D2D2",
                  color: "#D2D2D2",
                }}
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              ></StInput>

              <label htmlFor="방문시간">시간</label>
              <StInput
                style={{
                  marginLeft: "10px",
                  marginRight: "30px",
                  width: "67px",
                  height: "45px",
                  fontSize: "15px",
                  border: "1px solid #D2D2D2",
                }}
                id="startTime"
                value={startTime}
                placeholder="00:00"
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              ></StInput>
            </div>
            <span
              style={{
                marginRight: "30px",
              }}
            >
              ⁓
            </span>
            <div>
              <label htmlFor="endDate">종료 날짜 </label>
              <StInput
                style={{
                  marginLeft: "10px",
                  marginRight: "30px",
                  width: "116px",
                  height: "45px",
                  fontSize: "15px",
                  border: "1px solid #D2D2D2",
                  color: "#D2D2D2",
                }}
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              ></StInput>

              <label htmlFor="endTime">시간 </label>
              <StInput
                style={{
                  marginLeft: "10px",
                  marginRight: "30px",
                  width: "67px",
                  height: "45px",
                  fontSize: "15px",
                  border: "1px solid #D2D2D2",
                }}
                id="endTime"
                value={endTime}
                placeholder="00:00"
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              ></StInput>
            </div>
          </TimeTable1>

          <Msg>
            <p>
              * 시간은 24시간 기준으로 입력해주세요. 예시 2023/03/30, 13:40,
              2023/03/31, 14:00
            </p>
          </Msg>
        </StTimeWrapper>

        <StVisitWrapper>
          <Visitor>
            <label htmlFor="visitor">이름 </label>
            <StInput
              style={{
                marginLeft: "10px",
                width: "82%",
                height: "45px",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid #D2D2D2",
              }}
              id="visitor"
              value={visitor}
              onChange={(e) => {
                setVisitor(e.target.value);
              }}
              placeholder="이름을 입력하세요"
            />

            <label htmlFor="phoneNum">전화번호</label>
            <StInput
              style={{
                marginLeft: "10px",
                width: "82%",
                height: "45px",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid #D2D2D2",
              }}
              id="phoneNum"
              value={phoneNum}
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
              placeholder="전화번호를 입력하세요"
            />
          </Visitor>
          <StBtnWrapper>
            <CancelBtn onClick={onClose}>취소</CancelBtn>
            <SubmitBtn onClick={onSubmitHandler}>확인</SubmitBtn>
          </StBtnWrapper>
        </StVisitWrapper>
      </MainWrapper>
    </MainContainer>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  background: white;
  width: 100%;
  display: flex;
  align-items: center;
  /* color: white; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: larger;
  font-weight: bold;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  height: calc(100% - 106px);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Main1 = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: 5rem 1fr 5rem 1fr;
  margin: 15px 30px;
  justify-content: center;
  align-items: center;

  /* flex-direction: row;
  justify-content: space-between;
  align-items: center; */
`;

const Main2 = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr 5rem 1fr;
  margin: 15px 30px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #cbcbcb;
  padding-bottom: 20px;
`;

const TimeTable1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimeTable2 = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Visitor = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: 5rem 1fr 5rem 1fr;
  margin: 15px 30px;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.div`
  border-radius: 35px;
  cursor: pointer;

  color: white;
  background: #636fd7;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 48px;
  margin: 10px;
`;

const CancelBtn = styled.div`
  border-radius: 35px;
  cursor: pointer;

  color: white;
  background: #656565;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 48px;
  margin: 10px;
`;

const Msg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #636fd7;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StTitle = styled.div`
  margin-left: 38px;
  height: 106px;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
`;

const StInput = styled.input`
  padding-left: 10px;
  &::placeholder {
    color: #d2d2d2;
  }
`;

const StTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #cbcbcb;
  margin: 15px 25px;
`;

const StVisitWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
`;
