import { useEffect } from 'react';

const CameraButtons = ({ blueprint3d }) => {
  useEffect(() => {
    if (!blueprint3d) return;

    const orbitControls = blueprint3d.three.controls;

    const zoomIn = (e) => {
      e.preventDefault();
      orbitControls.dollyIn(1.1);
      orbitControls.update();
    };

    const zoomOut = (e) => {
      e.preventDefault();
      orbitControls.dollyOut(1.1);
      orbitControls.update();
    };

    document.getElementById("zoom-in")?.addEventListener("click", zoomIn);
    document.getElementById("zoom-out")?.addEventListener("click", zoomOut);

    return () => {
      document.getElementById("zoom-in")?.removeEventListener("click", zoomIn);
      document.getElementById("zoom-out")?.removeEventListener("click", zoomOut);
    };
  }, [blueprint3d]);

  return null;
};

export default CameraButtons;
