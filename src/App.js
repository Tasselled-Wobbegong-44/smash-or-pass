import React, { useState, useEffect } from 'react';
import Slider from './Slider'
import './App.css'

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);


    const sliders = [
      ['strength', 100], 
      ['speed', 100]
      // more sliders can be added here for rendering
    ]

  return (
    <div>
      <header>
        <h1>Choose your character</h1>
      </header>
    
    
    <body>
    <CharCard />
        <Slider sliders = {sliders} />
    </body>
    </div>
  );
}


export default App;
