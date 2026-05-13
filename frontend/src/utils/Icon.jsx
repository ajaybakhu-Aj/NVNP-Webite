import React from 'react';

export default function Icon({ name, size = 24, fill = false, style = {}, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined${fill ? " fill-icon" : ""}${className ? " " + className : ""}`}
      style={{ fontSize: size, ...style }}
    >
      {name}
    </span>
  );
}