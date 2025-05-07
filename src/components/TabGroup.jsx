import clsx from "clsx";
import React from "react";

const tabs = [
  { label: "3d View", value: "3d" },
  { label: "2d View", value: "2d" },
  { label: "Job Review", value: "job" },
  { label: "Drawings", value: "drawing" },
  { label: "Advanced Edit", value: "advanced" },
];

const TabGroup = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex items-center justify-between bg-gray-200">
      <div className="flex gap-0.5">
        {tabs.map((tab, index) => (
          <div
            className={clsx(
              "px-4 py-2 font-bold border-b-2 cursor-pointer transition-all duration-300",
              selectedTab === tab.value ? "border-sky-600 text-sky-600" : "border-gray-200"
            )}
            key={`tab-${index}`}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="flex gap-1 my-1 mx-4">
        <button className="rounded cursor-pointer px-2 py-1 text-sm text-sky-600 font-semibold uppercase border bg-white hover:border-sky-300 transition-all duration-300">
          Create Option
        </button>
        <button className="rounded cursor-pointer px-2 py-1 text-sm text-sky-600 font-semibold uppercase border bg-white hover:border-sky-300 transition-all duration-300">
          Print
        </button>
      </div>
    </div>
  );
};

export default TabGroup;
