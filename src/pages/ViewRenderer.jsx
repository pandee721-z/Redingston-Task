import React from "react";
import { useViewContext } from "../context/ViewContext";

import EmptyDashboard from "../sections/CardSection";
import ChartsSection from "../sections/ChartsSection";
import Trend52Weeks from "../sections/Trend52Weeks";
import KeyInsights from "../sections/KeyInsights";

import DetailedView from "../sections/DetailedView"; 
import DrilldownAnalysis from "../sections/DrilldownAnalysis";

const ViewRenderer = () => {
    const { currentView } = useViewContext();

    if (currentView === "Summary View") {
        return (
            <>
                <EmptyDashboard />
                <ChartsSection />
                <Trend52Weeks />
                <KeyInsights />
            </>
        );
    }

    if (currentView === "Detailed View") {
        return <DetailedView />;
    }

    if (currentView === "Drilldown Analysis") {
        return <DrilldownAnalysis />;
    }

    return <div>Invalid View</div>;
};

export default ViewRenderer;
