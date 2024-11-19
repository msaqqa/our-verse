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

        model.on("change:attributes", renderReactComponent);
      },
    },
  });

  return editor;
};

export default initGrapesJS;