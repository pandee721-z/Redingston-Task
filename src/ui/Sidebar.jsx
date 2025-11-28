import React from "react";
import { BiTimer, BiTargetLock } from "react-icons/bi";
import { FiLayers } from "react-icons/fi";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
    const menuItems = [
        { icon: <i className="pi pi-home text-2xl"></i>, label: "Home", key: "home" },
        { icon: <BiTimer size={22} />, label: "Backlog", key: "backlog" },
        { icon: <BiTargetLock size={22} />, label: "Target", key: "target" },
        { icon: <FiLayers size={22} />, label: "Inventory", key: "inventory" }
    ];

    return (
        <div className="w-18 bg-white border-r border-gray-300 flex flex-col items-center pt-4 gap-2 h-screen fixed left-0 top-0 z-50">
            {menuItems.map((item) => (
                <div
                    key={item.key}
                    className={`
                        w-full flex flex-col items-center gap-1 py-3 cursor-pointer transition-all duration-200
                        ${activeMenu === item.key
                            ? "bg-green-50 border-l-4 border-green-700"
                            : "bg-transparent border-l-4 border-transparent"
                        }
                    `}
                    onClick={() => setActiveMenu(item.key)}
                >
                    <div className={`${activeMenu === item.key ? "text-green-700" : "text-gray-600"}`}>
                        {item.icon}
                    </div>

                    <span
                        className={`text-xs ${
                            activeMenu === item.key
                                ? "text-green-700 font-semibold"
                                : "text-gray-600 font-normal"
                        }`}
                    >
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
