import React, { useEffect, useState } from "react";
import TimeSeriesOrders from './timeSeriesCharts/timeSeriesOrders';
import BarOrders from './barCharts/barOrders';
import HeaderComponent from "./components/headerComponent";
import { getDataByType, getDataByStatus, getTopBranches, getTimeSeriesData } from "./dataUtils";
import ReactLoading from 'react-loading';

import "./Crafts.css";

function Crafts() {
  const [keys] = useState({xAxisKey: 'name', yAxisKey: 'count'});
  const [loader, toggleLoader] = useState(false);
  const [data, updateData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = (filters) => {
    toggleLoader(true);
    let url = "http://localhost:8080/api/orders";
    if(filters) {
      url += `?orderType=${filters.orderType}&orderState=${filters.orderStatus}&fromDate=${filters.fromDate}&toDate=${filters.toDate}`;
    }
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updateData(data.orders);
      toggleLoader(false);
    });
  }
  
  return (
    <React.Fragment>
      {loader ? <div className="loader-container">
        <ReactLoading type={"spin"} color={"black"} height={50} width={50} ></ReactLoading>
      </div> :
      <div className="crafts-container">
        <HeaderComponent updateData={(filters) => getData(filters)} />
        <TimeSeriesOrders label={"Orders time series"} data={getTimeSeriesData(data.slice(0,20))} />
        <BarOrders label={"Orders by type"} data={getDataByType(data)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey} />
        <BarOrders label={"Orders by state"} data={getDataByStatus(data)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey} />
        <BarOrders label={"Top 5 branches"} data={getTopBranches(data, 5)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey}  />
      </div>}
    </React.Fragment>
  );
}

export default Crafts;
