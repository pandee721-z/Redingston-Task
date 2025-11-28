// components/PieChart.jsx
import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: { font: { size: 11 } },
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        const value = ctx.raw || 0;
                        return `$${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <div className="h-72 w-full">
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
