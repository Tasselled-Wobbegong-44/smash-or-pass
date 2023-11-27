import React, { useState } from "react";
import "./App.css";
import characters from "./Characters";

const Drawer = ({ isOpen, onClose, data }) => {
  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <button class="close" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="drawer-content">
        <h4>Information goes here</h4>
        {/* { <h2>{data.name}</h2> } */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Drawer;
