import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import ModalEffects from "../ModalEffects";

const postFrameActions = [
  { label: "Main Building", value: "main" },
  { label: "Details", value: "details" },
  { label: "Door and Window", value: "door" },
  { label: "Packages", value: "package" },
  { label: "Job", value: "job" },
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

const ThreeDim = () => {
  const isLoadingRef = useRef(false)
  const blueprint3d = useRef(null)

  useEffect(() => {
    if (isLoadingRef.current) return
    isLoadingRef.current = true
    const opts = {
      floorplannerElement: 'floorplanner-canvas',
      threeElement: '#viewer',
      threeCanvasElement: 'three-canvas',
      textureDir: "models/textures/",
      widget: false
    }
    blueprint3d.current = new Blueprint3d(opts);
  
    // var modalEffects = new ModalEffects(blueprint3d);
    // var viewerFloorplanner = new ViewerFloorplanner(blueprint3d);
    // var contextMenu = new ContextMenu(blueprint3d);
    // var sideMenu = new SideMenu(blueprint3d, viewerFloorplanner, modalEffects);
    // var textureSelector = new TextureSelector(blueprint3d, sideMenu);        
    // var cameraButtons = new CameraButtons(blueprint3d);
    // mainControls(blueprint3d);
  
    // This serialization format needs work
    // Load a simple rectangle room
     const data = '{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[{"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":205.3509979248047,"ypos":127.03031163942109,"zpos":160.47680403593296,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":443.7116817853549,"ypos":132.7544164296371,"zpos":-177.80799865722656,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Closed Door","item_type":7,"model_url":"models/js/closed-door28x80_baked.js","xpos":511.23832023937194,"ypos":110.80000022010701,"zpos":288.552001953125,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false}]}'
     blueprint3d.current.model.loadSerialized(data);
  }, [])

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
          <div className="grow shrink-0 basis-0 bg-sky-100">
            <div id="viewer">
            </div>
            <div id="floorplanner" hidden>
              <canvas id="floorplanner-canvas"></canvas>
            </div>
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
      <ModalEffects blueprint3d={blueprint3d.current} />
    </div>
  );
};

export default ThreeDim;
