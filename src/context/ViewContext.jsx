import React, { createContext, useState, useContext, useEffect } from 'react';

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
    // Initialize state from localStorage if available, otherwise default to "Summary View"
    const [currentView, setCurrentView] = useState(() => {
        try {
            const savedView = localStorage.getItem('app_current_view');
            return savedView ? JSON.parse(savedView) : "Summary View";
        } catch (error) {
            console.error("Failed to load view from local storage", error);
            return "Summary View";
        }
    });

    // Update localStorage whenever currentView changes
    useEffect(() => {
        try {
            localStorage.setItem('app_current_view', JSON.stringify(currentView));
        } catch (error) {
            console.error("Failed to save view to local storage", error);
        }
    }, [currentView]);

    return (
        <ViewContext.Provider value={{ currentView, setCurrentView }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useViewContext = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error('useViewContext must be used within a ViewProvider');
    }
    return context;
};
