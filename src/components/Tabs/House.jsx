import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const House = ({ width, length, ceilingHeight, roofRiseIn12, selectedPart, sceneRef }) => {
  const mountRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xddeeff);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(20, 20, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const wallThickness = 0.3;
    const floorThickness = 0.3;
    const roofThickness = 0.3;

    const riseIn12 = roofRiseIn12 ?? 6;
    const roofSlopeRadians = Math.atan(riseIn12 / 12);
    const halfWidth = width / 2;
    const roofHeight = halfWidth * Math.tan(roofSlopeRadians);
    const roofAngle = roofSlopeRadians;

    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xb0c4de });
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });

    const showAll = !selectedPart;
    const showOnlyWalls = selectedPart === 'wall';
    const showOnlyRoofs = selectedPart === 'roof';

    const showPart = (partName) =>
      showAll ||
      selectedPart === partName ||
      (showOnlyWalls && ['frontWall', 'backWall', 'leftWall', 'rightWall'].includes(partName)) ||
      (showOnlyRoofs && ['leftRoof', 'rightRoof'].includes(partName));

    // Floor
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(width, floorThickness, length),
      floorMaterial
    );
    floor.position.y = floorThickness / 2;
    if (!selectedPart) scene.add(floor);

    // Front & Back Walls (Gable)
    const makeGableWall = () => {
      const shape = new THREE.Shape();
      shape.moveTo(-halfWidth, 0);
      shape.lineTo(-halfWidth, ceilingHeight);
      shape.lineTo(0, ceilingHeight + roofHeight);
      shape.lineTo(halfWidth, ceilingHeight);
      shape.lineTo(halfWidth, 0);
      shape.lineTo(-halfWidth, 0);
      return new THREE.ExtrudeGeometry(shape, {
        depth: wallThickness,
        bevelEnabled: false,
      });
    };

    const frontWall = new THREE.Mesh(makeGableWall(), wallMaterial);
    frontWall.position.set(0, floorThickness, length / 2 - wallThickness / 2);
    if (showPart('frontWall')) scene.add(frontWall);

    const backWall = new THREE.Mesh(makeGableWall(), wallMaterial);
    backWall.position.set(0, floorThickness, -length / 2 + wallThickness / 2);
    backWall.rotation.y = Math.PI;
    if (showPart('backWall')) scene.add(backWall);

    // Side Walls
    const sideWallGeo = new THREE.BoxGeometry(wallThickness, ceilingHeight, length);
    const leftWall = new THREE.Mesh(sideWallGeo, wallMaterial);
    leftWall.position.set(-halfWidth + wallThickness / 2, ceilingHeight / 2 + floorThickness, 0);
    if (showPart('leftWall')) scene.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeo, wallMaterial);
    rightWall.position.set(halfWidth - wallThickness / 2, ceilingHeight / 2 + floorThickness, 0);
    if (showPart('rightWall')) scene.add(rightWall);

    // Roofs
    const roofLength = length;
    const roofDiagonal = Math.sqrt(halfWidth ** 2 + roofHeight ** 2);

    const leftRoof = new THREE.Mesh(
      new THREE.BoxGeometry(roofDiagonal, roofThickness, roofLength),
      roofMaterial
    );
    leftRoof.rotation.z = roofAngle;
    leftRoof.position.set(-halfWidth / 2, ceilingHeight + floorThickness + roofHeight / 2, 0);
    if (showPart('leftRoof')) scene.add(leftRoof);

    const rightRoof = new THREE.Mesh(
      new THREE.BoxGeometry(roofDiagonal, roofThickness, roofLength),
      roofMaterial
    );
    rightRoof.rotation.z = -roofAngle;
    rightRoof.position.set(halfWidth / 2, ceilingHeight + floorThickness + roofHeight / 2, 0);
    if (showPart('rightRoof')) scene.add(rightRoof);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0xcccccc })
    );
    ground.rotation.x = -Math.PI / 2;
    if (!selectedPart) scene.add(ground);

    sceneRef.current = scene;

    // Resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mount) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [width, length, ceilingHeight, roofRiseIn12, selectedPart, sceneRef]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default House;
