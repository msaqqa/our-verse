import React, { useEffect } from "react";
import initGrapesJS from "./configs/grapesjs-config";
import "grapesjs/dist/css/grapes.min.css";

function App() {
  useEffect(() => {
    initGrapesJS("gjs");
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflowY: "scroll" }}>
      {/* GrapesJS Editor */}
      <div id="gjs" style={{ flex: 1 }}></div>

      {/* Block Manager Panel */}
      <div style={{ width: "200px", borderLeft: "1px solid #ddd" }}>
        <div className="blocks"></div>
      </div>
    </div>
  );
}

export default App;
