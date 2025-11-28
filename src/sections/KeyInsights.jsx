import React from "react";

const KeyInsights = () => {
    const insights = [
        "The approval rate is falling short of target by more than 10% in month of April",
        "In January, May, August and November, the approval rate is significantly higher than last year.",
        "In March, April, June and December, the approval rate is significantly lower than last year."
    ];

    return (
        <div className="bg-white rounded-xl shadow-md p-4 mt-6 w-full">

            {/*  HEADER  */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Key Insights</h3>

                <i className="pi pi-volume-up text-gray-600 text-lg cursor-pointer"></i>
            </div>

            {/*  LIST  */}
            <div className="space-y-1">
                {insights.map((text, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 py-3 border-b last:border-b-0 border-dashed border-gray-300"
                    >
                        <i className="pi pi-check-circle text-green-600 text-lg mt-0.5"></i>

                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold mr-1">{index + 1}.</span>
                            {text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeyInsights;
