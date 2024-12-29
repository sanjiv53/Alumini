// src/App.js
import React from 'react';
import FullScreenSlider from './FullScreenSlider';
import './App.css';
import panner from './img/WhatsApp Image 2024-11-07 at 12.20.00_c349ae86.jpg';
import panner_one from './img/WhatsApp Image 2024-11-07 at 12.20.01_bab697b6.jpg';
import panner_two from './img/WhatsApp Image 2024-11-07 at 12.20.02_1a3ddc51.jpg';
import panner_three from './img/WhatsApp Image 2024-11-07 at 12.20.02_b046f49b.jpg';
import panner_four from './img/WhatsApp Image 2024-12-21 at 12.16.05 PM.jpeg';
import panner_five from './img/WhatsApp Image 2024-12-21 at 12.16.06 PM (1).jpeg';
import panner_six from './img/WhatsApp Image 2024-12-21 at 12.16.06 PM.jpeg';
function App() {
  const images = [
    panner,
    panner_one,
    panner_two,
    panner_three,
    panner_four,
    panner_five,
    panner_six
  ];

  return (
    <div className="App">
      <FullScreenSlider images={images} />
    </div>
  );
}

export default App;
