import React, { useState } from "react";

const CodeEditorComponent = ({ editor }) => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");

  const handleSave = () => {
    // Update GrapesJS Components
    editor.setComponents(html);

    // Update GrapesJS Styles
    editor.addStyle(css);

    // Close the modal
    editor.Modal.close();
  };

  return (
    <div style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "10px" }}>
        <label
          style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}
        >
          HTML:
        </label>
        <textarea
          rows="10"
          style={{ width: "100%", padding: "5px", fontFamily: "monospace" }}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label
          style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}
        >
          CSS:
        </label>
        <textarea
          rows="10"
          style={{ width: "100%", padding: "5px", fontFamily: "monospace" }}
          value={css}
          onChange={(e) => setCss(e.target.value)}
        />
      </div>
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
        Save
      </button>
    </div>
  );
};

export default CodeEditorComponent;
