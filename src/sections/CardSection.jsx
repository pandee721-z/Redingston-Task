import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import TimelineFilter from "../sections/filters/TimelineFilter";
import handicon from "../assets/icons/hand-icon.png";
import inactivehandicon from "../assets/icons/hand-icon-inactive.png";
import { IoFilter } from "react-icons/io5";

const FullDashboard = () => {
    const [showTimelineFilter, setShowTimelineFilter] = useState(false);
    const [showAppliedFilter, setShowAppliedFilter] = useState(false);

    const [appliedFilters, setAppliedFilters] = useState({
        year: null,
        quarter: null,
        month: null,
        weeks: [],
    });
 const emptyFilters = [{ label: "All", value: null },    
    ];
    const emptyFiltersBU = [{ label: "All", value: null },
    { label: "IBU", value: "IBU" },
    { label: "NBU", value: "NBU" },   
    { label: "CAABU", value: "CAABU" },
    { label: "ORACLE", value: "ORACLE" }  
    ];

        const emptyFiltersBrand = [{ label: "All", value: null },
    { label: "Nutanix", value: "Nutanix" },
    { label: "Huawei", value: "Huawei" }, 
    { label: "Dell Server", value: "DellServer" },
    { label: "Cisco", value: "Cisco" },
    { label: "Fortinet", value: "Fortinet" },    
    ];

    const metrics = [
        { 
            title: "Backlog", 
            value: "$166,845,565", 
            change: "+2.5%", 
            icon: handicon, 
            isImage: true, 
            highlight: true, 
            bottom: "Change from previous period in numbers" 
        },
        { title: "Inventory", value: "$87,702,961", change: "+2.5%", icon: inactivehandicon, isImage:true,bottom: "Change from previous period in numbers" },
        { title: "Backlog & Inventory", value: "$254,548,526", change: "+2.5%", icon: inactivehandicon, isImage:true, bottom: "Change from previous period in numbers" },
        { title: "Booking", value: "$36,886,188", change: "+2.5%", icon: inactivehandicon, isImage:true, bottom: "Change from previous period in numbers" },
        { title: "Quarter to Go", value: "$404,543,506", change: "+2.5%", icon: inactivehandicon, isImage:true, bottom: "Change from previous period in numbers" },
        { title: "Year to Go", value: "$46,896,128", change: "+2.5%",icon: inactivehandicon, isImage:true, bottom: "Change from previous period in numbers" },
    ];

    return (
        <>
            <div className="px-4 bg-gray-50">

                {/* FILTERS ROW */}
                <div className="flex flex-wrap items-center mb-5">
                    <div className="bg-green-500 p-3 rounded-l-sm  text-white flex items-center justify-center">
<IoFilter className=" text-2xl " />

                    </div>
                    <Dropdown value={null} options={emptyFiltersBU} placeholder="BU" className="w-40 h-fit" />
                    <Dropdown value={null} options={emptyFiltersBrand} placeholder="Brand" className="w-40 h-fit" />
                    <Dropdown value={null} options={emptyFilters} placeholder="Vendor" className="w-40 h-fit" />

                    <div className="flex items-center gap-2 ml-auto">
                        <Button
                            label="Show Applied Filter"
                            className="p-button-outlined p-button-sm text-green-700 border-green-600"
                            icon="pi pi-eye"
                            onClick={() => setShowAppliedFilter(true)}
                        />

                        <Button
                            label="Timeline Filters"
                            icon="pi pi-filter"
                            className="p-button-outlined p-button-sm text-green-700 border-green-600"
                            onClick={() => setShowTimelineFilter(true)}
                        />
                    </div>
                </div>

                {/*  METRIC CARDS  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {metrics.map((item, index) => (
                        <div
                            key={index}
                            className={`rounded-xl p-4 shadow-sm flex flex-col gap-4 ${
                                item.highlight ? "bg-green-900 text-white" : "bg-white"
                            }`}
                        >
                            <h3 className="text-md font-semibold">{item.title}</h3>

                            <div className="flex items-center justify-between">
                                {item.isImage ? (
                                    <img 
                                        src={item.icon} 
                                        alt="metric-icon" 
                                        className="w-10 h-10"
                                    />
                                ) : (
                                    <i 
                                        className={`${item.icon} text-3xl ${
                                            item.highlight ? "text-white" : "text-green-600"
                                        }`}
                                    ></i>
                                )}

                                <div className="flex flex-col items-end">
                                    <span className="text-lg font-bold">{item.value}</span>
                                    <span
                                        className={`text-sm font-semibold flex items-center gap-1 ${
                                            item.highlight ? "text-green-200" : "text-green-600"
                                        }`}
                                    >
                                        <i className="pi pi-arrow-up text-xs"></i>
                                        {item.change}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] opacity-80">
                                <i
                                    className={`pi pi-info-circle ${
                                        item.highlight ? "text-white" : "text-gray-500"
                                    }`}
                                ></i>
                                <span>{item.bottom}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TIMELINE FILTER (EDIT MODE) */}
            <TimelineFilter
                visible={showTimelineFilter}
                mode="edit"
                onApply={(filters) => {
                    setAppliedFilters(filters);
                    setShowTimelineFilter(false);
                }}
                onClose={() => setShowTimelineFilter(false)}
            />

            {/* TIMELINE FILTER (VIEW MODE) */}
            <TimelineFilter
                visible={showAppliedFilter}
                mode="view"
                appliedFilters={appliedFilters}
                onApply={(filters) => {
                    setShowAppliedFilter(false);
                    setShowTimelineFilter(true);
                }}
                onClose={() => setShowAppliedFilter(false)}
            />
        </>
    );
};

export default FullDashboard;
