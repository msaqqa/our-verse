import React, { useEffect } from "react";
import initGrapesJS from "../../grapesJS/configs/grapesjs-config";
import "grapesjs/dist/css/grapes.min.css";
import "./styles.css";

const GrapesJSEditor = () => {
  useEffect(() => {
    initGrapesJS("gjs");
  }, []);

  return <div id="gjs" />;
};

export default GrapesJSEditor;
