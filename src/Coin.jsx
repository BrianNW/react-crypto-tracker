import React from 'react'
import './Coin.css'
// add chart for 7 day change data
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// register chart data
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Coin = ({ name, image, symbol, price, volume, priceChange, sparkline }) => {

   // Prepare data for chart
   const chartData = {
    labels: Array.from({ length: sparkline.length }, (_, i) => i), // Fake labels (indexes)
    datasets: [
      {
        data: sparkline, // Use sparkline data
        borderColor: priceChange < 0 ? "#ff4d4d" : "#4caf50", // Red for down, Green for up
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.2, // Smooth curve
      },
    ],
  };

  return (
    <div className="coin-container">
        <div className="coin-row">
            <div className="coin">
                <img src={image} alt="crypto" />
                <h1> {name} </h1>
                <p className="coin-symbol"> {symbol}</p>
            </div>
            <div className="coin-data">
              <p className="coin-price"> ${price.toLocaleString()} </p>
              <p className="coin-volume">${volume.toLocaleString()}</p>              
              {priceChange < 0 ? (
              <p className="coin-percent red"> {priceChange.toFixed(2)} %</p> ) : (
                <p className="coin-percent green"> {priceChange.toFixed(2)}%</p>)
              }
              {/* 7-day Trend Chart */}
            <div className="sparkline-chart">
              <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }} />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Coin
