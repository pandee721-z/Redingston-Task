// App.jsx
import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Button } from 'primereact/button';
import MetricCard from '../ui/MetricCard';
import VendorChart from '../ui/VendorChart';
import BUPieChart from '../ui/BUPieChart';
import ClusterBarChart from '../ui/ClusterBarChart';
import 'primereact/resources/themes/lara-light-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import EmptyDashboard from '../sections/CardSection';

const Backlog = () => {
    const [activeTab, setActiveTab] = useState('summary');
    const [activeMenu, setActiveMenu] = useState('backlog');

    const metricData = [
        {
            title: 'Backlog',
            value: '$166,845,565',
            change: '+2.5%',
            icon: '💰',
            bgColor: '#1B5E20'
        },
        {
            title: 'Inventory',
            value: '$87,702,961',
            change: '+2.5%',
            icon: '📦',
            bgColor: '#FFFFFF',
            textColor: '#000000'
        },
        {
            title: 'Backlog & Inventory',
            value: '$254,548,526',
            change: '+2.5%',
            icon: '💼',
            bgColor: '#FFFFFF',
            textColor: '#000000'
        },
        {
            title: 'Booking',
            value: '$36,886,188',
            change: '+2.5%',
            icon: '📊',
            bgColor: '#FFFFFF',
            textColor: '#000000'
        },
        {
            title: 'Quarter to Go',
            value: '$404,543,506',
            change: '+2.5%',
            icon: '📅',
            bgColor: '#FFFFFF',
            textColor: '#000000'
        },
        {
            title: 'Year to Go',
            value: '$46,896,128',
            change: '+2.5%',
            icon: '📈',
            bgColor: '#FFFFFF',
            textColor: '#000000'
        }
    ];

    return (
        <Layout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
        >
            {/* Filters Section */}
            <div className="bg-green-50 px-8 py-4 rounded-lg mb-8 flex gap-8 items-center">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-600">BU</label>
                    <select className="px-4 py-2 border border-gray-300 rounded bg-white min-w-30">
                        <option>All</option>
                        
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-600">Brand</label>
                    <select className="px-4 py-2 border border-gray-300 rounded bg-white min-w-30">
                        <option>All</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-600">Vendor</label>
                    <select className="px-4 py-2 border border-gray-300 rounded bg-white min-w-30">
                        <option>All</option>
                    </select>
                </div>
                <div className="ml-auto flex gap-4">
                    <Button
                        label="Show Applied Filter"
                        icon="pi pi-eye"
                        outlined
                        className="text-green-700 border-green-700"
                    />
                    <Button
                        label="Timeline Filters"
                        icon="pi pi-filter"
                        outlined
                        className="text-green-700 border-green-700"
                    />
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-6 gap-6 mb-8">
                {metricData.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <VendorChart />
                <BUPieChart />
                <ClusterBarChart />
            </div>
            <div className="">
                <EmptyDashboard />
            </div>

        </Layout>
    );
};

export default Backlog;