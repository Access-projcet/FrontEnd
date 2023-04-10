import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useMemo, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import MaterialReactTable from "material-react-table";
import { useQuery, useMutation } from "react-query";
import styled from "styled-components";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

import { adminVisit, adminModify } from "../api/api";
import { color } from "../utils/styles/color";

export default function AdminApproveList() {
  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    "guests", // 쿼리키

    () => {
      return adminVisit();
    },
    {
      keepPreviousData: true,
      cacheTime: 0,
    }
  );

  const adminModifyMutation = useMutation(adminModify, {
    onSuccess: (data) => {
      console.log("succecc", data);
      alert("방문기록 수정 성공");
      refetch();
    },
    onError: (error) => {
      alert("방문기록 수정 실패");
      console.log("mu error", error);
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
        size: 100,
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
        size: 250,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "purpose" },
      },
      {
        accessorKey: "startDate",
        header: "방문일자",
        size: 300,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "date" },
      },

      {
        accessorKey: "status",
        header: "상태",
        size: 50,
        filterVariant: "select",
        filterSelectOptions: ["1", "2", "3", "4"],
        muiTableHeadCellFilterTextFieldProps: { placeholder: "status" },
      },
    ],
    []
  );

  return (
    <DivApprove>
      <DivTable>
        <MaterialReactTable
          columns={columns}
          data={
            data?.data.data.map((item) => ({
              ...item,
              startDate:
                item.startDate +
                " " +
                item.startTime +
                " - " +
                item.endDate +
                " " +
                item.endTime,
            })) ?? []
          } //data is undefined on first render
          initialState={{
            showColumnFilters: false,
          }}
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
                <IconButton
                  color="success"
                  onClick={() => {
                    HandlerApprove(row);
                  }}
                >
                  <TaskAltIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  onClick={() => {
                    HandlerReject(row);
                  }}
                >
                  <NotInterestedIcon />
                </IconButton>
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
    </DivApprove>
  );
}

const DivApprove = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const DivTable = styled.div`
  width: 70%;
  height: 100vh;
`;
