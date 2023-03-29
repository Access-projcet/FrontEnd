import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useQuery } from "react-query";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Delete, Edit } from "@mui/icons-material";
import { useMutation } from "react-query";
import { guestdeleteVisit, guestVisit } from "../api/api";

export default function GuestMyPageTable() {
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
      return guestVisit(queryParams);
    },
    {
      keepPreviousData: true,
    }
  );

  const deletemutaion = useMutation(guestdeleteVisit, {
    onSuccess: (data) => {
      console.log(data);
      alert("방문기록 삭제 성공");
      refetch();
    },
  });

  const HandlerDeleteVisit = (id) => {
    console.log(id);
    deletemutaion.mutate(id);
  };

  const HandlerEditVisit = (id) => {
    console.log("edit;", id);
    // deletemutaion.mutate(id);
  };
  console.log(data);

  const columns = useMemo(
    () => [
      {
        accessorKey: "location",
        header: "방문지역",
        size: 50,
      },
      {
        accessorKey: "place",
        header: "방문장소",
        size: 100,
      },
      {
        accessorKey: "target",
        header: "찾아갈분",
        size: 50,
      },
      {
        accessorKey: "purpose",
        header: "목적",
        size: 300,
      },
      {
        accessorKey: "startDate",
        header: "방문일자",
        size: 50,
      },
      {
        accessorKey: "startTime",
        header: "방문시간",
        size: 20,
      },
      {
        accessorKey: "status",
        header: "상태",
        size: 50,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data?.data.data ?? []} //data is undefined on first render
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
              onClick={(e) => {
                HandlerEditVisit(row.id);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton
              color="error"
              onClick={() => {
                HandlerDeleteVisit(row.id);
                console.log("del");
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
  );
}
