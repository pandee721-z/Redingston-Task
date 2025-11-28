import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import ReactECharts from 'echarts-for-react';

const VendorChart = () => {
    const viewOptions = [
        { label: 'Top', value: 'top' }
    ];

    const valueOptions = [
        { label: '1', value: 1 }
    ];

    const option = {
        grid: {
            left: '15%',
            right: '5%',
            top: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: ['Vendor 1', 'Vendor 2', 'Vendor 3', 'Vendor 4', 'Vendor 5', 'Vendor 6'],
            axisLabel: {
                rotate: 0,
                fontSize: 11,
                color: '#666'
            },
            axisLine: {
                lineStyle: {
                    color: '#E0E0E0'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}K',
                fontSize: 11,
                color: '#666'
            },
            splitLine: {
                lineStyle: {
                    color: '#F0F0F0'
                }
            },
            max: 900
        },
        series: [
            {
                data: [
                    { value: 600, itemStyle: { color: '#2E7D32' } },
                    { value: 400, itemStyle: { color: '#2E7D32' } },
                    {
                        value: 700,
                        itemStyle: { color: '#2E7D32' },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: 'Mar\n$700K',
                            color: '#fff',
                            backgroundColor: '#1B5E20',
                            padding: [4, 8],
                            borderRadius: 4,
                            fontSize: 10
                        }
                    },
                    { value: 450, itemStyle: { color: '#2E7D32' } },
                    { value: 550, itemStyle: { color: '#2E7D32' } },
                    { value: 480, itemStyle: { color: '#2E7D32' } }
                ],
                type: 'bar',
                barWidth: '40%',
                itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                }
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        }
    };

    const header = (
        <div className="flex justify-between items-center mb-4">
            <h3 className="m-0 text-lg font-semibold">By Vendors</h3>
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

export default VendorChart;