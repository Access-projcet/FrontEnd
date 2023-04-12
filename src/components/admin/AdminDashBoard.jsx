import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useQuery } from "react-query";
import { getConfirmList, getEnterPeople } from "../../api/api";
import styled from "styled-components";

const SimpleLineChart = () => {
  const { data } = useQuery("confirmList", getConfirmList);
  const { data: getEnteringPeopleData } = useQuery("EnterPeople", getEnterPeople, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [dataToDisplay, setDataToDisplay] = useState(data?.data);

  const dataList = data?.data.map((item) => {
    const date = new Date(item.date);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return {
      날짜: item.date,
      "총 신청 수": item.applyNumber,
      "총 승인 수": item.approveNumber,
      "총 출입 수": item.accessNumber,
    };
  });

  //queryValidation 시 update 될 시 자동으로 렌더링 업데이트 추가
  // const newDataList = (item) => {
  //   const newDate = new Date(item.date);
  //   const newMonth = (newDate.getMonth() + 1).toString().padStart(2, "0");
  //   const newDay = newDate.getDate().toString().padStart(2, "0");
  //   const newDataList = {
  //     날짜: item.newDate,
  //     "총 신청 수": item.applyNumber,
  //     "총 승인 수": item.approveNumber,
  //     "총 출입 수": item.sumNumber,
  //   };
  //   setDataToDisplay((prevData) => [...prevData], newDataList);
  // };

  console.log(dataList);
  console.log(getEnteringPeopleData?.data);

  const transformDataToMonthly = (dataList) => {};
  const transformDataToDaily = (dataList) => {};
  const transformDataByTimeOfDay = (dataList) => {};
  const handleClick = (chartType) => {
    switch (chartType) {
      case "monthly":
        const monthlyData = transformDataToMonthly(dataList);
        setDataToDisplay(monthlyData);
        break;
      case "daily":
        const dailyData = transformDataToDaily(dataList);
        setDataToDisplay(dailyData);
        break;
      case "byTimeOfDay":
        const byTimeOfDayData = transformDataByTimeOfDay(dataList);
        setDataToDisplay(byTimeOfDayData);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StAdminMainDiv>
        <StDashBoardGnb>
          <StDashBoardTitleArea>
            <h2>출입현황표</h2>
            <p>월별, 일별, 시간대별 출입현황을 조회할 수 있습니다.</p>
          </StDashBoardTitleArea>
          <StDashBoardBtnArea>
            <button onClick={() => handleClick("monthly")}>Monthly</button>
            <button onClick={() => handleClick("daily")}>Daily</button>
            <button onClick={() => handleClick("byTimeOfDay")}>By time of day</button>
          </StDashBoardBtnArea>
        </StDashBoardGnb>
        <StContainer>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={dataList}
              margin={{
                top: 5,
                right: 40,
                left: 40,
                bottom: 5,
              }}
              a
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="날짜" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="총 신청 수" stroke="#8884d8" />
              <Line type="monotone" dataKey="총 승인 수" stroke="#82ca9d" />
              <Line type="monotone" dataKey="총 출입 수" stroke="#15c4fe" />
            </LineChart>
          </ResponsiveContainer>
        </StContainer>
      </StAdminMainDiv>
    </>
  );
};

export default SimpleLineChart;

const StAdminMainDiv = styled.div``;
const StDashBoardGnb = styled.div`
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;
const StDashBoardTitleArea = styled.div``;
const StDashBoardBtnArea = styled.div`
  display: flex;
  gap: 20px;
`;
const StContainer = styled.div`
  display: flex;
  padding: 2%;
  margin: 0 auto;
`;
