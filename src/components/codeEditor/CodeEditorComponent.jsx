import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror"; // استخدام UnControlled من الحزمة
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import "./styles.css";

const CodeEditorComponent = ({ editor }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHtmlChange = (value) => {
    setHtmlContent(value);
  };

  const handleCssChange = (value) => {
    setCssContent(value);
  };

  const handleSave = async () => {
    setLoading(true);
    await editor.setComponents(htmlContent);
    await editor.addStyle(cssContent);
    setLoading(false);
    editor.Modal.close();
  };

  return (
    <div className="gjs-mdl-content">
      <div className="gjs-export-dl">
        <div className="gjs-cm-editor-c">
          <div className="gjs-cm-editor" id="gjs-cm-htmlmixed">
            <div id="gjs-cm-title">HTML</div>
            <div className="gjs-cm-code">
              <CodeMirror
                value={htmlContent}
                height="450px"
                extensions={[oneDark]}
                onChange={handleHtmlChange}
              />
            </div>
          </div>
        </div>
        <div className="gjs-cm-editor-c">
          <div className="gjs-cm-editor" id="gjs-cm-css">
            <div id="gjs-cm-title">CSS</div>
            <div className="gjs-cm-code">
              <CodeMirror
                value={cssContent} // ربط المحتوى بحالة CSS
                height="450px" // تعيين الارتفاع ليملأ الحاوية
                extensions={[css(), oneDark]} // إضافة دعم CSS والثيم
                onChange={handleCssChange} // التعامل مع التغييرات في CSS
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          style={{
            background: "#5cb85c",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={handleSave}
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CodeEditorComponent;
