import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useQuery } from "react-query";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Delete, Edit } from "@mui/icons-material";
import { useMutation } from "react-query";
import { guestDeleteVisit, guestVisit, guestModify } from "../../api/api";
import { color } from "../../utils/styles/color";

export default function GuestMyPageTable() {
  const [isMofify, setIsModify] = useState(false);

  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    "guests", // 쿼리키

    () => {
      return guestVisit();
    },
    {
      //query key가 변경되어도 새 데이터가 요청되는 동안 마지막 성공fetch data로 유지
      //이후 query 요청이 성공시에 새로운값으로 변경.
      keepPreviousData: true,
      //캐싱타임을 0으로 줘서 필터링시에 쓸데없는 캐싱을 하지않고 새로운 데이터를 요청하게함.
      cacheTime: 0,
    }
  );

  const deleteMutaion = useMutation(guestDeleteVisit, {
    onSuccess: (data) => {
      console.log(data);
      alert("방문기록 삭제 성공");
      refetch();
    },
  });

  const modifyMutation = useMutation(guestModify, {
    onSuccess: (data) => {
      console.log(data);
      alert("방문기록 수정 성공");
      refetch();
    },
  });

  const HandlerDeleteVisit = (row) => {
    console.log("row", row.original.id);
    deleteMutaion.mutate(row.original.id);
  };

  const HandlerEditVisit = (row) => {
    console.log("edit;", row.original.id);
    setIsModify(true);
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
      //   muiTableHeadCellFilterTextFieldProps: { placeholder: "time" },
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
              onClick={(e) => {
                HandlerEditVisit(row);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton
              color="error"
              onClick={(e) => {
                HandlerDeleteVisit(row);
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
        isLoading,
        showAlertBanner: isError,
        showProgressBars: isFetching,
      }}
    />
  );
}
