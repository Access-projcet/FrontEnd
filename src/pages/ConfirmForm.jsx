import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { submitconfirmform } from "../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import dayjs from "dayjs";

const ConfirmForm = () => {
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const [target, setTarget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [visitor, setVisitor] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  //datepicker 사용
  // const [startDate, setStartDate] = useState(new Date().getFullYear());
  // const [endDate, setEndDate] = useState(new Date().getFullYear());

  // const dateFormat = dayjs().format("YYYY-MM-DD");

  const queryClient = useQueryClient();
  const mutation = useMutation(submitconfirmform, {
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
      location,
      place,
      target,
      purpose,
      startDate,
      startTime,
      endDate,
      endTime,
      visitor,
      phoneNum,
      status: "1",
    };
    console.log({
      place,
      target,
      purpose,
      startDate,
      startTime,
      endDate,
      endTime,
      visitor,
      phoneNum,
      status: "1",
    });
    mutation.mutate(confirmform);
  };

  return (
    <>
      <Header>방문 양식</Header>
      <MainWrapper>
        <Main>
          <label htmlFor="location">방문지역 &nbsp;&nbsp;</label>
          <input
            style={{ width: "200px", height: "30px", fontSize: "20px" }}
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          &nbsp;&nbsp;
          <label htmlFor="place">방문장소 &nbsp;&nbsp;</label>
          <input
            style={{ width: "200px", height: "30px", fontSize: "20px" }}
            id={place}
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
          &nbsp;&nbsp;
          <label htmlFor="target">찾아갈 분 &nbsp;&nbsp;</label>
          <input
            style={{ width: "200px", height: "30px", fontSize: "20px" }}
            id="target"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          />
          &nbsp;&nbsp;
          <label htmlFor="purpose">목적 &nbsp;&nbsp;</label>
          <input
            style={{ width: "200px", height: "30px", fontSize: "20px" }}
            id="purpose"
            value={purpose}
            onChange={(e) => {
              setPurpose(e.target.value);
            }}
          />
        </Main>

        <TimeTable>
          {/* <label htmlFor="startDate">시작날짜:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="yyyy-mm-dd hh-mm aa"
          showTimeInput
        /> */}
          {/* <label htmlFor="endDate">종료날짜:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          timeInputLabel="Time:"
          dateFormat="yyyy-mm-dd hh-mm aa"
          showTimeInput
        /> */}
          <label htmlFor="startDate">방문 날짜 &nbsp;&nbsp;</label>
          <input
            style={{ width: "200px", height: "30px", fontSize: "20px" }}
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          ></input>
          &nbsp;&nbsp;
          <label htmlFor="방문시간">방문 시간 &nbsp;&nbsp;</label>
          <input
            style={{ width: "200px", height: "30px", fontSize: "20px" }}
            id="startTime"
            value={startTime}
            placeholder="00:00"
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          ></input>
          &nbsp;&nbsp;
          <label htmlFor="endDate">종료 날짜 &nbsp;&nbsp;</label>
          <input
            style={{ width: "200px", height: "30px", fontSize: "20px" }}
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          ></input>
          &nbsp;&nbsp;
          <label htmlFor="endTime">종료 시간 &nbsp;&nbsp;</label>
          <input
            style={{ width: "200px", height: "30px", fontSize: "20px" }}
            id="endTime"
            value={endTime}
            placeholder="00:00"
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          ></input>
          <Msg>
            <p>
              * 시간은 24시간 기준으로 입력해주세요. 예시2023/03/30, 13:40,
              2023/03/31, 14:00
            </p>
          </Msg>
        </TimeTable>
        <Visitor>
          <label htmlFor="visitor">이름 &nbsp;&nbsp;</label>
          <input
            style={{ width: "400px", height: "30px", fontSize: "20px" }}
            id="visitor"
            value={visitor}
            onChange={(e) => {
              setVisitor(e.target.value);
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label htmlFor="phoneNum">전화번호 &nbsp;&nbsp;</label>
          <input
            style={{ width: "400px", height: "30px", fontSize: "20px" }}
            id="phoneNum"
            value={phoneNum}
            onChange={(e) => {
              setPhoneNum(e.target.value);
            }}
          />
        </Visitor>
        <SubmitBtn onClick={onSubmitHandler}>확인</SubmitBtn>
      </MainWrapper>
    </>
  );
};

export default ConfirmForm;

const Header = styled.div`
  background: grey;
  width: 100;
  display: flex;
  color: white;
  padding: 20px;
  border-radius: 4px;
  font-size: large;
`;

const MainWrapper = styled.div`
  /* background: grey; */
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`;

const Main = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  text-align: left;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 70px;
`;

const TimeTable = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 50px;
`;

const Visitor = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
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
  padding: 10px;

  position: relative;
  left: 600px;
  top: 50px;
  height: 30px;
  width: 100px;
`;

const Msg = styled.div`
  /* background: grey; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #636fd7;
`;
