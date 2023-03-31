import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { submitconfirmform } from "../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Portal from "../components/modal/Portal";
import dayjs from "dayjs";

const ConfirmForm = ({ onClose }) => {
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
      <header>
        방문 신청하기
        <button className="close">x</button>
      </header>

      <main>
        <label htmlFor="location">방문지역</label>
        <input
          id="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />

        <label htmlFor="place">방문장소</label>
        <input
          id={place}
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
          }}
        />

        <label htmlFor="target">찾아갈 분:</label>
        <input
          id="target"
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
          }}
        />

        <label htmlFor="purpose">목적:</label>
        <input
          id="purpose"
          value={purpose}
          onChange={(e) => {
            setPurpose(e.target.value);
          }}
        />

        {/* <label htmlFor="startDate">시작날짜:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="yyyy-mm-dd hh-mm aa"
          showTimeInput
        />

        <label htmlFor="startDate">종료날짜:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          timeInputLabel="Time:"
          dateFormat="yyyy-mm-dd hh-mm aa"
          showTimeInput
        /> */}

        <label htmlFor="visitor">이름:</label>
        <input
          id="visitor"
          value={visitor}
          onChange={(e) => {
            setVisitor(e.target.value);
          }}
        />

        <label htmlFor="phoneNum">전화번호:</label>
        <input
          id="phoneNum"
          value={phoneNum}
          onChange={(e) => {
            setPhoneNum(e.target.value);
          }}
        />
      </main>

      <footer>
        <button onClick={onSubmitHandler}>신청하기</button>
      </footer>
    </>
  );
};

export default ConfirmForm;
const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  height: 100%;
  width: 950px;
  margin-top: 70px;
  position: relative;
  overflow: scroll;
`;
