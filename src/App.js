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
  const [selectedCharacter, setSelectedCharacter] = useState(
    characters.find((character) => character.name)
  );
  // checks drawer state for revealing character drawers

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // toggles drawer on

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character.name);
    toggleDrawer();
  };
  // starts the function that triggers the drawer

  const [filterValues, setFilterValues] = useState({
    // SPEED: 255,
    // JUMP_HEIGHT: 255,
    // WEIGHT: 10,
    CUTENESS: 10,
    // STRENGTH: 255,
    // TROLLABILITY: 10,
  });

  // callback function that is passed in to handle changes in the slider
  const handleSliderChange = (name) => (value) => {
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  const filteredCharacters = characters.filter((character) => {
    return Object.entries(filterValues).every(
      ([attribute, value]) => character[attribute.toLowerCase()] <= value
    );
  });

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

        <section class="slider-section">
          <div class="sliderbox">
            <Slider
              sliders={Object.entries(filterValues)}
              onChange={handleSliderChange}
            />
          </div>
        </section>

        <CharCard
          characters={filteredCharacters}
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
