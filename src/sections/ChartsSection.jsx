import React from "react";
import { Dropdown } from "primereact/dropdown";
// import { Button } from "primereact/button";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import HorizontalBarChart from "../components/HorizontalBarChart";

const ChartsSection = () => {
    const viewByOptions = [
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
    ];

    const valueOptions = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
    ];

    //VENDORS DATA 
    const vendorChartData = {
        labels: ["Vendor 1", "Vendor 2", "Vendor 3", "Vendor 4", "Vendor 5", "Vendor 6"],
        datasets: [
            {
                data: [600000, 350000, 700000, 550000, 480000, 430000],
                backgroundColor: "#10b981",
                borderRadius: 6,
            },
        ],
    };

    //  BU DATA 
    const buChartData = {
        labels: ["IBU", "ESBU", "NBU", "CABU", "ORACLE"],
        datasets: [
            {
                data: [1200000, 170000, 240000, 200000, 130000],
                backgroundColor: ["#195A2C", "#7ED957", "#C5D89D", "#F2E59A", "#587149"],
                borderWidth: 1,
            },
        ],
    };

    //  CLUSTER DATA 
    const clusterChartData = {
        labels: ["Saudi", "Rome", "Qatar", "Kenya", "Egypt"],
        datasets: [
            {
                data: [1100000, 800000, 1200000, 400000, 900000],
                backgroundColor: "#10b981",
                borderRadius: 6,
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  p-4">

            {/*  CARD 1: BY VENDORS  */}
            <div className="bg-white rounded-2xl shadow-md p-5">
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800">By Vendors</h3>

                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <i className="pi pi-refresh cursor-pointer" />
                        <i className="pi pi-download cursor-pointer" />
                        <i className="pi pi-ellipsis-h cursor-pointer" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex justify-end items-center  gap-3 text-xs text-gray-600 mb-2">
                    <span className="">View By</span>
                    <Dropdown options={viewByOptions} value="top" className="w-fit" />

                    <span>Values</span>
                    <Dropdown options={valueOptions} value="1" className="w-fit" />
                </div>

                {/* Chart */}
                <BarChart data={vendorChartData} />
            </div>

            {/*  CARD 2: BY BU  */}
            <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800">By BU</h3>

                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <i className="pi pi-refresh cursor-pointer" />
                        <i className="pi pi-download cursor-pointer" />
                        <i className="pi pi-ellipsis-h cursor-pointer" />
                    </div>
                </div>

                <PieChart data={buChartData} />
            </div>

            {/*  CARD 3: BY CLUSTER  */}
            <div className="bg-white rounded-2xl shadow-md p-5">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800">By Cluster</h3>

                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <i className="pi pi-refresh cursor-pointer" />
                        <i className="pi pi-download cursor-pointer" />
                        <i className="pi pi-ellipsis-h cursor-pointer" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex justify-end items-center gap-3 text-xs text-gray-600 mb-2">
                    <span>View By</span>
                    <Dropdown options={viewByOptions} value="top" className="w-fit" />

                    <span>Values</span>
                    <Dropdown options={valueOptions} value="1" className="w-fit" />
                </div>

                <HorizontalBarChart data={clusterChartData} />
            </div>

        </div>
    );
};

export default ChartsSection;
