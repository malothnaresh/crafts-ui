import React from "react";

import Chart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        chart: {
          height: 350,
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#FF1654", "#247BA0"],
        series: [
          {
            name: "Orders",
            data: this.props.data.orders
          },
          {
            name: "Costs",
            data: this.props.data.costs
          }
        ],
        stroke: {
          width: [4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: this.props.data.categories
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#FF1654"
            },
            labels: {
              style: {
                colors: "#FF1654"
              }
            },
            title: {
              text: "Orders",
              style: {
                color: "#FF1654"
              }
            }
          },
          {
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#247BA0"
            },
            labels: {
              style: {
                colors: "#247BA0"
              }
            },
            title: {
              text: "Costs",
              style: {
                color: "#247BA0"
              }
            }
          }
        ],
        tooltip: {
          x: {
            show: true,
            format: "dd MMM - HH : mm "
          }
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40
        }
      };
  }

  render() {
    return (
      <div style={{ width: "100%", height: "500px" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <Chart
            options={this.state}
            series={this.state.series}
            type="line"
            height="500"
            width="100%"
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
