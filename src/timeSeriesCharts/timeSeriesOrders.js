import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from "recharts";

function TimeSeriesChart({data, label}) {
  const [state, updateState] = useState({
    data,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: "dataMin-1",
    top2: "dataMax+20",
    bottom2: "dataMin-20",
    animation: true
  });
  const [showChart] = useState([true, true]);

  const getAxisYDomain = (from, to, ref, offset) => {
    const refData = state.data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach(d => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };


  const zoom = () => {
    let { refAreaLeft, refAreaRight, data } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      updateState({
        ...state,
        refAreaLeft: "",
        refAreaRight: ""
      });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "lastUpdated", 1);
    const [bottom2, top2] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      "ordersCount",
      50
    );

    updateState({
      ...state,
      refAreaLeft: "",
      refAreaRight: "",
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2
    });
  }

  const zoomOut = () => {
    updateState(({ data }) => ({
      ...state,
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      top2: "dataMax+50",
      bottom: "dataMin"
    }));
  }

  return (
    <div className="highlight-bar-charts">
      <button className="btn update" onClick={() => zoomOut()}>
        Zoom Out
      </button>
      {/* <button className="btn update" onClick={() => updateShoChart([...showChart, s])}>
        Toggle Chart 1
      </button>
      <button className="btn update" onClick={() => zoomOut()}>
        Toggle Chart 2
      </button> */}

      <h3>{label}</h3>
      <LineChart
        width={800}
        height={400}
        data={state.data}
        onMouseDown={e => updateState({ ...state, refAreaLeft: e.activeLabel })}
        onMouseMove={e =>
          state.refAreaLeft &&
          updateState({ ...state, refAreaRight: e.activeLabel })
        }
        onMouseUp={() => zoom()}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDataOverflow={true}
          dataKey="lastUpdated"
          domain={[state.left, state.right]}
          type="number"
        />
        <YAxis
          allowDataOverflow={true}
          domain={[state.bottom, state.top]}
          type="number"
          yAxisId="1"
        />
        <YAxis
          orientation="right"
          allowDataOverflow={true}
          domain={[state.bottom2, state.top2]}
          type="number"
          yAxisId="2"
        />
        <Tooltip />
        {showChart[0] && <Line
          yAxisId="1"
          type="natural"
          dataKey="cost"
          stroke="#8884d8"
          animationDuration={300}
        />}
        {showChart[1] && <Line
          yAxisId="2"
          type="natural"
          dataKey="ordersCount"
          stroke="#82ca9d"
          animationDuration={300}
        />}

        {state.refAreaLeft && state.refAreaRight ? (
          <ReferenceArea
            yAxisId="1"
            x1={state.refAreaLeft}
            x2={state.refAreaRight}
            strokeOpacity={0.3}
          />
        ) : null}
      </LineChart>
    </div>
  );
}

export default TimeSeriesChart;