import { useEffect } from 'react';

const TextureSelector = ({ blueprint3d }) => {
  useEffect(() => {
    if (!blueprint3d) return;

    const wallClicked = () => {
      document.getElementById("wallTextures").style.display = "block";
    };

    const floorClicked = () => {
      document.getElementById("floorTexturesDiv").style.display = "block";
    };

    blueprint3d.three.wallClicked.add(wallClicked);
    blueprint3d.three.floorClicked.add(floorClicked);

    return () => {
      blueprint3d.three.wallClicked.remove(wallClicked);
      blueprint3d.three.floorClicked.remove(floorClicked);
    };
  }, [blueprint3d]);

  return null;
};

export default TextureSelector;
