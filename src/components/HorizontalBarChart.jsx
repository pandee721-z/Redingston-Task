// components/HorizontalBarChart.jsx
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const HorizontalBarChart = ({ data }) => {
    const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => ` $${ctx.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            y: {
                grid: { display: false },
                ticks: { font: { size: 11 } }
            },
            x: {
                ticks: {
                    callback: (v) => `$${v / 1000}K`,
                    font: { size: 10 },
                },
                grid: { borderDash: [3], color: "#e5e7eb" },
            },
        },
    };

    return (
        <div className="h-64 w-full">
            <Bar data={data} options={options} />
        </div>
    );
};

export default HorizontalBarChart;
