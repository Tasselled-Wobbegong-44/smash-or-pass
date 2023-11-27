import React, { useState } from "react";
import "./App.css";

const Drawer = ({ isOpen, onClose, data }) => {
  //   const name = data.name;
  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <button class="close" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="drawer-content">
        {/* <h1>{name}</h1> */}
        <h4>Information goes here</h4>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Drawer;
