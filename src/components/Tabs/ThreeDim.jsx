import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const ThreeDim = ({ params, setParams }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const materials = {
      wall: new THREE.MeshStandardMaterial({
        color: 0x9999aa,
        roughness: 0.6,
        metalness: 0,
      }),
      floor: new THREE.MeshStandardMaterial({
        color: 0xffffab,
        roughness: 0.7,
        metalness: 0,
      }),
      roof: new THREE.MeshStandardMaterial({
        color: 0x774422,
        roughness: 0.5,
        metalness: 0,
      }),
    };

    function createHouseObjects(scene, materials, params) {
      const clipPlanes = {
        left: new THREE.Plane(new THREE.Vector3(0, -1, -1).normalize(), 0),
        right: new THREE.Plane(new THREE.Vector3(0, -1, 1).normalize(), 0),
      };
      materials.wall.clippingPlanes = [clipPlanes.left, clipPlanes.right];
      materials.wall.clipShadows = true;
      materials.wall.stencilFail = THREE.DecrementWrapStencilOp;
      materials.wall.stencilZFail = THREE.DecrementWrapStencilOp;
      materials.wall.stencilZPass = THREE.DecrementWrapStencilOp;

      const floor = new THREE.Mesh(
        new THREE.BoxGeometry(params.floorWidth, 0.2, params.floorDepth),
        materials.floor
      );
      floor.position.y = 0;
      floor.name = "floor";
      floor.receiveShadow = true;
      scene.add(floor);

      const wall1 = new THREE.Mesh(
        new THREE.BoxGeometry(params.floorWidth, params.height * 2, 0.1),
        materials.wall
      );
      wall1.position.set(0, params.height, -params.floorWidth / 2);
      wall1.name = "wall1";
      wall1.castShadow = true;
      wall1.receiveShadow = true;
      scene.add(wall1);

      const wall2 = wall1.clone();
      wall2.position.set(0, params.height, params.floorWidth / 2);
      wall2.name = "wall2";
      wall2.castShadow = true;
      wall2.receiveShadow = true;
      scene.add(wall2);

      const wall3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, params.height * 2 + 20, params.floorWidth),
        materials.wall
      );
      wall3.position.set(-params.floorWidth / 2, params.height + 10, 0);
      wall3.name = "wall3";
      wall3.castShadow = true;
      wall3.receiveShadow = true;
      scene.add(wall3);

      const wall4 = wall3.clone();
      wall4.position.set(params.floorWidth / 2, params.height + 10, 0);
      wall4.name = "wall4";
      wall4.castShadow = true;
      wall4.receiveShadow = true;
      scene.add(wall4);

      const roofLeft = new THREE.Mesh(
        new THREE.BoxGeometry(
          params.floorWidth,
          0.1,
          (params.floorDepth / 2) * Math.sqrt(2)
        ),
        materials.roof
      );
      roofLeft.name = "roofLeft";
      roofLeft.castShadow = true;
      roofLeft.receiveShadow = true;
      const roofRight = roofLeft.clone();
      roofRight.name = "roofRight";
      roofRight.castShadow = true;
      roofRight.receiveShadow = true;
      scene.add(roofLeft);
      scene.add(roofRight);

      const groundGeo = new THREE.PlaneGeometry(50, 50);
      const groundMat = new THREE.ShadowMaterial({ opacity: 0.3 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0.01;
      ground.receiveShadow = true;
      scene.add(ground);

      function updateRoof(angle, h, w, d) {
        const angleRad = THREE.MathUtils.degToRad(angle / 2);
        const y = d / 2 / Math.tan(angleRad);
        const offsetZ = d / 4;

        const slopeVectorLeft = new THREE.Vector3(
          0,
          -1,
          -Math.tan(angleRad)
        ).normalize();
        const slopeVectorRight = new THREE.Vector3(
          0,
          -1,
          Math.tan(angleRad)
        ).normalize();

        clipPlanes.left.set(
          slopeVectorLeft,
          -slopeVectorLeft.dot(new THREE.Vector3(0, h + y / 2, offsetZ))
        );
        clipPlanes.right.set(
          slopeVectorRight,
          -slopeVectorRight.dot(new THREE.Vector3(0, h + y / 2, -offsetZ))
        );

        roofLeft.rotation.x = -angleRad;
        roofLeft.position.set(0, h + y / 2, -offsetZ);
        roofLeft.scale.set(w / 4, 1, d / 4);

        roofRight.rotation.x = angleRad;
        roofRight.position.set(0, h + y / 2, offsetZ);
        roofRight.scale.set(w / 4, 1, d / 4);
      }

      updateRoof(
        params.ceilingAngle,
        params.height,
        params.floorWidth,
        params.floorDepth
      );

      return {
        floor,
        wall1,
        wall2,
        wall3,
        wall4,
        roofLeft,
        roofRight,
        updateRoof,
      };
    }

    function createRendererAndScene(canvas) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xe0e0e0);

      const camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.set(6, 6, 10);
      camera.lookAt(0, params.height, 0);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.localClippingEnabled = true;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.target.set(0, params.height, 0);
      controls.update();

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight.position.set(5, 10, 7);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;
      dirLight.shadow.camera.near = 1;
      dirLight.shadow.camera.far = 30;
      dirLight.shadow.camera.left = -10;
      dirLight.shadow.camera.right = 10;
      dirLight.shadow.camera.top = 10;
      dirLight.shadow.camera.bottom = -10;
      dirLight.shadow.bias = -0.0015;
      scene.add(dirLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      return { scene, camera, renderer, controls };
    }

    const { scene, camera, renderer, controls } =
      createRendererAndScene(canvas);
    const house = createHouseObjects(scene, materials, params);

    const raycaster3d = new THREE.Raycaster();
    raycaster3d.params.Mesh.threshold = 0.1;

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [params]);

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
          <div className="relative grow shrink-0 basis-0 bg-sky-100 flex flex-col items-stretch justify-stretch overflow-hidden">
            <canvas
              ref={canvasRef}
              id="canvas3d"
              tabIndex="0"
              className="w-full h-full cursor-grab"
            />
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
  );
};

export default ThreeDim;
