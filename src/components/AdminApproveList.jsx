import { Box, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useMemo, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import MaterialReactTable from "material-react-table";

import { useQuery } from "react-query";
import styled from "styled-components";
import { Delete, Edit } from "@mui/icons-material";

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
    async () => {
      const queryParams = {
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? "",
        sorting: JSON.stringify(sorting ?? []),
      };
      const instance = `${process.env.REACT_APP_SERVER_URL}/visit/admin`;

      const response = await axios.get(`${instance}/api/data`, {
        params: queryParams,
      });
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "location",
        header: "방문지역",
      },
      {
        accessorKey: "place",
        header: "방문장소",
      },
      {
        accessorKey: "target",
        header: "찾아갈분",
      },
      {
        accessorKey: "purpose",
        header: "목적",
      },
      {
        accessorKey: "startdate",
        header: "방문일자",
      },
      {
        accessorKey: "status",
        header: "상태",
      },
    ],
    []
  );

  return (
    <DivApprove>
      <MaterialReactTable
        columns={columns}
        data={data?.data ?? []} //data is undefined on first render
        initialState={{
          showColumnFilters: true,
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
                onClick={() => {
                  console.log("승인");
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => {
                  console.log("거절");
                }}
              >
                <Delete />
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
    </DivApprove>
  );
}

const DivApprove = styled.div`
  margin-left: 150px;
  height: 100vh;
`;
