import React from "react";
import ReactDOM from "react-dom/client";
import EventsComponent from "../../../components/events/EventsComponent";
import styles from "./styles.css?inline";
const eventsBlock = (editor) => {
  // Adding component styles
  editor.addStyle(styles);

  // const css = editor.getCss();
  // console.log("css", css);

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
      toHTML() {
        return this.view.el.innerHTML || "";
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

        // Update component when props change
        model.on("change:attributes", renderReactComponent);
      },
    },
  });
};

export default eventsBlock;
