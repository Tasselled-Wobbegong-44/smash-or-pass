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
        <h1>{data.name}</h1>
        <div>
          {" "}
          <img src={data.imageUrl} />{" "}
        </div>
        {<h4>{data.background}</h4>}
        {<h3>Speed: {data.speed} 🐇 </h3>}
        {<h3>Strength: {data.weight} 🏋️</h3>}
        {<h3>Jump Height: {data.jump_height} ☄️</h3>}
        {<h3>Cuteness: {data.cuteness} / 10 😌</h3>}
        {<h3>Trollability: {data.trollability} / 10 😈 </h3>}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default Drawer;
