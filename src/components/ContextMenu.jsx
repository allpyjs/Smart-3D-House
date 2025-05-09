import { useEffect } from 'react';

const ContextMenu = ({ blueprint3d }) => {
  useEffect(() => {
    if (!blueprint3d) return;

    const three = blueprint3d.three;
    let selectedItem = null;

    const cmToIn = (cm) => cm / 2.54;
    const inToCm = (inch) => inch * 2.54;

    const itemSelected = (item) => {
      selectedItem = item;
      document.getElementById("context-menu").style.display = "block";
      document.getElementById("item-width").value = cmToIn(item.getWidth()).toFixed(0);
    };

    const itemUnselected = () => {
      selectedItem = null;
      document.getElementById("context-menu").style.display = "none";
    };

    three.itemSelectedCallbacks.add(itemSelected);
    three.itemUnselectedCallbacks.add(itemUnselected);

    return () => {
      three.itemSelectedCallbacks.remove(itemSelected);
      three.itemUnselectedCallbacks.remove(itemUnselected);
    };
  }, [blueprint3d]);

  return null;
};

export default ContextMenu;
