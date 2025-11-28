// components/Layout.jsx
import React from 'react';
import Sidebar from '../ui/Sidebar';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

const Layout = ({ children, activeTab, setActiveTab, activeMenu, setActiveMenu }) => {
    const menuItems = [
        {
            label: 'Summary View',
            command: () => setActiveTab('summary'),
            className: activeTab === 'summary' ? 'active-menu' : ''
        },
        {
            label: 'Detailed View',
            command: () => setActiveTab('detailed')
        },
        {
            label: 'Drilldown Analysis',
            command: () => setActiveTab('drilldown')
        }
    ];

    const start = (
        <div className="flex items-center gap-4">
            <div className="bg-green-900 p-2 rounded-lg flex items-center justify-center w-10 h-10">
                <i className="pi pi-chart-bar text-white text-xl"></i>
            </div>
            <div>
                <h2 className="m-0 text-xl font-semibold">Backlog</h2>
            </div>
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Summary View
            </span>
        </div>
    );

    const end = (
        <div className="flex items-center gap-4">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    placeholder="Search"
                    className="rounded-full pl-10 bg-gray-100 border-none"
                />
            </span>
            <Button
                icon="pi pi-bell"
                rounded
                text
                className="relative"
            >
                <span className="absolute top-2 right-2 bg-green-500 w-2 h-2 rounded-full"></span>
            </Button>
            <Button icon="pi pi-book" rounded text />
            <Button icon="pi pi-star" rounded text />
            <Button icon="pi pi-moon" rounded text />
            <Avatar
                label="DW"
                className="bg-green-900 text-white"
                shape="circle"
            />
            <div>
                <div className="text-xs text-gray-600">Welcome,</div>
                <div className="font-semibold">David Williams</div>
            </div>
            <i className="pi pi-chevron-down text-sm"></i>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

            <div className="flex-1 ml-18">
                <Menubar
                    model={menuItems}
                    start={start}
                    end={end}
                    className="bg-white border-none rounded-none px-8 py-4"
                />

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;