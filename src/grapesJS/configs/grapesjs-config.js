import GrapesJS from "grapesjs";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import "grapesjs/dist/css/grapes.min.css";
import eventsBlock from "../../customBlocks/events/eventsBlock";
import codeEditorBlock from "../../customBlocks/codeEditor/codeEditorBlock";
import mainLayout from "../layouts/mainLayout";

const initGrapesJS = (containerId) => {
  const editor = GrapesJS.init({
    container: `#${containerId}`,
    // style,
    fromElement: true,
    height: "100vh",
    storageManager: { type: null },
    plugins: [gjsBlocksBasic],
    blockManager: {
      appendTo: ".blocks",
    },
  });

  eventsBlock(editor);
  codeEditorBlock(editor);

  // Execute Functions After GrapesJS Load
  editor.on("load", () => {
    mainLayout(editor);
  });

  return editor;
};
export default initGrapesJS;
