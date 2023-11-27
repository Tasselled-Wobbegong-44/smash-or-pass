import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import "./App.css";
import CharCard from "./SmashCharCards";
import Drawer from "./Drawer";

import characters from "./Characters";
// imported list of characters from the source file

const App = () => {
  const [data, setData] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  // checks drawer state for revealing character drawers

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // toggles drawer on

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    toggleDrawer();
  };
  // starts the function that triggers the drawer

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const sliders = [
    ["SPEED", 100],
    ["WEIGHT", 100],
    ["CUTENESS", 100],
    ["STRENGTH", 100],
    ["TROLLABILITY", 100],
    // more sliders can be added here for rendering
  ];

  return (
    <div>
      <body>
        <div class="intro">
          <h1>Choose your character</h1>
          <h3>
            "Use the sliders below to pick which attributes you want and see
            which characters have those attributes!"
          </h3>
        </div>

    <section class = "slider-section">
        <div class="sliderbox">
          <Slider sliders={sliders} />
        </div>
    </section>

        <CharCard
          characters={characters}
          onCharacterClick={handleCharacterClick}
        />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          data={selectedCharacter}
        />
      </body>
    </div>
  );
};
//Use the sliders below to pick which attributes you want and see which characters have those attributes!

export default App;
