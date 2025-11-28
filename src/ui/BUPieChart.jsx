import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const BUPieChart = () => {
    const data = {
        labels: ['IBU', 'NBU', 'CABU', 'ESBU', 'ORACLE'],
        datasets: [
            {
                data: [12000000, 2400000, 2000000, 1700000, 1300000],
                backgroundColor: [
                    '#1B5E20',
                    '#FDD835',
                    '#9E9E9E',
                    '#81C784',
                    '#2E7D32'
                ],
                borderWidth: 0
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 11
                    },
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return chart.data.labels.map((label, i) => ({
                            text: label,
                            fillStyle: datasets[0].backgroundColor[i],
                            hidden: false,
                            index: i
                        }));
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${(value / 1000000).toFixed(1)}M`;
                    }
                }
            }
        }
    };

    const header = (
        <div className="flex justify-between items-center mb-4">
            <h3 className="m-0 text-lg font-semibold">By BU</h3>
            <div className="flex gap-2 items-center">
                <Button icon="pi pi-external-link" rounded text size="small" />
                <Button icon="pi pi-download" rounded text size="small" />
                <Button icon="pi pi-ellipsis-v" rounded text size="small" />
            </div>
        </div>
    );

    return (
        <Card
            header={header}
            className="bg-white border border-gray-300 rounded-xl shadow-sm"
        >
            <div className="h-85 flex items-center justify-center relative">
                <Pie data={data} options={options} />

                {/* Labels on pie */}
                <div className="absolute top-15 right-25 text-xs font-semibold text-gray-800">
                    <div>1,30,000</div>
                    <div className="text-gray-600 text-xxs">ORACLE</div>
                </div>

                <div className="absolute top-35 right-10 text-xs font-semibold text-gray-800 text-right">
                    <div>12,00,000</div>
                    <div className="text-gray-600 text-xxs">IBU</div>
                </div>

                <div className="absolute bottom-35 right-15 text-xs font-semibold text-gray-800">
                    <div>2,40,000</div>
                    <div className="text-gray-600 text-xxs">NBU</div>
                </div>

                <div className="absolute bottom-30 left-20 text-xs font-semibold text-gray-800">
                    <div>2,00,000</div>
                    <div className="text-gray-600 text-xxs">CABU</div>
                </div>

                <div className="absolute top-25 left-15 text-xs font-semibold text-gray-800">
                    <div>1,70,000</div>
                    <div className="text-gray-600 text-xxs">ESBU</div>
                </div>
            </div>
        </Card>
    );
};

export default BUPieChart;