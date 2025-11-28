import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { RiArrowUpDownFill } from "react-icons/ri";
import { IoFilter, IoFilterSharp } from "react-icons/io5";
import TimelineFilter from "../sections/filters/TimelineFilter";

const ROWS = [
    { id: 1, cluster: "Egypt", weeks: [3981259, 2150444, 3366334, 2659093, 3981259, 2150444, 3366334, 3366334] },
    { id: 2, cluster: "Kenya", weeks: [5203486, 2520171, 2150202, 2306202, 5203486, 2520171, 2150202, 2150202] },
    { id: 3, cluster: "Qatar", weeks: [11322440, 2414909, 5040134, 4511966, 11322440, 2414909, 5040134, 5040134] },
    { id: 4, cluster: "Rome", weeks: [15563167, 1528595, 1683160, 5078460, 15563167, 1528595, 1683160, 1683160] },
    { id: 5, cluster: "Saudi", weeks: [815834, 13244, 80922, 188522, 815834, 13244, 80922, 80922] },
    { id: 6, cluster: "South Africa", weeks: [11322440, 2414909, 5040134, 4511966, 11322440, 2414909, 5040134, 5040134] },
    { id: 7, cluster: "UAE", weeks: [15563167, 1528595, 1683160, 5078460, 15563167, 1528595, 1683160, 1683160] },
    { id: 8, cluster: "East Africa", weeks: [815834, 13244, 80922, 188522, 815834, 13244, 80922, 80922] },
    { id: 9, cluster: "FWN Africa", weeks: [815834, 13244, 80922, 188522, 815834, 13244, 80922, 80922] },
];

const num = (n) => n.toLocaleString("en-US");

