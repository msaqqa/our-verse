import GrapesJS from "grapesjs";
import React from "react";
import ReactDOM from "react-dom/client";
import EventsComponent from "../components/events/EventsComponent";
import gjsBlocksBasic from "grapesjs-blocks-basic";
// import gjsPresetWebpage from "grapesjs-preset-webpage";

const initGrapesJS = (containerId) => {
  const editor = GrapesJS.init({
    container: `#${containerId}`,
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
          },
          {
            type: "string",
            label: "Data API",
            name: "DataAPI",
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
        const root = ReactDOM.createRoot(el);

        const updateComponent = () => {
          const props = {
            title: this.model.get("listTitle") || null,
            viewStyle: this.model.get("viewStyle") || "list",
            itemsLimit: this.model.get("itemsLimit") || 4,
            api:
              this.model.get("DataAPI") ||
              "https://jsonplaceholder.typicode.com/posts",
            styles: { width: "100%", padding: "10px" },
          };

          root.render(React.createElement(EventsComponent, props));
        };

        updateComponent();

        // Listen for trait changes and update the component accordingly
        this.listenTo(
          this.model,
          "change:listTitle change:api change:viewStyle change:itemsLimit",
          () => {
            updateComponent(); // Re-render when any trait changes
          }
        );
      },
    },
  });

  return editor;
};

export default initGrapesJS;
