import React from 'react';
import TopBar from '../modules/TopBar';
import Navigation from '../ui/Navigation';
import ViewRenderer from '../pages/ViewRenderer'; // ⬅ important

const DashboardLayout = () => {
    return (
        <div className="bg-gray-50">
            <div className="flex w-full">

                {/* Sidebar */}
                <Navigation />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">

                    {/* Header */}
                    <TopBar />

                    {/* Dynamic content based on context */}
                    <div className="flex-1 p-4">
                        <ViewRenderer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
