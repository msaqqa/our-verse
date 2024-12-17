import React from "react";
import ReactDOM from "react-dom/client";
import Typography from "../../../components/typography/Typography";
// import typographyStyles from "../../../components/typography/styles.js";

const typographyBlook = (editor) => {
  // Adding component styles
  // editor.addStyle(typographyStyles);

  // Add the custom block for EventsComponent
  editor.BlockManager.add("typograph", {
    label: "Typograph",
    category: "Components",
    content: `<div data-gjs-type="typograph"></div>`,
  });

  // Define the custom component type with traits
  editor.DomComponents.addType("typograph", {
    model: {
      defaults: {
        tagName: "div",
        traits: [
          {
            type: "string",
            label: "Content",
            name: "content",
            default: "Insert your text here",
          },
          {
            type: "select",
            label: "Variant",
            name: "variant",
            options: [
              { name: "Heading 1", value: "h1" },
              { name: "Heading 2", value: "h2" },
              { name: "Heading 3", value: "h3" },
              { name: "Heading 4", value: "h4" },
              { name: "Heading 5", value: "h5" },
              { name: "Heading 6", value: "h6" },
              { name: "Phragraph", value: "p" },
            ],
            default: "p",
          },
          {
            type: "color",
            label: "Color",
            name: "color",
            default: "",
          },
          {
            type: "checkbox",
            label: "Bold",
            name: "bold",
            valueTrue: "700",
            valueFalse: "500",
            default: "500",
          },
          {
            type: "string",
            label: "Font Family",
            name: "fontFamily",
            default: "",
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
            React.createElement(Typography, {
              content: model.getAttributes().content,
              variant: model.getAttributes().variant,
              color: model.getAttributes().color,
              bold: model.getAttributes().bold,
              fontFamily: model.getAttributes().fontFamily,
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

export default typographyBlook;
