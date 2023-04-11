import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import DatePicker from "react-datepicker";
import { submitConfirmForm } from "../api/api";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const ConfirmForm = ({ onClose, company }) => {
  const [location, setLocation] = useState(company.companyName);
  const [place, setPlace] = useState("");
  const [target, setTarget] = useState("");
  const [purpose, setPurpose] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [visitor, setVisitor] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  //datepicker 사용
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(submitConfirmForm, {
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries("user");
      onClose();
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const dateTimeStart = `${dateToString(startDate)}T${startTime}:00`;
    const dateTimeEnd = `${dateToString(endDate)}T${endTime}:00`;
    const confirmForm = {
      location,
      place,
      target,
      purpose,
      startDate: dateToString(startDate),
      startTime: dateTimeStart,
      endDate: dateToString(endDate),
      endTime: dateTimeEnd,
      visitor,
      phoneNum,
      status: "1",
    };
    mutation.mutate(confirmForm);
    console.log({
      location,
      place,
      target,
      purpose,
      startDate: dateToString(startDate),
      startTime: dateTimeStart,
      endDate: dateToString(endDate),
      endTime: dateTimeEnd,
      visitor,
      phoneNum,
      status: "1",
    });
  };

  return (
    <>
      <Header>방문 양식</Header>
      <MainWrapper>
        <Main1>
          <label
            htmlFor="location"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            방문지역
          </label>
          <div
            style={{
              fontSize: "18px",
            }}
          >
            {company.companyName}
          </div>
          {/* <input
            style={{
              marginLeft: "10px",
              marginRight: "75px",
              width: "200px",
              height: "30px",
              fontSize: "20px",
            }}
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            readOnly
          /> */}

          <label
            htmlFor="place"
            style={{
              paddingLeft: "100px",
              marginRight: "20px",
              fontSize: "18px",
            }}
          >
            방문장소
          </label>
          <input
            style={{
              marginLeft: "10px",
              width: "300px",
              height: "45px",
              fontSize: "18px",
            }}
            id={place}
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
        </Main1>
        <Main2>
          <label
            htmlFor="target"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            찾아갈 분
          </label>
          <input
            style={{
              marginLeft: "10px",
              marginRight: "90px",
              width: "300px",
              height: "45px",
              fontSize: "18px",
            }}
            id="target"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          />

          <label
            htmlFor="purpose"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            목적
          </label>
          <input
            style={{
              marginLeft: "10px",
              width: "300px",
              height: "45px",
              fontSize: "18px",
            }}
            id="purpose"
            value={purpose}
            onChange={(e) => {
              setPurpose(e.target.value);
            }}
          />
        </Main2>
        <hr />
        <TimeTable1>
          <label
            htmlFor="startDate"
            style={{
              marginLeft: "130px",
              paddingLeft: "0px",
              marginRight: "30px",
              fontSize: "18px",
            }}
          >
            방문 날짜
          </label>
          <DatePicker
            locale={ko}
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            customInput={
              <input
                style={{
                  marginLeft: "10px",
                  width: "150px",
                  height: "45px",
                  fontSize: "18px",
                }}
              />
            }
          />
          {/* <label
            htmlFor="startDate"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            방문 날짜{" "}
          </label>
          <input
            style={{
              marginLeft: "10px",
              marginRight: "50px",
              width: "200px",
              height: "30px",
              fontSize: "20px",
            }}
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          ></input> */}

          <label
            htmlFor="startTime"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            방문 시간
          </label>
          <input
            style={{
              marginLeft: "100px",
              width: "80px",
              height: "45px",
              fontSize: "18px",
            }}
            id="startTime"
            value={startTime}
            placeholder="00:00"
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          ></input>
        </TimeTable1>
        <span
          style={{
            marginLeft: "370px",
          }}
        >
          ⁓
        </span>
        <TimeTable2>
          <label htmlFor="endDate">종료 날짜 </label>
          <DatePicker
            locale={ko}
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={new Date()}
            customInput={
              <input
                style={{
                  marginLeft: "10px",
                  width: "150px",
                  height: "45px",
                  fontSize: "18px",
                }}
              />
            }
          />
          {/* <label
            htmlFor="endDate"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            종료 날짜
          </label>
          <input
            style={{
              marginLeft: "10px",
              marginRight: "50px",
              width: "200px",
              height: "30px",
              fontSize: "20px",
            }}
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          ></input> */}

          <label
            htmlFor="endTime"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            종료 시간
          </label>
          <input
            style={{
              marginLeft: "10px",
              width: "80px",
              height: "45px",
              fontSize: "18px",
            }}
            id="endTime"
            value={endTime}
            placeholder="00:00"
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          ></input>
        </TimeTable2>
        <Msg>
          <p>
            * 시간은 24시간 기준으로 입력해주세요. 예시 2023/03/30, 13:40,
            2023/03/31, 14:00
          </p>
        </Msg>

        <hr />
        <Visitor>
          <label
            htmlFor="visitor"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            이름
          </label>
          <div>{localStorage.getItem("name")}</div>
          <label
            htmlFor="phoneNum"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              fontSize: "18px",
            }}
          >
            전화번호
          </label>
          <input
            style={{
              marginLeft: "10px",
              width: "200px",
              height: "30px",
              fontSize: "20px",
            }}
            id="phoneNum"
            value={phoneNum}
            onChange={(e) => {
              setPhoneNum(e.target.value);
            }}
          />
        </Visitor>
        <CancelBtn onClick={onClose}>취소</CancelBtn>
        <SubmitBtn onClick={onSubmitHandler}>확인</SubmitBtn>
      </MainWrapper>
    </>
  );
};

export default ConfirmForm;

const Header = styled.div`
  background: white;
  position: relative;
  top: 25px;
  width: 916px;
  height: 75px;
  display: flex;
  padding-top: 30px;
  padding-left: 40px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 22px;
  font-weight: 700;
`;

const MainWrapper = styled.div`
  background: #f2f2f2;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  height: 630px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Main1 = styled.div`
  position: relative;
  left: -200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  margin: 0px -400px -50px -30px;
`;

const Main2 = styled.div`
  position: relative;
  left: 10px;
  top: -200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 300px 100px -150px 30px;
`;

const TimeTable1 = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center;
  align-items: center;
  padding: 30px 0px 30px 0px;
  margin-left: 20px; */
`;

const TimeTable2 = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px 30px 45px;
`;

const Visitor = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 50px 0px 5px 80px;
  gap: 80px;
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
  padding: 15px;

  position: relative;
  left: 400px;
  top: -25px;
  height: 25px;
  width: 100px;
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
  padding: 15px;

  position: relative;
  left: 250px;
  top: 30px;
  height: 25px;
  width: 100px;
`;

const Msg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #636fd7;
`;
