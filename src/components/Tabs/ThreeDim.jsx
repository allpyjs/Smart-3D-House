import clsx from "clsx";
import React, { useRef, useState } from "react";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";

import House from "./House";

import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

const postFrameActions = [
  { label: "Main Building", value: "main" },
  { label: "Details", value: "details" },
  { label: "Door and Window", value: "door" },
  { label: "Packages", value: "package" },
  { label: "Job", value: "job" },
];

const PostFrame = ({ params, setParams }) => {
  const [activeTab, setActiveTab] = useState("main");

  return (
    <div className="flex flex-col">
      <div className="table-row bg-white overflow-x-auto w-full">
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
        <div className="flex flex-col gap-1 px-3">
          <div className="flex items-center gap-2">
            <div className="text-sm">Width</div>
            <input
              type="number"
              className="outline-0 px-4 py-2 max-w-40 rounded border border-gray-400 focus:border-sky-600 transition-all duration-300"
              value={params.width}
              onChange={(e) =>
                setParams({
                  ...params,
                  width: Number(e.target.value),
                })
              }
              step={0.1}
              min={80}
              max={90}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm">Length</div>
            <input
              type="number"
              className="outline-0 px-4 py-2 max-w-40 rounded border border-gray-400 focus:border-sky-600 transition-all duration-300"
              value={params.length}
              onChange={(e) =>
                setParams({
                  ...params,
                  length: Number(e.target.value),
                })
              }
              min={1}
              max={6}
              step={0.1}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm">Ceiling Height</div>
            <input
              type="number"
              className="outline-0 px-4 py-2 max-w-40 rounded border border-gray-400 focus:border-sky-600 transition-all duration-300"
              value={params.ceilingHeight}
              onChange={(e) =>
                setParams({
                  ...params,
                  ceilingHeight: Number(e.target.value),
                })
              }
              min={2}
              max={10}
              step={0.1}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm">Roof Pitch</div>
            <input
              type="number"
              className="outline-0 px-4 py-2 max-w-40 rounded border border-gray-400 focus:border-sky-600 transition-all duration-300"
              value={params.roofRiseIn12}
              onChange={(e) =>
                setParams({
                  ...params,
                  roofRiseIn12: Number(e.target.value),
                })
              }
              min={2}
              max={10}
              step={0.1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function exportSTL(object3D, filename = "house.stl", binary = false) {
  const exporter = new STLExporter();
  const result = exporter.parse(object3D, { binary });

  const blob = binary
    ? new Blob([result], { type: "application/octet-stream" })
    : new Blob([result], { type: "text/plain" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportOBJ(object3D, filename = "house.obj") {
  const exporter = new OBJExporter();
  const result = exporter.parse(object3D); // returns string

  const blob = new Blob([result], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportGLTF(object3D, name = "house", binary = false) {
  const exporter = new GLTFExporter();

  exporter.parse(
    object3D,
    (result) => {
      let blob;
      let filename;

      if (binary) {
        blob = new Blob([result], { type: "application/octet-stream" });
        filename = `${name}.glb`;
      } else {
        const json = JSON.stringify(result, null, 2);
        blob = new Blob([json], { type: "application/json" });
        filename = `${name}.gltf`;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    },
    { binary }
  );
}

const ThreeDim = ({ params, setParams }) => {
  const sceneRef = useRef();

  const handleExportSTL = () => {
    const house = sceneRef.current;
    if (!house) return;
    exportSTL(house, "house.stl");
  };

  const handleExportObj = () => {
    const house = sceneRef.current;
    if (!house) return;
    exportOBJ(house, "house.obj");
  };

  const handleExportGLTF = () => {
    const house = sceneRef.current;
    if (!house) return;
    exportGLTF(house, "house.gltf");
  };

  return (
    <div className="flex items-center flex-wrap justify-between h-full">
      <div className="flex flex-col shrink-0 grow basis-0 overflow-x-hidden h-full">
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
          <div className="relative grow shrink-0 basis-0 bg-sky-100 flex flex-col items-stretch justify-stretch overflow-hidden">
            <House {...params} sceneRef={sceneRef} />
          </div>
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
          <PostFrame params={params} setParams={setParams} />
          <div className="flex flex-col gap-2 bg-gray-200 p-1 pb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className="min-w-15 py-2 px-3 text-sm bg-white rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300"
                onClick={handleExportObj}
              >
                Export OBJ
              </button>
              <button
                className="min-w-15 py-2 px-3 text-sm bg-white rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300"
                onClick={handleExportSTL}
              >
                Export STL
              </button>
              <button
                className="min-w-15 py-2 px-3 text-sm bg-white rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300"
                onClick={handleExportGLTF}
              >
                Export GLTF
              </button>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button className="min-w-15 py-2 text-sm bg-white rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-refresh"
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
    </div>
  );
};

export default ThreeDim;
