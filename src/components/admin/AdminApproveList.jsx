import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useMemo, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import MaterialReactTable from "material-react-table";
import { useQuery, useMutation } from "react-query";
import styled from "styled-components";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { saveAs } from "file-saver";

import { adminVisit, adminModify, DownLoadExcel } from "../../api/api";
import { color } from "../../utils/styles/color";

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
        size: 250,
        muiTableHeadCellFilterTextFieldProps: { placeholder: "purpose" },
      },
      {
        accessorKey: "startDate",
        header: "방문일자",
        size: 300,
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

  const HandlerExcel = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}_${date
      .getHours()
      .toString()
      .padStart(2, "0")}시${date.getMinutes().toString().padStart(2, "0")}분`;
    DownLoadExcel()
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `${dateString}.xlsx`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <DivApprove>
      <StBtnExcel onClick={HandlerExcel}>엑셀다운</StBtnExcel>
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

const StBtnExcel = styled.button`
  flex-direction: row-reverse;
  align-items: flex-end;
  cursor: pointer;
`;
