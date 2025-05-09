import { useEffect } from 'react';

const ModalEffects = ({ blueprint3d }) => {
  useEffect(() => {
    if (!blueprint3d) return;

    let itemsLoading = 0;

    const update = () => {
      const modal = document.getElementById("loading-modal");
      if (itemsLoading > 0) {
        modal.style.display = "block";
      } else {
        modal.style.display = "none";
      }
    };

    blueprint3d.model.scene.itemLoadingCallbacks.add(() => {
      itemsLoading += 1;
      update();
    });

    blueprint3d.model.scene.itemLoadedCallbacks.add(() => {
      itemsLoading -= 1;
      update();
    });

    update();
  }, [blueprint3d]);

  return null;
};

export default ModalEffects;
