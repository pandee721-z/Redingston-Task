import React, { useState, useEffect } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import "../../timeline-small.css";

const TimelineFilter = ({ visible, onClose, mode = "edit", appliedFilters = {}, onApply }) => {
    // MASTER DATA
    const financialYears = ["2023", "2022", "2021"];
    const quartersMap = {
        "2023": ["Q1", "Q2", "Q3", "Q4"],
        "2022": ["Q1", "Q2", "Q3", "Q4"],
        "2021": ["Q1", "Q2", "Q3", "Q4"],
    };

    const monthsMap = {
        Q1: ["Jan", "Feb", "Mar"],
        Q2: ["Apr", "May", "Jun"],
        Q3: ["Jul", "Aug", "Sep"],
        Q4: ["Oct", "Nov", "Dec"],
    };

    const weeksMap = {
        Jan: ["W1", "W2", "W3", "W4"],
        Feb: ["W5", "W6", "W7", "W8"],
        Mar: ["W9", "W10", "W11", "W12"],
        Apr: ["W13", "W14", "W15", "W16"],
        May: ["W17", "W18", "W19", "W20"],
        Jun: ["W21", "W22", "W23", "W24"],
        Jul: ["W25", "W26", "W27", "W28"],
        Aug: ["W29", "W30", "W31", "W32"],
        Sep: ["W33", "W34", "W35", "W36"],
        Oct: ["W37", "W38", "W39", "W40"],
        Nov: ["W41", "W42", "W43", "W44"],
        Dec: ["W45", "W46", "W47", "W48"],
    };

   
    // STATE FOR EDIT MODE
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedWeeks, setSelectedWeeks] = useState([]);

    const toggleWeek = (wk) => {
        setSelectedWeeks(
            selectedWeeks.includes(wk)
                ? selectedWeeks.filter((x) => x !== wk)
                : [...selectedWeeks, wk]
        );
    };

    // Load applied filters into component when mode = view
    useEffect(() => {
        if (mode === "view" && appliedFilters) {
            setSelectedYear(appliedFilters.year || null);
            setSelectedQuarter(appliedFilters.quarter || null);
            setSelectedMonth(appliedFilters.month || null);
            setSelectedWeeks(appliedFilters.weeks || []);
        }
    }, [mode, appliedFilters]);

    
    // RENDER FOR VIEW MODE 
     if (mode === "view") {
        return (
            <>
                {visible && (
                    <div
                        className="fixed inset-0 bg-black/40 z-4000"
                        onClick={onClose}
                    ></div>
                )}

                <div
                    className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl z-5000 p-6 transition-transform duration-300
                    ${visible ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-md">Applied Filter</h2>
                        <i className="pi pi-times cursor-pointer" onClick={onClose}></i>
                    </div>

                    {/* YEAR */}
                    {selectedYear && (
                        <>
                            <h4 className="mt-4 text-sm">Financial Year</h4>
                            <FilterChip label={selectedYear} onRemove={() => setSelectedYear(null)} />
                        </>
                    )}

                    {/* QUARTER */}
                    {selectedQuarter && (
                        <>
                            <h4 className="mt-4 text-sm">Quarter</h4>
                            <FilterChip label={selectedQuarter} onRemove={() => setSelectedQuarter(null)} />
                        </>
                    )}

                    {/* MONTH */}
                    {selectedMonth && (
                        <>
                            <h4 className="mt-4 text-sm">Month</h4>
                            <FilterChip label={selectedMonth} onRemove={() => setSelectedMonth(null)} />
                        </>
                    )}

                    {/* WEEKS */}
                    {selectedWeeks.length > 0 && (
                        <>
                            <h4 className="mt-4 text-sm">Week</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedWeeks.map((w) => (
                                    <FilterChip
                                        key={w}
                                        label={w}
                                        onRemove={() =>
                                            setSelectedWeeks(selectedWeeks.filter((x) => x !== w))
                                        }
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    <div className="flex gap-2 mt-8">
                        <Button
                            label="Clear Filter"
                            className="w-full p-button-outlined"
                            onClick={() => {
                                setSelectedYear(null);
                                setSelectedQuarter(null);
                                setSelectedMonth(null);
                                setSelectedWeeks([]);
                            }}
                        />

                        <Button
                            label="Edit Filter"
                            className="w-full bg-green-600 text-white"
                            onClick={() =>
                                onApply({
                                    year: selectedYear,
                                    quarter: selectedQuarter,
                                    month: selectedMonth,
                                    weeks: selectedWeeks,
                                })
                            }
                        />
                    </div>
                </div>
            </>
        );
    }

    
    // EDIT MODE (normal Timeline Filters)
    return (
        <>
            {/* Overlay */}
            {visible && (
                <div
                    className="fixed inset-0 bg-black/40 z-4000"
                    onClick={onClose}
                ></div>
            )}

            {/* Slide Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-xl z-5000 p-4 transition-transform duration-300 
                ${visible ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-[12px] font-semibold">Timeline Filter</h2>
                    <i className="pi pi-times text-[12px]" onClick={onClose}></i>
                </div>

                {/* YEAR */}
                <h4 className="text-[11px] font-semibold mb-2">Financial Year</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {financialYears.map((yr) => (
                        <label key={yr} className="flex items-center gap-1">
                            <Checkbox
                                checked={selectedYear === yr}
                                onChange={() => {
                                    setSelectedYear(yr);
                                    setSelectedQuarter(null);
                                    setSelectedMonth(null);
                                    setSelectedWeeks([]);
                                }}
                                className="small-checkbox"
                            />
                            <span className="text-[10px]">{yr}</span>
                        </label>
                    ))}
                </div>

                {/* QUARTER */}
                {selectedYear && (
                    <>
                        <h4 className="text-[11px] font-semibold mb-2">Select Quarter</h4>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {quartersMap[selectedYear].map((q) => (
                                <label key={q} className="flex items-center gap-1">
                                    <Checkbox
                                        checked={selectedQuarter === q}
                                        onChange={() => {
                                            setSelectedQuarter(q);
                                            setSelectedMonth(null);
                                            setSelectedWeeks([]);
                                        }}
                                        className="small-checkbox"
                                    />
                                    <span className="text-[10px]">{q}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {/* MONTH */}
                {selectedQuarter && (
                    <>
                        <h4 className="text-[11px] font-semibold mb-2">Select Month</h4>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {monthsMap[selectedQuarter].map((m) => (
                                <label key={m} className="flex items-center gap-1">
                                    <Checkbox
                                        checked={selectedMonth === m}
                                        onChange={() => {
                                            setSelectedMonth(m);
                                            setSelectedWeeks([]);
                                        }}
                                        className="small-checkbox"
                                    />
                                    <span className="text-[10px]">{m}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {/* WEEK */}
                {selectedMonth && (
                    <>
                        <h4 className="text-[11px] font-semibold mb-2">Select Week</h4>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {weeksMap[selectedMonth].map((w) => (
                                <label key={w} className="flex items-center gap-1">
                                    <Checkbox
                                        checked={selectedWeeks.includes(w)}
                                        onChange={() => toggleWeek(w)}
                                        className="small-checkbox"
                                    />
                                    <span className="text-[10px]">{w}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {/* BUTTONS */}
                <div className="flex justify-between gap-2 mt-4">
                    <Button
                        label="Clear"
                        className="w-full p-button-outlined text-[11px]"
                        onClick={() => {
                            setSelectedYear(null);
                            setSelectedQuarter(null);
                            setSelectedMonth(null);
                            setSelectedWeeks([]);
                        }}
                    />

                    <Button
                        label="Apply"
                        className="w-full bg-green-700 text-white text-[11px]"
                        onClick={() =>
                            onApply({
                                year: selectedYear,
                                quarter: selectedQuarter,
                                month: selectedMonth,
                                weeks: selectedWeeks,
                            })
                        }
                    />
                </div>
            </div>
        </>
    );
};

/* SMALL CHIP COMPONENT */
const FilterChip = ({ label, onRemove }) => (
    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm w-fit">
        {label}
        <i className="pi pi-times text-xs cursor-pointer" onClick={onRemove}></i>
    </div>
);

export default TimelineFilter;