const DetailedView = () => {
    const [expanded, setExpanded] = useState({});
    const toggleExpand = (id) =>
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    // 🔹 PRIME DROPDOWN STATES
    const [viewBy, setViewBy] = useState(null);
    const [drillBy, setDrillBy] = useState(null);

    const viewByOptions = [
        { label: "Backlog", value: "backlog" },
        { label: "Inventory", value: "inventory" },
        { label: "Booking", value: "booking" }
    ];

    const drillByOptions = [
        { label: "Brand", value: "brand" },
        { label: "BU", value: "bu" },
        { label: "Cluster", value: "cluster" }
    ];

    // POPUP FILTERS
    const [showTimelineFilter, setShowTimelineFilter] = useState(false);
    const [showAppliedFilter, setShowAppliedFilter] = useState(false);

    const [appliedFilters, setAppliedFilters] = useState({
        year: null,
        quarter: null,
        month: null,
        weeks: [],
    });

    // TOTAL ROW CALCULATIONS
    const totalWeeks = Array(8).fill(0);
    ROWS.forEach((r) => r.weeks.forEach((w, i) => (totalWeeks[i] += w)));
    const totalAll = totalWeeks.reduce((a, b) => a + b, 0);

    // EXCEL EXPORT
    const exportExcel = () => {
        const excelRows = ROWS.map((r) => ({
            Cluster: r.cluster,
            "Week 1": r.weeks[0],
            "Week 2": r.weeks[1],
            "Week 3": r.weeks[2],
            "Week 4": r.weeks[3],
            "Week 5": r.weeks[4],
            "Week 6": r.weeks[5],
            "Week 7": r.weeks[6],
            "Week 8": r.weeks[7],
            Total: r.weeks.reduce((a, b) => a + b, 0),
        }));

        const ws = XLSX.utils.json_to_sheet(excelRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Detailed View");
        XLSX.writeFile(wb, "Detailed_View.xlsx");
    };

    return (
        <div className="p-4">

            {/* FILTER SECTION */}
            <div>
                <div className="flex justify-between items-center gap-6">

                    {/* LEFT FILTERS */}
                    <div className="flex bg-white">
                        
<div className="bg-green-500 p-3 rounded-l-sm text-white flex items-center justify-center">
                            <IoFilter className="text-2xl" />
                        </div>
                        {/* PRIME REACT DROPDOWNS (Matching FullDashboard Style) */}
                        <div className="flex flex-col">

                            <label className="text-xs text-gray-500 ml-2">View By</label>
                            <Dropdown
                                value={viewBy}
                                options={viewByOptions}
                                onChange={(e) => setViewBy(e.value)}
                                placeholder="Backlog"
                                className=" w-40 h-fit"
                            />
                        </div>

                        <div className="flex flex-col bg-white">
                            <label className="text-xs text-gray-500">Drill By</label>
                            <Dropdown
                                value={drillBy}
                                options={drillByOptions}
                                onChange={(e) => setDrillBy(e.value)}
                                placeholder="Brand"
                                className="border-white w-40 h-fit"
                            />
                        </div>
                    </div>

                    {/* RIGHT FILTER BUTTONS */}
                    <div className="flex gap-4">
                        <Button
                            label="Show Applied Filter"
                            icon="pi pi-eye"
                            className="p-button-outlined p-button-sm text-green-700 border-green-600"
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

                {/* SECOND ROW HEADER */}
                <div className="flex justify-between items-center mt-2 p-2 bg-white border-b border-gray-200">
                    <div className="text-xl ml-4">Detailed View</div>

                    <div className="p-2 flex gap-2">
                        <Button
                            label="Export"
                            icon="pi pi-download"
                            onClick={exportExcel}
                            className="p-button-outlined p-button-xs text-green-700 border-green-600"
                        />

                        <Button label="Brand" className="p-button-outlined p-button-xs" />
                        <Button label="BU" className="p-button-outlined p-button-xs" />

                        <Button
                            label="Cluster"
                            className="p-button-xs bg-green-600 border-green-600"
                            style={{ color: "white" }}
                        />
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white overflow-hidden">

                {/* HEADER */}
                <div className="px-6 py-3 text-xs text-gray-600">
                    <div className="grid grid-cols-11 gap-4 font-medium">
                        <div className="col-span-2 flex items-center gap-2">Cluster <IoFilterSharp /></div>

                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="col-span-1 text-center flex items-center gap-2">
                                Week {i + 1} <RiArrowUpDownFill />
                            </div>
                        ))}

                        <div className="col-span-1 flex items-center gap-4 text-right">
                            Total <RiArrowUpDownFill />
                        </div>
                    </div>
                </div>

                {/* ROWS */}
                {ROWS.map((row) => {
                    const total = row.weeks.reduce((a, b) => a + b, 0);

                    return (
                        <div key={row.id} className="border-b px-6 py-3 hover:bg-gray-50">
                            <div className="grid grid-cols-11 gap-4 text-sm">

                                {/* EXPAND */}
                                <div className="col-span-2 flex items-center gap-3">
                                    <button
                                        onClick={() => toggleExpand(row.id)}
                                        className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full"
                                    >
                                        {expanded[row.id] ? "-" : "+"}
                                    </button>
                                    {row.cluster}
                                </div>

                                {/* WEEK VALUES */}
                                {row.weeks.map((w, i) => (
                                    <div key={i} className="col-span-1 text-center">
                                        {num(w)}
                                    </div>
                                ))}

                                {/* TOTAL */}
                                <div className="col-span-1 text-right font-semibold">{num(total)}</div>
                            </div>
                        </div>
                    );
                })}

                {/* TOTAL ROW */}
                <div className="px-6 py-4 bg-gray-50 font-semibold text-sm">
                    <div className="grid grid-cols-11 gap-4">
                        <div className="col-span-2">Over all</div>

                        {totalWeeks.map((v, i) => (
                            <div key={i} className="col-span-1 text-center">
                                {num(v)}
                            </div>
                        ))}

                        <div className="col-span-1 text-right">{num(totalAll)}</div>
                    </div>
                </div>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-6 mt-6 text-sm">
                <button className="text-gray-400 flex items-center gap-1" disabled>
                    <i className="pi pi-angle-left"></i> Previous
                </button>

                <div className="flex items-center gap-2">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <button
                            key={n}
                            className={`w-7 h-7 rounded text-sm ${
                                n === 1 ? "bg-green-600 text-white" : "hover:bg-gray-200 text-gray-700"
                            }`}
                        >
                            {n}
                        </button>
                    ))}
                </div>

                <button className="text-gray-600 flex items-center gap-1">
                    Next <i className="pi pi-angle-right"></i>
                </button>
            </div>

            {/* POPUPS */}
            <TimelineFilter
                visible={showTimelineFilter}
                mode="edit"
                appliedFilters={appliedFilters}
                onApply={(filters) => {
                    setAppliedFilters(filters);
                    setShowTimelineFilter(false);
                }}
                onClose={() => setShowTimelineFilter(false)}
            />

            <TimelineFilter
                visible={showAppliedFilter}
                mode="view"
                appliedFilters={appliedFilters}
                onApply={() => {
                    setShowAppliedFilter(false);
                    setShowTimelineFilter(true);
                }}
                onClose={() => setShowAppliedFilter(false)}
            />
        </div>
    );
};

export default DetailedView;
