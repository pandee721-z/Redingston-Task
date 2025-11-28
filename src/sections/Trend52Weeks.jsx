import React, { useState, useRef, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import KeyInsights from "./KeyInsights";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const Trend52Weeks = () => {
    const [open, setOpen] = useState(true);

    const contentRef = useRef(null);

    //  LABELS 
    const labels = Array.from({ length: 52 }, (_, i) => `week ${i + 1}`);

    const values = [
        65000, 98000, 100000, 90000, 85000, 75000, 92000, 88000, 95000, 100000,
        72000, 55000, 76000, 78000, 75000, 72000, 74000, 73000, 90000, 50000,
        95000, 60000, 88000, 92000, 89000, 91000, 86000, 54000, 70000, 94000,
        95000, 93000, 72000, 85000, 82000, 90000, 78000, 90000, 88000, 96000,
        95000, 88000, 65000, 89000, 91000, 62000, 75000, 88000, 89000, 92000, 94000,
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Values in $",
                data: values,
                borderColor: "#10b981",
                backgroundColor: "#10b981",
                borderWidth: 2,
                tension: 0.35,
                pointRadius: 4,
                pointBackgroundColor: "#10b981",
                pointBorderColor: "#10b981",
                pointHoverRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => ` $${ctx.raw.toLocaleString()}`,
                },
                backgroundColor: "#064E3B",
                bodyFont: { size: 13 },
            },
        },
        scales: {
            x: {
                ticks: { font: { size: 10 }, maxRotation: 90, minRotation: 90 },
                grid: { color: "#F0F0F0", drawBorder: false },
            },
            y: {
                ticks: {
                    callback: (value) => `${value / 1000}K`,
                    font: { size: 10 },
                },
                grid: { borderDash: [3], color: "#E5E7EB" },
            },
        },
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 mt-4">

            {/*  HEADER  */}
            <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setOpen(!open)}
            >
                <h2 className="text-sm font-semibold text-gray-800">
                    Backlog - Last 52 Weeks Trend
                </h2>

                <i
                    className={`pi pi-chevron-down text-gray-600 text-sm transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                        }`}
                ></i>
            </div>

            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-500"
                style={{
                    maxHeight: open ? contentRef.current?.scrollHeight : 0,
                }}
            >
                <div className="h-72 mt-3">
                    <Line data={data} options={options} />
                </div>
            </div>
           
        </div>
    );
};

export default Trend52Weeks;
