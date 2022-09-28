import React from "react";
import Chart from "react-apexcharts";
import { dataSeries } from "./ordersData";
const Orders = () => {
  var ts2 = 1484418600000;
  var dates = [];
  for (var i = 0; i < 120; i++) {
    ts2 = ts2 + 86400000;
    var innerArr = [ts2, dataSeries[1][i].value];
    dates.push(innerArr);
  }
  const state = {
    series: [
      {
        name: "XYZ MOTORS",
        data: dates
      }
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: "Stock Price Movement",
        align: "left"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          }
        },
        title: {
          text: "Price"
        }
      },
      xaxis: {
        type: "datetime"
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          }
        }
      }
    }
  };

  return (
    <div className="helo">
      <div className="he">hello</div>
      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default Orders;
