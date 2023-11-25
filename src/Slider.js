import React, { useState } from 'react';

const Slider = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div className="slider-container">
      <label htmlFor="rangeSlider">Speed Slider:</label>
      <input
        type="range"
        id="speedSlider"
        min="0"
        max="500"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <p id="sliderValue">Character Speed: {sliderValue}</p>
    </div>
  );
};

export default Slider;
