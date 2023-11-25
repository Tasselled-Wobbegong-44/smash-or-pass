import React, { useState, useEffect } from 'react';
import Slider from './Slider'
import './App.css'

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
        <Slider />
    </div>

  
  );
}


export default App; 