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
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    [
      "guests", // 쿼리키
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
      globalFilter,
      columnFilters,
    ],
    () => {
      const queryParams = {
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? "",
        sorting: JSON.stringify(sorting ?? []),
      };

      return adminVisit(queryParams);
    },
    {
      keepPreviousData: true,
    }
  );

  const adminModifyMutation = useMutation(adminModify, {
    onSuccess: (data) => {
      console.log(data);
      alert("방문기록 수정 성공");
      refetch();
    },
    onError: (error) => {
      alert("방문기록 수정 실패");
      console.log("mu error", error);
    },
  });

  const HandlerApprove = (id) => {
    console.log("승인 누름", id);
    adminModifyMutation.mutate({
      id,
      status: "2",
    });
  };
  const HandlerReject = (id) => {
    console.log("거절 누름", id);
    adminModifyMutation.mutate({
      id,
      status: "3",
    });
  };

  console.log(data?.data.data);
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
        size: 300,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "purpose" },
      },
      {
        accessorKey: "startDate",
        header: "방문일자",
        size: 200,
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
          muiTableHeadCellProps={{
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: "bold",
              fontSize: "15px",
              backgroundColor: `${color.tableHeader}`,
              color: `${color.textWhite}`,
            },
          }}
          manualFiltering
          manualPagination
          manualSorting
          muiToolbarAlertBannerProps={
            isError
              ? {
                  color: "error",
                  children: "Error loading data",
                }
              : undefined
          }
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
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
                    HandlerApprove(row.id);
                  }}
                >
                  <TaskAltIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  onClick={() => {
                    HandlerReject(row.id);
                  }}
                >
                  <NotInterestedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          rowCount={data?.meta?.totalRowCount ?? 0}
          state={{
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting,
          }}
          muiTablePaginationProps={{
            rowsPerPageOptions: [15],
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
