import React from "react";
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
import { getConfirmList } from "../../api/api";

const data2 = [
  { date: "3월 29일", uv: 4000, pv: 2400, amt: 2400 },
  { date: "3월 30일", uv: 3000, pv: 1398, amt: 2210 },
  { date: "3월 31일", uv: 2000, pv: 9800, amt: 2290 },
  { date: "4월 01일", uv: 2780, pv: 3908, amt: 2000 },
  { date: "4월 02일", uv: 1890, pv: 4800, amt: 2181 },
  { date: "4월 03일", uv: 2390, pv: 3800, amt: 2500 },
  { date: "4월 04일", uv: 3490, pv: 4300, amt: 2100 },
];

const SimpleLineChart = () => {
  const { data } = useQuery("confirmList", getConfirmList);

  const dataList = data?.data;

  console.log(dataList);

  return (
    <>
      <ResponsiveContainer width="50%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={dataList}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          a
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="applyNumber" stroke="#8884d8" />
          <Line type="monotone" dataKey="approveNumber" stroke="#82ca9d" />
          <Line type="monotone" dataKey="sumNumber" stroke="#15c4fe" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="50%" height={300}>
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={dataList}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="date" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="applyNumber" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default SimpleLineChart;
