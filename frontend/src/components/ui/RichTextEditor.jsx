import React, { useRef, useEffect } from "react";

/*
 * WordPress-style rich text editor (dependency-free, contentEditable based).
 * Toolbar: block format (Paragraph/H1-H4), bold, italic, underline,
 * bullet / numbered lists, link, clear formatting.
 *
 * Props:
 *   value    — HTML string
 *   onChange — called with the updated HTML string
 *   rows     — approximate visible height in text rows (default 8)
 */
export default function RichTextEditor({ value, onChange, rows = 8 }) {
  const editorRef = useRef(null);
  const lastHtml = useRef(null);

  // Push external value into the editor only when it actually differs,
  // so typing doesn't fight with re-renders (cursor jumps).
  useEffect(() => {
    const el = editorRef.current;
    if (el && (value ?? "") !== lastHtml.current) {
      el.innerHTML = value || "";
      lastHtml.current = value || "";
    }
  }, [value]);

  const emitChange = () => {
    const el = editorRef.current;
    if (!el) return;
    lastHtml.current = el.innerHTML;
    onChange(el.innerHTML);
  };

  const exec = (command, arg = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    emitChange();
  };

  const setBlock = (tag) => {
    // execCommand wants e.g. "<h2>"; empty selection formats current block
    exec("formatBlock", `<${tag}>`);
  };

  const addLink = () => {
    const url = window.prompt("Link URL (e.g. /products or https://...)");
    if (url) exec("createLink", url);
  };

  const S = {
    bar: {
      display: "flex", flexWrap: "wrap", gap: 4, padding: "6px 8px",
      background: "#f1f5f9", border: "1px solid #cbd5e1", borderBottom: "none",
      borderRadius: "6px 6px 0 0", alignItems: "center",
    },
    btn: {
      background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 4,
      padding: "4px 10px", fontSize: 12, cursor: "pointer", color: "#0f172a",
      fontFamily: "inherit", lineHeight: "18px",
    },
    select: {
      background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 4,
      padding: "4px 6px", fontSize: 12, cursor: "pointer", color: "#0f172a",
    },
    area: {
      minHeight: rows * 22,
      maxHeight: 480,
      overflowY: "auto",
      background: "#ffffff", border: "1px solid #cbd5e1",
      borderRadius: "0 0 6px 6px", padding: 12, fontSize: 14, lineHeight: 1.6,
      color: "#0f172a", outline: "none",
    },
  };

  return (
    <div>
      <div style={S.bar} onMouseDown={(e) => e.preventDefault() /* keep selection */}>
        <select
          style={S.select}
          defaultValue=""
          onChange={(e) => { if (e.target.value) { setBlock(e.target.value); e.target.value = ""; } }}
        >
          <option value="" disabled>Format</option>
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>
        <button type="button" style={{ ...S.btn, fontWeight: 700 }} onClick={() => exec("bold")} title="Bold">B</button>
        <button type="button" style={{ ...S.btn, fontStyle: "italic" }} onClick={() => exec("italic")} title="Italic">I</button>
        <button type="button" style={{ ...S.btn, textDecoration: "underline" }} onClick={() => exec("underline")} title="Underline">U</button>
        <button type="button" style={S.btn} onClick={() => exec("insertUnorderedList")} title="Bullet list">• List</button>
        <button type="button" style={S.btn} onClick={() => exec("insertOrderedList")} title="Numbered list">1. List</button>
        <button type="button" style={S.btn} onClick={addLink} title="Insert link">🔗 Link</button>
        <button type="button" style={S.btn} onClick={() => exec("unlink")} title="Remove link">Unlink</button>
        <button type="button" style={S.btn} onClick={() => exec("removeFormat")} title="Clear formatting">Clear</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        style={S.area}
        onInput={emitChange}
        onBlur={emitChange}
        className="rich-text-editor-area"
      />
    </div>
  );
}
