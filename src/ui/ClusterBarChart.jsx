import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import ReactECharts from 'echarts-for-react';

const ClusterBarChart = () => {
    const viewOptions = [
        { label: 'Top', value: 'top' }
    ];

    const valueOptions = [
        { label: '1', value: 1 }
    ];

    const option = {
        grid: {
            left: '12%',
            right: '5%',
            top: '10%',
            bottom: '10%'
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                fontSize: 11,
                color: '#666'
            },
            splitLine: {
                lineStyle: {
                    color: '#F0F0F0'
                }
            },
            max: 1400000
        },
        yAxis: {
            type: 'category',
            data: ['Egypt', 'Kenya', 'Qatar', 'Rome', 'Saudi'],
            axisLabel: {
                fontSize: 11,
                color: '#666'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                name: 'Cluster',
                type: 'bar',
                data: [
                    { value: 800000, itemStyle: { color: '#4CAF50' } },
                    { value: 400000, itemStyle: { color: '#4CAF50' } },
                    { value: 1300000, itemStyle: { color: '#4CAF50' } },
                    { value: 600000, itemStyle: { color: '#4CAF50' } },
                    { value: 1250000, itemStyle: { color: '#4CAF50' } }
                ],
                barWidth: '50%',
                itemStyle: {
                    borderRadius: [0, 4, 4, 0]
                }
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params) => {
                return `${params[0].name}: $${(params[0].value / 1000).toFixed(0)}K`;
            }
        }
    };

    const header = (
        <div className="flex justify-between items-center mb-4">
            <h3 className="m-0 text-lg font-semibold">By Cluster</h3>
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
            <div className="flex gap-4 mb-4 items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">View By</span>
                    <Dropdown
                        options={viewOptions}
                        value="top"
                        className="w-20 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Values</span>
                    <Dropdown
                        options={valueOptions}
                        value={1}
                        className="w-15 text-sm"
                    />
                </div>
            </div>

            <ReactECharts
                option={option}
                className="h-75 w-full"
                opts={{ renderer: 'svg' }}
            />
        </Card>
    );
};

export default ClusterBarChart;