import React from 'react';
import { Card } from 'primereact/card';

const MetricCard = ({ title, value, change, icon, bgColor = '#FFFFFF', textColor = '#000000' }) => {
    const isPositive = change.startsWith('+');
    const isDarkCard = bgColor === '#1B5E20';

    return (
        <Card
            className={`
                h-full rounded-xl shadow-sm
                ${isDarkCard
                    ? 'bg-green-900 border-none'
                    : 'bg-white border border-gray-300'
                }
            `}
        >
            <div className="p-2">
                <div className={`
                    text-sm font-medium mb-3
                    ${isDarkCard ? 'text-green-200' : 'text-gray-600'}
                `}>
                    {title}
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <div className={`
                        text-3xl
                        ${isDarkCard ? '' : 'grayscale'}
                    `}>
                        {icon === '💰' && '💵'}
                        {icon === '📦' && '📦'}
                        {icon === '💼' && '💼'}
                        {icon === '📊' && '📊'}
                        {icon === '📅' && '📅'}
                        {icon === '📈' && '📈'}
                    </div>
                    <div className={`
                        text-2xl font-bold
                        ${isDarkCard ? 'text-white' : 'text-black'}
                    `}>
                        {value}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                    <div className={`
                        flex items-center gap-1
                        ${isPositive ? 'text-green-500' : 'text-red-500'}
                    `}>
                        <i className={`pi ${isPositive ? 'pi-arrow-up' : 'pi-arrow-down'}`}></i>
                        <span className="font-semibold">{change}</span>
                    </div>
                    <span className={isDarkCard ? 'text-green-200' : 'text-gray-500'}>
                        Change from previous period in numbers
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default MetricCard;