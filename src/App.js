import logo from './logo.svg';
import './App.css';
import TimeSeriesOrders from './timeSeriesCharts/timeSeriesOrders';
import BarOrders from './barCharts/barOrders';

function App() {
  return (
    <div className="App">
      <TimeSeriesOrders />
      <BarOrders />
    </div>
  );
}

export default App;
