import React, { useState } from "react";

const postFrameActions = [
  { label: "Main", value: "main" },
  { label: "Details", value: "details" },
  { label: "Door and Window", value: "door" },
];

const PostFrame = () => {
  const [activeTab, setActiveTab] = useState("main");

  return (
    <div>
      <div className="table-row bg-white">
        {postFrameActions.map((action, index) => (
          <div
            key={index}
            className={clsx(
              "cursor-pointer table-cell px-4 py-2 h-full text-xs max-w-24 leading-4 border not-last:border-r-0 border-gray-300 text-center",
              activeTab === action.value ? "border-b-0" : "bg-gray-200"
            )}
            onClick={() => setActiveTab(action.value)}
          >
            <div className="flex items-center">{action.label}</div>
          </div>
        ))}
      </div>
      <div className="p-2">
        <div className="flex flex-col gap-1">
          <div className="table-row">
            <div className="table-cell w-full bg-gray-200 font-semibold align-middle px-3">
              Building Size
            </div>
            <div className="table-cell p-3 bg-sky-600 text-white">
              <FaChevronRight />
            </div>
          </div>
          <div className="table-row">
            <div className="table-cell w-full bg-gray-200 font-semibold align-middle px-3">
              Building Size
            </div>
            <div className="table-cell p-3 bg-sky-600 text-white">
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedEdit = () => {
  return (
    <div className="flex items-center flex-wrap justify-between h-full">
      <div className="flex flex-col shrink-0 grow basis-0 h-full">
        <div className="flex items-center p-0.5">
          <div className="relative">
            <div className="flex gap-2 items-center cursor-pointer text-sm px-2 py-1 rounded hover:bg-gray-300 transition-all duration-300">
              Openings
              <FaChevronDown />
            </div>
          </div>
          <div className="mx-2 w-[1px] bg-gray-400 h-5"></div>
          <div className="relative">
            <div className="flex gap-2 items-center cursor-pointer text-sm px-2 py-1 rounded hover:bg-gray-300 transition-all duration-300">
              Porch
              <FaChevronDown />
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-2 items-center cursor-pointer text-sm px-2 py-1 rounded hover:bg-gray-300 transition-all duration-300">
              Lean-to
              <FaChevronDown />
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-2 items-center cursor-pointer text-sm px-2 py-1 rounded hover:bg-gray-300 transition-all duration-300">
              Awning
              <FaChevronDown />
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-2 items-center cursor-pointer text-sm px-2 py-1 rounded hover:bg-gray-300 transition-all duration-300">
              Attached Building
            </div>
          </div>
        </div>
        <div className="h-2 bg-gray-400"></div>
        <div className="flex justify-between flex-col grow shrink-0 basis-0">
          <div className="grow shrink-0 basis-0 bg-sky-100">Stage</div>
          <div className="py-1 px-5 bg-sky-600 flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <div className="font-semibold capitalize px-3 text-white">
                View Options
              </div>
              <button className="cursor-pointer px-5 py-1 text-sm rounded bg-white hover:bg-gray-100 transition-all duration-300">
                Shell
              </button>
              <button className="cursor-pointer px-5 py-1 text-sm rounded bg-white hover:bg-gray-100 transition-all duration-300">
                Frame
              </button>
              <button className="cursor-pointer px-5 py-1 text-sm rounded bg-white hover:bg-gray-100 transition-all duration-300">
                Roof
              </button>
              <button className="cursor-pointer px-5 py-1 text-sm rounded bg-white hover:bg-gray-100 transition-all duration-300">
                Landscape
              </button>
              <button className="cursor-pointer px-5 py-1 text-sm rounded bg-white hover:bg-gray-100 transition-all duration-300">
                Landscape Settings
              </button>
              <button className="cursor-pointer px-5 py-1 text-sm rounded bg-white hover:bg-gray-100 flex items-center gap-2 transition-all duration-300">
                Change View
                <FaChevronUp />
              </button>
            </div>
            <div className="text-sm text-white">Powered by SmartBuild</div>
          </div>
        </div>
      </div>
      <div className="min-w-200px w-full md:w-1/4 h-full flex flex-col">
        <div className="py-1.5 px-3 text-sm">Post Frame</div>
        <div className="h-2 bg-gray-400"></div>
        <div className="flex flex-col grow shrink-0 basis-0 justify-between">
          <div>
            <PostFrame />
          </div>
          <div className="flex items-center gap-2 p-1 pb-3 bg-gray-200">
            <button className="min-w-15 py-2 text-sm bg-white rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-refresh"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
              </svg>
            </button>
            <input type="range" className="grow shrink-0 basis-0" />
            <div className="px-2">12s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedEdit;
