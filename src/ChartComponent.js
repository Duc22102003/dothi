import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { sData } from "./const";
import Chart from "chart.js/auto";

function App() {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [begin, setBegin] = useState(0);

  // call whenever begin changed
  useEffect(() => {
    // call fetch function
  }, [begin]);

  useEffect(() => {
    // setInterval goes here.
    // Interval does increase "begin" ONLY
  }, []);

  // fixed 
  // update chartData mỗi khi data thay dổi
  useEffect(() => {
    console.log(data);
    update();
  }, [data]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/range?begin=${begin}&range=10`
    );
    
    responseToDataObject(response.data);
    // setRequestCount((prevCount) => prevCount + 1);
  }

  const responseToDataObject = (responseData) => {
    // const raw = JSON.parse(json);
    // console.log(raw);

    const payload = responseData.payload;

    const arr = [];
    payload.forEach((record) => {
      var start = record.timestamp * 1000;
      const vols = record.voltages;
      vols.forEach((vol) => {
        arr.push({
          time: start,
          voltage: vol,
        });
        start += 10;
      });
    });

    console.log("array: ", arr);
    setData(arr);
  };

  //
  const update = () => {
    if (data)
      setChartData({
        labels: data.map((entry) => entry.time),
        datasets: [
          {
            label: "Voltage",
            data: data.map((entry) => entry.voltage),
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
        ],
      });
  };

  return (
    <div>
      <h1>Đồ thị động</h1>
      {chartData && <Line data={chartData} />}
    </div>
  );
}

export default App;
