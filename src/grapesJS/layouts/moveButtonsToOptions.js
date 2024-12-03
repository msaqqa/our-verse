// Move buttons from gjs-pn-buttons to gjs-pn-options
export const moveButtonsToOptions = () => {
  const buttonsContainer = document.querySelector(
    ".gjs-pn-views .gjs-pn-buttons"
  );
  const optionsContainer = document.querySelector(
    ".gjs-pn-options .gjs-pn-buttons"
  );
  if (buttonsContainer && optionsContainer) {
    const button1 = buttonsContainer.querySelector(".gjs-pn-btn.fa-bars");
    const button2 = buttonsContainer.querySelector(".gjs-pn-btn.fa-th-large");
    const button3 = optionsContainer.querySelector(".gjs-pn-btn.fa-code");
    if (button1) {
      buttonsContainer.removeChild(button1);
      optionsContainer.appendChild(button1);
    }
    if (button2) {
      buttonsContainer.removeChild(button2);
      optionsContainer.appendChild(button2);
    }
    if (button3) {
      optionsContainer.removeChild(button3);
      buttonsContainer.appendChild(button3);
    }
  }
};
