import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import MaterialReactTable from "material-react-table";
import { useQuery, useMutation } from "react-query";
import styled from "styled-components";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { adminVisit, adminModify, DownLoadExcel } from "../../api/api";
import { color } from "../../utils/styles/color";
import Navbar from "../navbar/Navbar";

export default function AdminApproveList() {
  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    "guests",

    () => {
      return adminVisit();
    },
    {
      keepPreviousData: true,
      cacheTime: 0,
    },
  );

  const adminModifyMutation = useMutation(adminModify, {
    onSuccess: (data) => {
      JSON.parse(data.config.data).status === "2"
        ? Swal.fire("승인", "방문을 승인하셨습니다.", "success")
        : Swal.fire("거절", "방문을 거절하셨습니다.", "error");

      refetch();
    },
    onError: (error) => {
      Swal.fire("거절", "방문기록 수정 실패 ", error, "error");
    },
  });

  const HandlerApprove = (row) => {
    adminModifyMutation.mutate({
      id: row.original.id,
      status: "2",
    });
  };
  const HandlerReject = (row) => {
    adminModifyMutation.mutate({
      id: row.original.id,
      status: "3",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "location",
        header: "방문지역",
        size: 50,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Location" },
      },
      {
        accessorKey: "place",
        header: "방문장소",
        size: 50,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Place" },
      },
      {
        accessorKey: "target",
        header: "찾아갈분",
        size: 50,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "target" },
      },
      {
        accessorKey: "purpose",
        header: "목적",
        size: 50,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "purpose" },
      },
      {
        accessorKey: "startDate",
        header: "방문일자",
        size: 100,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "date" },
      },
      {
        accessorKey: "endDate",
        header: "방문종료",
        size: 100,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "date" },
      },
      // {
      //   accessorKey: "startTime",
      //   header: "방문시간",
      //   size: 20,
      // },
      {
        accessorKey: "status",
        header: "상태",
        size: 60,
        filterVariant: "select",
        filterSelectOptions: ["승인", "대기", "거절", "완료"],
        muiTableHeadCellFilterTextFieldProps: { placeholder: "status" },
      },
    ],
    [],
  );

  const HandlerExcel = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}_${date.getHours().toString().padStart(2, "0")}시${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}분`;
    DownLoadExcel()
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `${dateString}.xlsx`);
      })
      .catch((err) => alert("엑셀 다운로드 실패", err));
  };

  return (
    <>
      <Navbar />
      <DivApprove>
        <StDashBoardGnb>
          <StDashBoardTitleArea>
            <h2>승인현황표</h2>
          </StDashBoardTitleArea>
        </StDashBoardGnb>
        <DivTable>
          <MaterialReactTable
            columns={columns}
            data={
              data?.data.data.map((item) => ({
                ...item,
                startDate: item.startDate + " " + item.startTime.split("T")[1],
                endDate: item.endDate + " " + item.endTime.split("T")[1],
              })) ?? []
            }
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
              align: "center",
              sx: {
                fontWeight: "bold",
                fontSize: "15px",
                backgroundColor: `${color.tableHeader}`,
                color: `${color.textWhite}`,
              },
            }}
            muiTableBodyCellProps={({ cell, column }) => ({
              style: {
                color:
                  column.id === "status"
                    ? cell.getValue() === "대기"
                      ? "blue"
                      : cell.getValue() === "승인"
                      ? "green"
                      : cell.getValue() === "거절"
                      ? "red"
                      : cell.getValue() === "완료"
                      ? "black"
                      : "black"
                    : "black",
                fontWeight: "bold",
                textAlign: "center",
              },
            })}
            muiToolbarAlertBannerProps={
              isError
                ? {
                    color: "error",
                    children: "Error loading data",
                  }
                : undefined
            }
            renderTopToolbarCustomActions={() => (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip arrow title="Refresh Data">
                  <IconButton onClick={() => refetch()}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow title="Download Data">
                  <IconButton onClick={HandlerExcel}>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            enableRowActions
            positionActionsColumn="last"
            displayColumnDefOptions={{
              "mrt-row-actions": {
                header: "승인/거절",
              },
            }}
            renderRowActions={({ row }) => {
              if (row.original.status === "완료") return null;

              return (
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip arrow placement="left" title="승인">
                    <IconButton
                      color="success"
                      onClick={() => {
                        HandlerApprove(row);
                      }}
                      sx={{ fontSize: "14px" }}
                    >
                      <StSpanPositiveAlert>승인</StSpanPositiveAlert>
                    </IconButton>
                  </Tooltip>
                  <span>|</span>
                  <Tooltip arrow placement="right" title="거절">
                    <IconButton
                      color="error"
                      onClick={() => {
                        HandlerReject(row);
                      }}
                      sx={{ fontSize: "14px" }}
                    >
                      <StSpanNegativeAlert>거절</StSpanNegativeAlert>
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            }}
            rowCount={data?.meta?.totalRowCount ?? 0}
            state={{
              isLoading,
              showAlertBanner: isError,
              showProgressBars: isFetching,
            }}
            enablePagination={false}
          />
        </DivTable>
      </DivApprove>
    </>
  );
}

const DivApprove = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin-top: 5%;
`;

const DivTable = styled.div`
  width: 75%;
  height: 100vh;
`;
const StDashBoardGnb = styled.div`
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;
const StDashBoardTitleArea = styled.div``;

const StSpanPositiveAlert = styled.span`
  width: 40px;
  border: 1px solid green;
  border-radius: 10%;
  padding: 1% 3%;
  color: green;
`;

const StSpanNegativeAlert = styled.span`
  width: 40px;
  border: 1px solid #ef0505;
  border-radius: 10%;
  padding: 1% 3%;
  color: white;
  background-color: #ef0505;
`;
