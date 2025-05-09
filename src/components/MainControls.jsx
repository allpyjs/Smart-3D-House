import { useEffect } from 'react';

const MainControls = ({ blueprint3d }) => {
  useEffect(() => {
    const newDesign = () => {
      blueprint3d.model.loadSerialized('');
    };

    const loadDesign = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        blueprint3d.model.loadSerialized(event.target.result);
      };
      reader.readAsText(file);
    };

    const saveDesign = () => {
      const data = blueprint3d.model.exportSerialized();
      const a = document.createElement('a');
      const blob = new Blob([data], { type: 'text' });
      a.href = URL.createObjectURL(blob);
      a.download = 'design.blueprint3d';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    document.getElementById("new")?.addEventListener("click", newDesign);
    document.getElementById("loadFile")?.addEventListener("change", loadDesign);
    document.getElementById("saveFile")?.addEventListener("click", saveDesign);

    return () => {
      document.getElementById("new")?.removeEventListener("click", newDesign);
      document.getElementById("loadFile")?.removeEventListener("change", loadDesign);
      document.getElementById("saveFile")?.removeEventListener("click", saveDesign);
    };
  }, [blueprint3d]);

  return null;
};

export default MainControls;
