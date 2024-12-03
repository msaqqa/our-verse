import { addTitle } from "./addTitle";
import { moveButtonsToOptions } from "./moveButtonsToOptions";
import { toggleSettingsWithBlocks } from "./toggleSettingsWithBlocks";

function mainLayout(editor) {
  addTitle();
  toggleSettingsWithBlocks(editor);
  moveButtonsToOptions();
}

export default mainLayout;
