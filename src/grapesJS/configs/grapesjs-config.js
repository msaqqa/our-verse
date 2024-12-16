import GrapesJS from "grapesjs";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import "grapesjs/dist/css/grapes.min.css";
import mainLayout from "../layouts/mainLayout";
import typographyBlook from "../customBlocks/typography/typographyBlook";
import eventsBlock from "../customBlocks/events/eventsBlock";
// import codeEditorBlock from "../customBlocks/codeEditor/codeEditorBlock";
// import imageInteraction from "../customBlocks/Image/imageInteraction";

const initGrapesJS = (containerId) => {
  const editor = GrapesJS.init({
    container: `#${containerId}`,
    height: "100vh",
    // style,
    fromElement: true,
    storageManager: {
      type: "local",
      autosave: true,
      stepsBeforeSave: 1,
    },
    plugins: [gjsBlocksBasic, gjsPresetWebpage],
    pluginsOpts: {
      gjsBlocksBasic: {},
      gjsPresetWebpage: {},
    },
  });

  editor.on("component:add", (component) => {
    // Select the custom component
    editor.select(component);
  });

  // imageInteraction(editor);
  eventsBlock(editor);
  // codeEditorBlock(editor);
  typographyBlook(editor);

  // Execute Functions After GrapesJS Load
  editor.on("load", () => {
    mainLayout(editor);
  });

  return editor;
};
export default initGrapesJS;
