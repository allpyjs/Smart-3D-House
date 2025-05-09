import { useEffect } from 'react';

const ViewerFloorplanner = ({ blueprint3d }) => {
  useEffect(() => {
    if (!blueprint3d) return;

    const wrapper = document.getElementById("floorplanner");

    const handleResize = () => {
      wrapper.style.height = window.innerHeight - wrapper.offsetTop + "px";
      blueprint3d.floorplanner.resizeView();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [blueprint3d]);

  return null;
};

export default ViewerFloorplanner;
