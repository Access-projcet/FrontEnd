import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { date: "3월 29일", uv: 4000, pv: 2400, amt: 2400 },
  { date: "3월 30일", uv: 3000, pv: 1398, amt: 2210 },
  { date: "3월 31일", uv: 2000, pv: 9800, amt: 2290 },
  { date: "4월 01일", uv: 2780, pv: 3908, amt: 2000 },
  { date: "4월 02일", uv: 1890, pv: 4800, amt: 2181 },
  { date: "4월 03일", uv: 2390, pv: 3800, amt: 2500 },
  { date: "4월 04일", uv: 3490, pv: 4300, amt: 2100 },
];

const SimpleLineChart = () => {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      <Line type="monotone" dataKey="amt" stroke="#15c4fe" />
    </LineChart>
  );
};

export default SimpleLineChart;
