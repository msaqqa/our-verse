// Add a title to the sidebar panel contains the name of the displayed list
export const addTitle = () => {
  const targetElement = document.querySelector(
    ".gjs-pn-panel.gjs-pn-views.gjs-one-bg.gjs-two-color"
  );

  if (targetElement) {
    const newTitle = document.createElement("div");
    newTitle.classList.add("panel-header");
    newTitle.innerHTML = "Components";
    targetElement.insertBefore(newTitle, targetElement.firstChild);
  }
};
