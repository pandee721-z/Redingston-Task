// components/BarChart.jsx
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

const BarChart = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: "#064E3B",
                padding: 8,
                titleFont: { size: 12 },
                bodyFont: { size: 14 },
                callbacks: {
                    label: (ctx) => ` $${ctx.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 11 } },
            },
            y: {
                ticks: {
                    callback: (v) => `${v / 1000}K`,
                    font: { size: 11 },
                },
                grid: {
                    borderDash: [3],
                    color: "#e5e7eb",
                },
            },
        },
    };

    return (
        <div className="h-64 w-full">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
