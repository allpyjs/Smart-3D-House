import { useEffect } from 'react';

const SideMenu = ({ blueprint3d, floorplanControls }) => {
  useEffect(() => {
    if (!blueprint3d) return;

    const handleResize = () => {
      const sidebar = document.querySelector(".sidebar");
      const addItems = document.getElementById("add-items");
      if (sidebar) sidebar.style.height = window.innerHeight + "px";
      if (addItems) addItems.style.height = window.innerHeight + "px";
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [blueprint3d]);

  return null;
};

export default SideMenu;
