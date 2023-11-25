import React, { useState } from 'react';
import './App.css';

const Slider = ({ sliders }) => {
    const [sliderValues, setSliderValues] = useState(
        sliders.reduce((acc, [name, maxValue]) => {
          acc[name] = 0;
          return acc;
        }, {})
      );
    
      const handleSliderChange = (name) => (event) => {
        setSliderValues({
          ...sliderValues,
          [name]: event.target.value,
        });
      };

      return (
        <div className = "slider">
          {sliders.map(([name, maxValue]) => (
            <div key={name} className="slider-container">
              <label htmlFor={`${name}Slider`}>{name}:</label>
              <input
                type="range"
                id={`${name}Slider`}
                min="0"
                max={maxValue}
                value={sliderValues[name]}
                onChange={handleSliderChange(name)}
              />
              <sliderText>{sliderValues[name]}</sliderText>
            </div>
          ))}
        </div>
      );
};

export default Slider;
