import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ConfirmForm = () => {
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const [target, setTarget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visitor, setVisitor] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  //datepicker 사용
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onSubmitHandler = async () => {
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/reviews`,
      {
        location,
        place,
        target,
        purpose,
        startDate,
        // startTime,
        endDate,
        // endTime,
        visitor,
        phoneNum,
        status: "1",
      }
      // { headers: { authorization: token } }
    );
    console.log({
      location,
      place,
      target,
      purpose,
      startDate,
      // startTime,
      endDate,
      // endTime,
      visitor,
      phoneNum,
      status: "1",
    });
  };

  return (
    <div>
      {"방문지역:"}
      <input
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <br />
      {"방문장소:"}
      <input
        value={place}
        onChange={(e) => {
          setPlace(e.target.value);
        }}
      />
      <br />
      {"찾아갈 분:"}
      <input
        value={target}
        onChange={(e) => {
          setTarget(e.target.value);
        }}
      />
      <br />
      {"목적:"}
      <input
        value={purpose}
        onChange={(e) => {
          setPurpose(e.target.value);
        }}
      />
      <br />
      {" 시작날짜:"}
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeInputLabel="Time:"
        dateFormat="yyyy-mm-dd hh-mm aa"
        showTimeInput
      />
      {" 종료날짜:"}
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        timeInputLabel="Time:"
        dateFormat="yyyy-mm-dd hh-mm aa"
        showTimeInput
      />
      {"이름:"}
      <input
        value={visitor}
        onChange={(e) => {
          setVisitor(e.target.value);
        }}
      />
      <br />
      {"전화번호:"}
      <input
        value={phoneNum}
        onChange={(e) => {
          setPhoneNum(e.target.value);
        }}
      />
      <br />
      <button onClick={onSubmitHandler}>신청하기</button>
    </div>
  );
};

export default ConfirmForm;
