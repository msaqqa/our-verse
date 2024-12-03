import React from "react";
import ReactDOM from "react-dom";
import CodeEditorComponent from "../../components/codeEditor/CodeEditorComponent";
import styles from "./styles.css?inline";
import vindo from "./vindo.html?raw";

const codeEditorBlock = (editor) => {
  // Adding component styles
  // editor.setStyle(styles);

  // // Adding component struture
  // editor.setComponents(vindo);

  // const html = editor.getHtml();
  // const css = editor.getCss();

  // Add Custom Panel
  editor.Panels.addButton("options", {
    id: "open-html-css",
    className: "fa fa-html5",
    command: "open-html-css",
    attributes: { title: "Add HTML/CSS Code" },
  });

  // Add Command to Open Custom Panel
  editor.Commands.add("open-html-css", {
    run(editor) {
      const modal = editor.Modal;
      modal.setTitle("Custom HTML & CSS Editor");
      modal.setContent(`<div id="custom-panel-container"></div>`);
      modal.open();

      // Render React Component in Modal
      const panelContainer = document.getElementById("custom-panel-container");
      const root =
        panelContainer._reactRoot || ReactDOM?.createRoot(panelContainer);
      panelContainer._reactRoot = root;

      // Render the custom React component
      root.render(React.createElement(CodeEditorComponent, { editor }));
    },
  });
};

export default codeEditorBlock;
