import React, { useEffect } from "react";
import initGrapesJS from "../../grapesJS/configs/grapesjs-config";
import "grapesjs/dist/css/grapes.min.css";

const GrapesJSEditor = () => {
  useEffect(() => {
    initGrapesJS("gjs");
  }, []);

  return (
    <>
      {/* Left Panel */}
      {/* <div className="left-panel">
        <div className="panel-header">Components</div>
      </div> */}

      {/* Center Panel */}
      <div className="center-panel">
        <div className="blocks" style={{ display: "none" }}></div>
        <div id="gjs"></div>
      </div>
    </>
  );
};

export default GrapesJSEditor;
