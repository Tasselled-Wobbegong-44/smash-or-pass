import React, { useState } from "react";
import "./App.css";

const Slider = ({ label, value, onChange, max, step, min }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="range"
        min={min}
        step={step}
        // min slider value pulled from parent element for specific characteristic
        max={max}
        // max slider value pulled from parent element for specific characteristic
        value={value}
        // slider value pulled from parent element for specific characteristic
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span>{value}</span>
    </div>
  );
};

export default Slider;
