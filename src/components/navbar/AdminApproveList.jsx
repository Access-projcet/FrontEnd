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
import Swal from "sweetalert2";

export default function AdminApproveList() {
  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    "guests", // 쿼리키

    () => {
      // const queryParams = {
      //   start: pagination.pageIndex * pagination.pageSize,
      //   size: pagination.pageSize,
      //   filters: JSON.stringify(columnFilters ?? []),
      //   globalFilter: globalFilter ?? "",
      //   sorting: JSON.stringify(sorting ?? []),
      // };
      // const queryParams = {
      //   orderby: "status",
      // };

      return adminVisit();
      ///visit-forms/sort
      // visit/admin
      // return adminVisitSort(queryParams);
    },
    {
      keepPreviousData: true,
      cacheTime: 0,
    }
  );

  const adminModifyMutation = useMutation(adminModify, {
    onSuccess: (data) => {
      Swal.fire("성공", "방문기록 수정 성공", "success");
      refetch();
    },
    onError: (error) => {
      Swal.fire("실패", error.response.data.message, "error");
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

  const ColoredText = (value) => {
    return <span style={{ color: "red" }}>{value}</span>;
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
        size: 200,
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
              startDate: item.startDate + " " + item.startTime.split("T")[1],
              endDate: item.endDate + " " + item.endTime.split("T")[1],
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
              fontSize: "30px",
              backgroundColor: `${color.tableHeader}`,
              color: `${color.textWhite}`,
            },
          }}
          muiTableBodyCellProps={({ column }) => ({
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontSize: "20px",
              color: `red`,
              boxShadow: column.getIsPinned() ? "0 0 0 2px red" : "none",
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
