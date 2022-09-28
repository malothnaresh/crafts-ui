import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip
} from "recharts";
export default class BarOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.getData();
  }
  getData = (page = "", size = 10, fromDate = "", toDate = "") => {
    document.getElementById("size").value = size;
    document.getElementById("page").value = page;
    fetch(
      // "https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow"
      "https://api.stackexchange.com/2.2/tags?" +
        new URLSearchParams({
          page: page,
          order: "desc",
          sort: "popular",
          site: "stackoverflow",
          pagesize: size,
          fromdate: fromDate,
          todate: toDate
        })
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.items });
      });
  };
  onSubmit = (e) => {
    const page = document.getElementById("page").value;
    const size = document.getElementById("size").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    this.getData(page, size, fromDate, toDate);
  };
  render() {
    const { data } = this.state;
    return (
      <div className="BarChart">
        <input type="number" id="size" placeholder="pagesize" />
        <input type="number" id="page" placeholder="page" />
        <input type="date" id="fromDate" placeholder="from date" />
        <input type="date" id="toDate" placeholder="to date" />
        <button onClick={this.onSubmit}>Submit</button>

        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis dataKey="count" />
            <Tooltip />
            <Bar type="monotone" dataKey="count" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
