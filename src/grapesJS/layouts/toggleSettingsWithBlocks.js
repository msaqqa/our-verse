// toggle show settings list or blocks
export const toggleSettingsWithBlocks = (editor) => {
  const buttonsSettings = document.querySelector(
    ".gjs-pn-views .gjs-pn-buttons"
  );
  const viewsContainer = document.querySelector(".gjs-pn-views-container");
  const blocksContainer = document.querySelector(".blocks");
  const title = document.querySelector(".panel-header");
  let selectedComponent = null;
  const arr = [
    ".gjs-sm-header",
    ".gjs-traits-label",
    ".gjs-traits-cs",
    ".gjs-clm-tags",
    ".gjs-sm-sectors",
  ];

  // عرض الإعدادات
  const showSettings = () => {
    if (buttonsSettings && blocksContainer) {
      title.innerHTML = "Settings";
      arr.map((el) => {
        const element = document.querySelector(el);
        if (element) {
          element.style.display = "block";
        }
      });
      blocksContainer.style.display = "none";
      buttonsSettings.style.display = "flex";
    }
  };

  // عرض المكونات
  const showBlocks = () => {
    title.innerHTML = "Components";
    if (buttonsSettings && viewsContainer) {
      arr.map((el) => {
        const element = document.querySelector(el);
        if (element) {
          element.style.display = "none";
        }
      });
      buttonsSettings.style.display = "none";
      blocksContainer.style.display = "block";
      viewsContainer.appendChild(blocksContainer);
    }
  };

  // الاستماع لأحداث GrapesJS
  editor.on("component:selected", (model) => {
    selectedComponent = model;
    showSettings();
  });

  editor.on("component:deselected", () => {
    selectedComponent = null;
    showBlocks();
  });

  // حدث الاستماع للنقرات
  document.addEventListener("mousedown", (event) => {
    if (
      buttonsSettings.contains(event.target) ||
      viewsContainer.contains(event.target) ||
      title.contains(event.target) ||
      selectedComponent?.getEl().contains(event.target)
    ) {
      return;
    }

    showBlocks();
  });

  showBlocks();
};
