import react, { useEffect, useState } from "react";
import TimeSeriesOrders from './timeSeriesCharts/timeSeriesOrders';
import BarOrders from './barCharts/barOrders';
import HeaderComponent from "./components/headerComponent";
import { dataSeries } from "./timeSeriesCharts/ordersDataGenerator";
import { getDataByType, getDataByStatus, getTopBranches, getTimeSeriesData } from "./dataUtils";

import "./Crafts.css";

function Crafts() {
  const [keys] = useState({xAxisKey: 'name', yAxisKey: 'count'});
  useEffect(() => {
    fetch('http://localhost:8080/api/orders')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  
  return (
    <div className="crafts-container">
      <HeaderComponent />
      {/* <FiltersComponent /> */}
      <TimeSeriesOrders label={"Orders time series"} data={getTimeSeriesData(dataSeries.slice(0,20))} />
      <BarOrders label={"Orders by type"} data={getDataByType(dataSeries)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey} />
      <BarOrders label={"Orders by state"} data={getDataByStatus(dataSeries)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey} />
      <BarOrders label={"Top 5 branches"} data={getTopBranches(dataSeries, 5)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey}  />
    </div>
  );
}

export default Crafts;
