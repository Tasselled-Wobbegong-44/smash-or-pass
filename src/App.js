import React, { useState } from "react";
import Slider from "./Slider";
import "./App.css";
import CharCard from "./SmashCharCards";
import Drawer from "./Drawer";
import characters from "./Characters";

const App = () => {
  // hooks for characteristics
  const [charId, setCharId] = useState(0);
  const [weightValue, setWeightValue] = useState(0);
  const [speedValue, setSpeedValue] = useState(0);
  const [jumpHeightValue, setJumpHeightValue] = useState(0);
  const [grabRangeValue, setGrabRangeValue] = useState(0);
  const [cutenessValue, setCutenessValue] = useState(0);
  const [trollabilityValue, setTrollabilityValue] = useState(0);

  // state handlers for characteristics
  const handleWeightChange = (value) => {
    setWeightValue(value);
  };
  
  const handleSpeedChange = (value) => {
    setSpeedValue(value);
  };
  
  const handleJumpHeightChange = (value) => {
    setJumpHeightValue(value);
  };
  
  const handleGrabRangeChange = (value) => {
    setGrabRangeValue(value);
  };
  
  const handleCutenessChange = (value) => {
    setCutenessValue(value);
  };
  
  const handleTrollabilityChange = (value) => {
    setTrollabilityValue(value);
  };

  // character filtering
  const filteredCharacters = characters.filter(
    (character) =>
      character.grab_range >= grabRangeValue&&
      character.weight >= weightValue &&
      character.cuteness >= cutenessValue &&
      character.speed >= speedValue &&
      character.jump_height >= jumpHeightValue &&
      character.trollability >= trollabilityValue
  );

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
    console.log("charId", charId);
    console.log("character", character.id);
    if (charId === character.id) {
      setIsDrawerOpen(isDrawerOpen)
      toggleDrawer();
    }

    setSelectedCharacter(character);
    setCharId(character.id);
    if (!isDrawerOpen) toggleDrawer();
    // if (open) toggleDrawer();
  };
  // starts the function that triggers the drawer

  return (
    <div>
      <body>
        <div class="intro">
          <h1>Choose your character</h1>
          <h3>
            Use the sliders below to pick which attributes you want and see
            which characters have those attributes!
          </h3>
        </div>

        <section class="section slider">
          <div class="sliderbox">
            <div>Speed</div>
            <Slider
              max={2.5}
              // label="Speed"
              value={speedValue}
              onChange={handleSpeedChange}
              step={0.1}
              min={1.1}
            />
            <div>Weight</div>
            <Slider
              // label="Weight"
              max={135}
              value={weightValue}
              onChange={handleWeightChange}
              step={1}
              min={60}
            />
            <div>Jump Height</div>
            <Slider
              max={50}
              // label="Jump Height"
              value={jumpHeightValue}
              onChange={handleJumpHeightChange}
              step={1}
              min={18}
            />
            <div>Grab Range</div>
            <Slider
              max={42}
              value={grabRangeValue}
              onChange={handleGrabRangeChange}
              step={1}
              min={11}
            />
            <div>Cuteness</div>
            <Slider
              max={10}
              // label="Cuteness"
              value={cutenessValue}
              onChange={handleCutenessChange}
              step={1}
              min={0}
            />
            <div>Trollability</div>
            <Slider
              max={10}
              // label="Trollability"
              value={trollabilityValue}
              onChange={handleTrollabilityChange}
              step={1}
              min={0}
            />
          </div>
        </section>

        <section class="section">
          <CharCard
            characters={filteredCharacters}
            onCharacterClick={handleCharacterClick}
          />
        </section>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          data={selectedCharacter}
        />
      </body>
    </div>
  );
};

export default App;
