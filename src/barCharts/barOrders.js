import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from "recharts";


function CustomBarChart(props) {  
  console.log("testing: ", props.data);
  const { label, data, xAxisKey, yAxisKey, width=500, height=300 } = props;
  return (
    <div className="BarChart">
      <h3>{label}</h3>
      {data && <ResponsiveContainer width={"50%"} aspect={2}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey={xAxisKey} />
          <YAxis dataKey={yAxisKey} />
          <Tooltip />
          <Bar type="monotone" dataKey="count" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>}
    </div>
  );
}

export default CustomBarChart;