import GrapesJS from "grapesjs";
import React from "react";
import ReactDOM from "react-dom/client";
import EventsComponent from "../components/events/EventsComponent";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import eventsStyles from "../components/events/EventsComponent.css?inline";

const initGrapesJS = (containerId) => {
  const editor = GrapesJS.init({
    container: `#${containerId}`,
    style: eventsStyles,
    height: "100vh",
    storageManager: { type: null },
    plugins: [gjsBlocksBasic],
    blockManager: {
      appendTo: ".blocks",
    },
  });

  // Add the custom block for EventsComponent
  editor.BlockManager.add("events-block", {
    label: "Events",
    category: "Components",
    content: `<div data-gjs-type="react-events"></div>`,
  });

  // Define the custom component type with traits
  editor.DomComponents.addType("react-events", {
    model: {
      defaults: {
        tagName: "div",
        traits: [
          {
            type: "string",
            label: "List Title",
            name: "listTitle",
            default: null,
          },
          {
            type: "string",
            label: "Data API",
            name: "DataAPI",
            default:
              "https://api.escuelajs.co/api/v1/products?offset=0&limit=10",
          },
          {
            type: "select",
            label: "View Style",
            name: "viewStyle",
            options: [
              { value: "card", name: "Card" },
              { value: "list", name: "List" },
            ],
            default: "list",
          },
          {
            type: "number",
            label: "Items Limit",
            name: "itemsLimit",
            default: 4,
          },
        ],
      },
    },
    view: {
      onRender({ el }) {
        const model = this.model;

        // Render the React Component
        const renderReactComponent = () => {
          const root = el._reactRoot || ReactDOM.createRoot(el);
          el._reactRoot = root;

          root.render(
            React.createElement(EventsComponent, {
              title: model.get("attributes").listTitle,
              viewStyle: model.get("attributes").viewStyle,
              itemsLimit: model.get("attributes").itemsLimit,
              api: model.get("attributes").DataAPI,
            })
          );
        };

        // Initial Render
        renderReactComponent();

        // تحديث المكون عند تغيير الخصائص
        model.on("change:attributes", renderReactComponent);
      },
    },
  });

  // إضافة العنوان الثابت داخل المنطقة المستهدفة في الأعلى
  const addTitle = () => {
    const targetElement = document.querySelector(
      ".gjs-pn-panel.gjs-pn-views.gjs-one-bg.gjs-two-color"
      // ".gjs-pn-panel.gjs-pn-views-container.gjs-one-bg.gjs-two-color"
    );
    console.log("targetElement", targetElement);

    if (targetElement) {
      const newTitle = document.createElement("div");
      newTitle.classList.add("panel-header");
      newTitle.innerHTML = "Settings";
      targetElement.insertBefore(newTitle, targetElement.firstChild); // وضع العنوان كأول عنصر في المنطقة
    }
  };

  // نقل الأزرار من gjs-pn-buttons إلى gjs-pn-options
  const moveButtonsToOptions = () => {
    const buttonsContainer = document.querySelector(
      ".gjs-pn-views .gjs-pn-buttons"
    );
    const optionsContainer = document.querySelector(
      ".gjs-pn-options .gjs-pn-buttons"
    );
    console.log("optionsContainer", optionsContainer);
    if (buttonsContainer && optionsContainer) {
      const button1 = buttonsContainer.querySelector(".gjs-pn-btn.fa-bars");
      const button2 = buttonsContainer.querySelector(".gjs-pn-btn.fa-th-large");
      const button3 = optionsContainer.querySelector(".gjs-pn-btn.fa-code");
      console.log("button3", button3);
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

  // Execute Functions After GrapesJS Load
  editor.on("load", () => {
    addTitle();
    moveButtonsToOptions();
  });

  return editor;
};

export default initGrapesJS;

// const blocksContainer = document.querySelector(
//     ".gjs-pn-views-container .blocks"
//   );
//  editor.on("component:selected", () => {
//     // إخفاء قائمة المكونات
//     if (blocksContainer) {
//       blocksContainer.style.display = "none"; // إخفاء قائمة المكونات
//     }
//   });

//   // عند إلغاء تحديد المكون:
//   editor.on("component:deselected", () => {
//     // إظهار قائمة المكونات مرة أخرى
//     if (blocksContainer) {
//       blocksContainer.style.display = "block"; // إظهار قائمة المكونات
//     }
//   });

// التبديل بين إخفاء وإظهار الشق الأيمن
// const toggleRightPanel = () => {
//   const rightPanel = editor.Panels.getPanel("gjs-pn-views-container");
//   if (rightPanel) {
//     const isVisible = rightPanel.get("visible");
//     rightPanel.set("visible", !isVisible);
//   } else {
//     console.error("Panel not found: gjs-pn-views-container");
//   }
// };
