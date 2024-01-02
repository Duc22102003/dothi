import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function App() {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [],
  datasets: [
  ],});

  // set Chartdata whenever data changes
  useEffect(() => {
   update();
  }, [data]);

  const update = () => {
    if (data)setChartData(() => {
      return { labels: data.map((entry) => (entry) ? entry.time : ""),
        datasets: [
          {
            label: "Voltage",
            data: data.map((entry) => (entry) ? entry.voltage : ""),
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
        ],}
      });
  }

  return (
    <div>
      <h1>Đồ thị động</h1>
     { chartData && <Line data={chartData} />}
     
    </div>
  );
}

export default App;
