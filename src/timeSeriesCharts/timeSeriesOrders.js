import Chart from "react-apexcharts";

function TimeSeriesChart({data}) {
  const state = {
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
        data: data.orders
      },
      {
        name: "Costs",
        data: data.costs
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
      categories: data.categories
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

  return (
    <div style={{ width: "100%", height: "500px" }}>
    <div style={{ width: "100%", height: "100%" }}>
      <Chart
        options={state}
        series={state.series}
        type="line"
        height="500"
        width="100%"
      />
    </div>
  </div>
  );
}

export default TimeSeriesChart;