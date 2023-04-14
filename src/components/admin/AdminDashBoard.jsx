import React, { useState, useMemo } from "react";
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
import MaterialReactTable from "material-react-table";
import { Box, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useMutation } from "react-query";
import { color } from "../../utils/styles/color";

import styled from "styled-components";
import Navbar from "../navbar/Navbar";

const SimpleLineChart = () => {
  const { data } = useQuery("confirmList", getConfirmList);
  const {
    data: getEnteringPeopleData,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useQuery("EnterPeople", getEnterPeople, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const [dataToDisplay, setDataToDisplay] = useState(data?.data);

  const dataList = data?.data
    .map((item) => {
      const date = new Date(item.date);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return {
        날짜: item.date,
        "총 신청 수": item.applyNumber,
        "총 승인 수": item.approveNumber,
        "총 출입 수": item.accessNumber,
      };
    })
    .sort((a, b) => new Date(a.날짜) - new Date(b.날짜));

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

  //표 구성
  const columns = useMemo(
    () => [
      {
        accessorKey: "visitor",
        header: "방문자",
        size: 50,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Visitor" },
      },
      {
        accessorKey: "location",
        header: "방문지역",
        size: 50,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Location" },
      },
      {
        accessorKey: "place",
        header: "방문장소",
        size: 100,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Place" },
      },
      {
        accessorKey: "purpose",
        header: "목적",
        size: 200,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Purpose" },
      },
      {
        accessorKey: "target",
        header: "찾아갈분",
        size: 50,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Target" },
      },
      {
        accessorKey: "inTime",
        header: "방문시작",
        size: 100,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "In Time" },
      },
      {
        accessorKey: "outTime",
        header: "방문종료",
        size: 100,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Out Time" },
      },
    ],
    [],
  );

  return (
    <>
      <Navbar />
      <StAdminMainDiv>
        <StDashBoardGnb>
          <StDashBoardTitleArea>
            <h2>출입관리그래프</h2>
            {/* <p>월별, 일별, 시간대별 출입현황을 조회할 수 있습니다.</p> */}
          </StDashBoardTitleArea>
          {/* <StDashBoardBtnArea>
            <button onClick={() => handleClick("monthly")}>Monthly</button>
            <button onClick={() => handleClick("daily")}>Daily</button>
            <button onClick={() => handleClick("byTimeOfDay")}>By time of day</button>
          </StDashBoardBtnArea> */}
        </StDashBoardGnb>
        <StContainer>
          <ResponsiveContainer width="80%" height={400}>
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
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="날짜" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="총 신청 수" stroke="#8884d8" strokeWidth={3} />
              <Line type="monotone" dataKey="총 승인 수" stroke="#82ca9d" strokeWidth={3} />
              <Line type="monotone" dataKey="총 출입 수" stroke="#15c4fe" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </StContainer>
      </StAdminMainDiv>
      <StDashBoardGnb>
        <StDashBoardTitleArea>
          <h2>출입현황표</h2>
        </StDashBoardTitleArea>
      </StDashBoardGnb>
      <DivTable>
        <MaterialReactTable
          columns={columns}
          data={
            getEnteringPeopleData?.data?.map((item) => ({
              ...item,
              inTime: item.inTime.split("T")[1],
              outTime: item.outTime ? item.outTime.split("T")[1] : " ",
            })) ?? []
          } //data is undefined on first render
          initialState={{
            showColumnFilters: false,
          }}
          isMultiSortEvent={() => true}
          filterFns={{
            customFilterFn: (row, id, filterValue) => {
              return row.getValue(id) === filterValue;
            },
          }}
          muiTableHeadCellProps={{
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: "bold",
              fontSize: "15px",
              backgroundColor: `${color.tableHeader}`,
              color: `${color.textWhite}`,
            },
          }}
          muiToolbarAlertBannerProps={
            isError
              ? {
                  color: "error",
                  children: "Error loading data",
                }
              : undefined
          }
          renderTopToolbarCustomActions={() => (
            <Tooltip arrow title="Refresh Data">
              <IconButton onClick={() => refetch()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton></IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error"></IconButton>
              </Tooltip>
            </Box>
          )}
          rowCount={data?.meta?.totalRowCount ?? 0}
          state={{
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isFetching,
          }}
        />
      </DivTable>
    </>
  );
};

export default SimpleLineChart;

const StAdminMainDiv = styled.div``;
const StDashBoardGnb = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;
const StDashBoardTitleArea = styled.div``;
const StDashBoardBtnArea = styled.div`
  display: flex;
  gap: 20px;
`;
const StContainer = styled.div`
  display: flex;
  padding: 0 2%;
  margin-left: 10%;
`;

const DivTable = styled.div`
  width: 70%;
  margin: 0 auto;
`;
