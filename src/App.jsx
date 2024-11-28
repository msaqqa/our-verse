import React, { useEffect } from "react";
import initGrapesJS from "./configs/grapesjs-config";
import "./App.css";
import "grapesjs/dist/css/grapes.min.css";

function App() {
  useEffect(() => {
    initGrapesJS("gjs");
  }, []);

  return (
    <div className="app-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="panel-header">Components</div>
        <div className="blocks"></div>
      </div>

      {/* Center Panel */}
      <div className="center-panel">
        <div id="gjs"></div>
      </div>
    </div>
  );
}

export default App;
