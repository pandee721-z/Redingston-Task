import React from 'react';
import Logo from '../assets/logo.png';
import { FiLayers } from "react-icons/fi";
import { BiTargetLock } from "react-icons/bi";
import { AiOutlineFieldTime } from "react-icons/ai";

import { Home, BarChart2, Target, Boxes } from "lucide-react";

const Navigation = ({ activeMenu = "backlog", setActiveMenu }) => {

    const menuItems = [
        { icon: Home, label: 'Home', key: 'home' },
        { icon: AiOutlineFieldTime, label: 'Backlog', key: 'backlog' },
        { icon: BiTargetLock , label: 'Target', key: 'target' },
        { icon: FiLayers, label: 'Inventory', key: 'inventory' }
    ];

    return (
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center h-screen sticky top-0">

            {/* Logo */}
            <div className="bg-[#002B15] flex items-center justify-center w-20 h-20 mb-4">
                <img src={Logo} alt="Logo" width="41" height="60" />
            </div>

            {/* Menu Items */}
            {menuItems.map(({ icon: Icon, label, key }) => {
                const isActive = activeMenu === key;

                return (
                    <div
                        key={key}
                        onClick={() => setActiveMenu(key)}
                        className="flex flex-col items-center cursor-pointer mb-6 group"
                    >
                        {/* Icon Box */}
                        <div
                            className={`
                                w-12 h-12 rounded flex items-center justify-center
                                transition-all duration-200
                                ${isActive ? 'bg-green-600' : 'bg-[#EEF8F4]'}
                            `}
                        >
                            <Icon
                                size={24}
                                className={isActive ? "text-white" : "text-green-500"}
                            />
                        </div>

                        {/* Label */}
                        <span
                            className={`
                                mt-2 text-[12px] font-medium transition-colors duration-150
                                ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-black'}
                            `}
                        >
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Navigation;
