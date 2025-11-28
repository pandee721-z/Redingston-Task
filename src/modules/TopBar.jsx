import React from 'react'
import Logo from '../assets/logo.png'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { IoMdContrast } from "react-icons/io";
import Avatar from '../assets/avatar.png'
import { IoAccessibilityOutline } from "react-icons/io5";
import { Badge } from 'primereact/badge';
import { BookOpen, ChevronDown, PersonStanding } from 'lucide-react';
import { useViewContext } from '../context/ViewContext';

const TopBar = () => {
    const { currentView, setCurrentView } = useViewContext();

    const tabs = ["Summary View", "Detailed View", "Drilldown Analysis"];

    return (
        <div className='w-full z-3000'>
            <div className='flex py-2  items-center shadow-xl justify-between'>
                {/* left side */}
                <div className='flex items-center ms-10 gap-4'>
                    <p className='text-[30px] font-semibold'>Backlog</p>
                    <div
                        style={{ padding: "4px 14px" }}
                        className='bg-[#E5F3EC] text-[16px]  transition-all duration-300 font-semibold rounded-lg text-[#029046]'
                    >
                        {currentView}
                    </div>
                </div>

                {/* right side */}
                <div className='flex items-center justify-between gap-8'>
                    <div className='flex items-center bg-gray-200 gap-2 px-3 py-2 rounded-lg'>
                        <i className="pi pi-search text-gray-500"></i>
                        <input type="text" className='outline-none border-none bg-transparent' placeholder='Search' />
                    </div>

                    <div className='bg-gray-200 border border-gray-300 p-overlay-badge rounded flex items-center gap-2 px-2 py-1'>
                        <i className="pi pi-book"></i>
                        <span>Notes</span>
                        <Badge value="2" size={"small"} severity="success"></Badge>
                    </div>

                    {/* header icons */}
                    <div className='flex items-center gap-4'>
                        <BookOpen />
                        <PersonStanding />
                        <IoMdContrast size={20} />
                    </div>

                    {/* Profile section */}
                    <div className='flex items-center border-l-2 border-gray-300 gap-2 px-10 cursor-pointer leading-5'>
                        <img src={Avatar} alt="Avatar" className='w-8 h-8 rounded-full object-cover mr-2' />
                        <div>
                            <p className='m-0 text-[10px]'>Welcome,</p>
                            <p className='m-0 text-sm font-semibold'>David Williams</p>
                        </div>
                        <ChevronDown className='ms-4' size={14} />
                    </div>
                </div>
            </div>

            {/* --------------- BOTTOM TABS --------------- */}
            <div className="w-full bg-[#E5F3EC] relative h-10">
                <div className="flex ms-1 absolute  items-center ">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setCurrentView(tab)}
                            className={`
                                px-6 py-2.5 text-sm cursor-pointer hover:bg-green-500 hover:opacity-70 hover:text-white hover:scale-105  font-medium rounded-b-md transition-all duration-300
                                ${currentView === tab
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-600 border border-gray-300 border-b-0"
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopBar