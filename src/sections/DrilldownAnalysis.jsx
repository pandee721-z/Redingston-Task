// src/sections/DrilldownAnalysis.jsx
import React, { useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import * as XLSX from "xlsx";
import TimelineFilter from "../sections/filters/TimelineFilter";
import { IoFilter } from "react-icons/io5";

// ORIGINAL METRIC LIST (now used as dropdown options)
const METRICS = ["All", "Backlog", "Inventory", "Backlog & Inventory", "Booking"];

const initialDimensions = {
    level1: "BU",
    level2: "Brand",
    level3: "Cluster",
};

// TABLE DATA
const TABLE_ROWS = [
    { id: 1, name: "IBU", value: "$2.16 M" },
    { id: 2, name: "NBU", value: "$2.5 M" },
    { id: 3, name: "CAABU", value: "$3.5 M" },
    { id: 4, name: "ESBU", value: "$2.5 M" },
    { id: 5, name: "ORACLE", value: "$3.5 M" },
];

// DRILLDOWN NODES
const STATIC_NODES = {
    backlog: { id: "backlog", label: "Backlog", valueLabel: "$5.67M", level: 0 },
    caabu: { id: "caabu", label: "CAABU", valueLabel: "$47.1M", level: 1 },
    esbu: { id: "esbu", label: "ESBU", valueLabel: "$44.3M", level: 1 },
    oracle: { id: "oracle", label: "ORACLE", valueLabel: "$2.08M", level: 1 },

    brand1: { id: "brand1", label: "Brand 1", valueLabel: "$1M", level: 2 },
    brand2: { id: "brand2", label: "Brand 2", valueLabel: "$1.6M", level: 2 },

    dell: { id: "dell", label: "Dell", valueLabel: "$2.0M", level: 3 },
    asus: { id: "asus", label: "Asus", valueLabel: "$1.5M", level: 3 },
    lenovo: { id: "lenovo", label: "Lenovo", valueLabel: "$1.6M", level: 3 },

    egypt: { id: "egypt", label: "Egypt", valueLabel: "$25M", level: 4 },
    kenya: { id: "kenya", label: "Kenya", valueLabel: "$24.2M", level: 4 },
    qatar: { id: "qatar", label: "Qatar", valueLabel: "$47.1M", level: 4 },
    rome: { id: "rome", label: "Rome", valueLabel: "$25M", level: 4 },
    saudi: { id: "saudi", label: "Saudi", valueLabel: "$44.3M", level: 4 },
    southafrica: { id: "southafrica", label: "South Africa", valueLabel: "$2.08M", level: 4 },
};

// LINKS
const STATIC_LINKS = [
    { from: "backlog", to: "caabu", color: "green" },
    { from: "backlog", to: "esbu", color: "green" },
    { from: "backlog", to: "oracle", color: "green" },

    { from: "caabu", to: "brand1", color: "green" },
    { from: "caabu", to: "brand2", color: "pink" },

    { from: "brand1", to: "dell", color: "green" },
    { from: "brand2", to: "asus", color: "green" },
    { from: "brand2", to: "lenovo", color: "pink" },

    { from: "dell", to: "egypt", color: "green" },
    { from: "dell", to: "kenya", color: "green" },
    { from: "dell", to: "qatar", color: "green" },
    { from: "dell", to: "rome", color: "green" },
    { from: "dell", to: "saudi", color: "pink" },
    { from: "dell", to: "southafrica", color: "green" },
];

// POSITIONS
const POS = {
    backlog: { x: 140, y: 260 },

    caabu: { x: 360, y: 180 },
    esbu: { x: 360, y: 260 },
    oracle: { x: 360, y: 340 },

    brand1: { x: 580, y: 210 },
    brand2: { x: 580, y: 310 },

    dell: { x: 800, y: 260 },
    asus: { x: 800, y: 330 },
    lenovo: { x: 800, y: 390 },

    egypt: { x: 1040, y: 140 },
    kenya: { x: 1040, y: 200 },
    qatar: { x: 1040, y: 260 },
    rome: { x: 1040, y: 320 },
    saudi: { x: 1040, y: 380 },
    southafrica: { x: 1040, y: 440 },
};

const NODE_WIDTH = 120;
const NODE_HEIGHT = 60;
const NODE_RX = 10;

const GREEN = "#0a8a43";
const LIGHT_GREEN = "#57c28b";
const PINK = "#ff9e9e";

// DROPDOWN OPTIONS FOR DIMENSIONS (same choices as your <select>)
const LEVEL1_OPTIONS = [
    { label: "BU", value: "BU" },
    { label: "Brand", value: "Brand" },
    { label: "Cluster", value: "Cluster" },
];

const LEVEL2_OPTIONS = [
    { label: "Brand", value: "Brand" },
    { label: "CAABU", value: "CAABU" },
    { label: "NBU", value: "NBU" },
];

const LEVEL3_OPTIONS = [
    { label: "Cluster", value: "Cluster" },
    { label: "SubCluster", value: "SubCluster" },
];

// MAIN COMPONENT
const DrilldownAnalysis = () => {
    const [metric, setMetric] = useState("Backlog");
    const [dims, setDims] = useState(initialDimensions);
    const [viewMode, setViewMode] = useState("table");
    const [activeId, setActiveId] = useState(null);

    // POPUP STATES
    const [showTimelineFilter, setShowTimelineFilter] = useState(false);
    const [showAppliedFilter, setShowAppliedFilter] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState({});

    // DRILLDOWN LOGIC
    const { visibleNodes, visibleLinks } = useMemo(() => {
        const childrenMap = {};
        STATIC_LINKS.forEach((l) => {
            childrenMap[l.from] = childrenMap[l.from] || [];
            childrenMap[l.from].push(l.to);
        });

        const nodesToShow = new Set();
        const linksToShow = [];

        const visit = (id) => {
            if (!id || nodesToShow.has(id)) return;
            nodesToShow.add(id);
            const kids = childrenMap[id] || [];
            kids.forEach((ch) => {
                const link = STATIC_LINKS.find((L) => L.from === id && L.to === ch);
                if (link) linksToShow.push(link);
                visit(ch);
            });
        };

        activeId ? visit(activeId) : visit("backlog");

        return {
            visibleNodes: Array.from(nodesToShow).map((id) => STATIC_NODES[id]),
            visibleLinks: linksToShow,
        };
    }, [activeId]);

    const onNodeClick = (id) => setActiveId((prev) => (prev === id ? null : id));

    const pathBetween = (fromId, toId, color) => {
        const a = POS[fromId];
        const b = POS[toId];
        if (!a || !b) return null;

        const cx1 = a.x + (b.x - a.x) * 0.35;
        const cy1 = a.y;
        const cx2 = a.x + (b.x - a.x) * 0.65;
        const cy2 = b.y;

        return {
            d: `M ${a.x + NODE_WIDTH / 2} ${a.y}
                C ${cx1} ${cy1}
                  ${cx2} ${cy2}
                  ${b.x - NODE_WIDTH / 2} ${b.y}`,
            stroke: color === "pink" ? PINK : LIGHT_GREEN,
        };
    };

    const exportExcel = () => {
        const excelData = TABLE_ROWS.map((row) => ({
            Name: row.name,
            Value: row.value,
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, "Table View");
        XLSX.writeFile(wb, "Drilldown_Table.xlsx");
    };

    const TableView = () => (
        <div className="bg-white rounded-xl shadow-sm p-0">
            {/* HEADER */}
            <div className="px-6 py-4 flex justify-between items-center">
                <div className="text-sm font-semibold">
                    Backlog / Inventory / Backlog &amp; Inventory / Booking
                </div>

                <div
                    onClick={exportExcel}
                    className="flex items-center gap-2 cursor-pointer text-green-700"
                >
                    <i className="pi pi-download"></i>
                    <span className="text-sm">Export</span>
                </div>
            </div>

            {/* COLUMNS */}
            <div className="grid grid-cols-12 px-6 py-2 text-xs font-medium text-gray-400 border-b">
                <div className="col-span-10">BU</div>
                <div className="col-span-2 text-right">Value</div>
            </div>

            {/* ROWS */}
            {TABLE_ROWS.map((row) => (
                <div
                    key={row.id}
                    className="grid grid-cols-12 px-6 py-3 text-sm border-b hover:bg-gray-50"
                >
                    <div className="col-span-10 flex items-center gap-3">
                        <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            +
                        </button>
                        {row.name}
                    </div>

                    <div className="col-span-2 text-right">{row.value}</div>
                </div>
            ))}

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-6 py-6 text-sm">
                <button className="text-gray-400 flex items-center gap-1" disabled>
                    <i className="pi pi-angle-left"></i> Previous
                </button>

                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <button
                            key={n}
                            className={`w-7 h-7 rounded text-sm ${
                                n === 1
                                    ? "bg-green-600 text-white"
                                    : "hover:bg-gray-200 text-gray-700"
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
        </div>
    );

    // UI RENDER
    return (
        <div className="">
            {/* TOP BAR */}
            <div className="bg-white rounded-xl shadow-sm p-3 mb-3 flex justify-between items-center">
                <div className="flex  items-center">
                    <div className="bg-green-500 p-4  rounded-l-sm text-white flex items-center justify-center">
                                                    <IoFilter className="text-2xl" />
                                                </div>
                    <div>
                        
                
                        {/* PRIME DROPDOWN INSTEAD OF SELECT */}
                        <Dropdown
                            value={metric}
                            onChange={(e) => setMetric(e.value)}
                            options={METRICS.map((m) => ({ label: m, value: m }))}
                            placeholder="Metric"
                            className=" border rounded px-3 py-1 text-sm w-40"
                        />
                    </div>
                </div>

                {/* POPUP BUTTONS */}
                <div className="flex items-center gap-3">
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

            <div className="bg-white rounded-xl shadow-sm p-0 overflow-hidden flex">
                {/* LEFT DIMENSIONS PANEL */}
                <div className="w-72 p-6 border-r">
                    <h3 className="text-lg font-semibold mb-4">Choose Dimensions</h3>

                    <p className="text-sm mb-1">Level 1</p>
                    <Dropdown
                        value={dims.level1}
                        options={LEVEL1_OPTIONS}
                        onChange={(e) => setDims({ ...dims, level1: e.value })}
                        className="w-full border rounded px-3 py-2 text-sm mb-4 h-fit"
                    />

                    <p className="text-sm mb-1">Level 2</p>
                    <Dropdown
                        value={dims.level2}
                        options={LEVEL2_OPTIONS}
                        onChange={(e) => setDims({ ...dims, level2: e.value })}
                        className="w-full border rounded px-3 py-2 text-sm mb-4 h-fit"
                    />

                    <p className="text-sm mb-1">Level 3</p>
                    <Dropdown
                        value={dims.level3}
                        options={LEVEL3_OPTIONS}
                        onChange={(e) => setDims({ ...dims, level3: e.value })}
                        className="w-full border rounded px-3 py-2 text-sm h-fit"
                    />
                </div>

                {/* RIGHT MAIN AREA */}
                <div className="flex-1 p-6 relative">
                    {/* Table / Drill Toggle */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                            {viewMode === "table" ? "Table" : "Drilldown View"}
                        </h3>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode("table")}
                                className={`px-4 py-1 rounded border text-sm ${
                                    viewMode === "table"
                                        ? "bg-green-600 text-white"
                                        : "bg-white"
                                }`}
                            >
                                Table
                            </button>

                            <button
                                onClick={() => setViewMode("drill")}
                                className={`px-4 py-1 rounded text-sm ${
                                    viewMode === "drill"
                                        ? "bg-green-600 text-white"
                                        : "bg-white"
                                }`}
                            >
                                Drilldown View
                            </button>
                        </div>
                    </div>

                    {/* RENDER VIEWS */}
                    {viewMode === "table" ? (
                        <TableView />
                    ) : (
                        <div className="w-full h-[520px] relative">
                            <svg width="100%" height="520">
                                {/* LINKS */}
                                {STATIC_LINKS.map((lnk, idx) => {
                                    const p = pathBetween(lnk.from, lnk.to, lnk.color);
                                    if (!p) return null;

                                    const visible =
                                        !activeId ||
                                        visibleLinks.some(
                                            (x) => x.from === lnk.from && x.to === lnk.to
                                        );

                                    return (
                                        <path
                                            key={idx}
                                            d={p.d}
                                            stroke={p.stroke}
                                            strokeWidth={14}
                                            fill="none"
                                            opacity={visible ? 0.9 : 0.05}
                                            strokeLinecap="round"
                                        />
                                    );
                                })}

                                {/* NODES */}
                                {visibleNodes.map((node) => {
                                    const pos = POS[node.id];
                                    if (!pos) return null;

                                    return (
                                        <g
                                            key={node.id}
                                            transform={`translate(${pos.x - NODE_WIDTH / 2}, ${
                                                pos.y - NODE_HEIGHT / 2
                                            })`}
                                            cursor="pointer"
                                            onClick={() => onNodeClick(node.id)}
                                        >
                                            <rect
                                                width={NODE_WIDTH}
                                                height={NODE_HEIGHT}
                                                rx={NODE_RX}
                                                fill={GREEN}
                                                opacity={0.95}
                                            />
                                            <text
                                                x={NODE_WIDTH / 2}
                                                y={NODE_HEIGHT / 2 - 6}
                                                textAnchor="middle"
                                                fontSize="16"
                                                fill="#fff"
                                                fontWeight={700}
                                            >
                                                {node.label}
                                            </text>
                                            <text
                                                x={NODE_WIDTH / 2}
                                                y={NODE_HEIGHT / 2 + 14}
                                                textAnchor="middle"
                                                fontSize="12"
                                                fill="#fff"
                                            >
                                                {node.valueLabel}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>

                            {/* BOTTOM FILTER INFO */}
                            <div className="absolute left-6 bottom-4 bg-white border rounded px-3 py-2 shadow-sm text-xs">
                                <div className="font-medium">Applied Dimensions</div>
                                <div className="flex gap-2">
                                    <div className="bg-gray-100 px-2 py-1 rounded">
                                        Level 1: {dims.level1}
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 rounded">
                                        Level 2: {dims.level2}
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 rounded">
                                        Level 3: {dims.level3}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* POPUP MODALS - EDIT MODE */}
            <TimelineFilter
                visible={showTimelineFilter}
                mode="edit"
                onApply={(filters) => {
                    setAppliedFilters(filters);
                    setShowTimelineFilter(false);
                }}
                onClose={() => setShowTimelineFilter(false)}
            />

            {/* VIEW MODE */}
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

export default DrilldownAnalysis;
