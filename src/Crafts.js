import React, { useEffect, useState } from "react";
import TimeSeriesOrders from './timeSeriesCharts/timeSeriesOrders';
import BarOrders from './barCharts/barOrders';
import HeaderComponent from "./components/headerComponent";
import { getDataByType, getDataByStatus, getTopBranches, getTimeSeriesData, apiBaseUrl } from "./utils/dataUtils";
import ReactLoading from 'react-loading';
import "./Crafts.css";
import EmptyState from "./components/EmptyState";

function Crafts() {
  const [keys] = useState({xAxisKey: 'name', yAxisKey: 'count'});
  const [loader, toggleLoader] = useState(false);
  const [data, updateData] = useState([]);
  const [filters, updateFilters] = useState({
		fromDate: new Date(new Date().getFullYear(), 0, 1),
		toDate: new Date(new Date().getFullYear(), 11, 31),
		orderStatus: '',
		orderType: ''
	});
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    toggleLoader(true);
    let url = `${apiBaseUrl}/orders`;
    if(filters) {
      url += `?orderType=${filters.orderType}&orderState=${filters.orderStatus}&fromDate=${filters.fromDate.getTime()}&toDate=${filters.toDate.getTime()}`;
    }
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updateData(data.orders);
      toggleLoader(false);
    });
  }

  const onFiltersChange = (newFilters) => {
    updateFilters({...filters, ...newFilters});
  }
  
  return (
    <div className="crafts-container">
      <HeaderComponent filters={filters} onFiltersChange={onFiltersChange} updateData={(filters) => getData(filters)} />
      {loader ? <div className="loader-container">
          <ReactLoading type={"spin"} color={"black"} height={50} width={50} ></ReactLoading>
        </div> : 
      <React.Fragment>
      {data.length === 0 ? <EmptyState /> : 
        <React.Fragment>
          <TimeSeriesOrders data={getTimeSeriesData(data)} />
          <BarOrders label={"Orders by type"} data={getDataByType(data)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey} />
          <BarOrders label={"Orders by state"} data={getDataByStatus(data)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey} />
          <BarOrders label={"Top 5 branches"} data={getTopBranches(data, 5)} xAxisKey={keys.xAxisKey} yAxisKey={keys.yAxisKey}  />
        </React.Fragment>
      }
      </React.Fragment>}
    </div>
  );
}

export default Crafts;
