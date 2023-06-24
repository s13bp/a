import "./home.css";
import React from 'react'
import home01 from "./assets/home1.jpg";
import home02 from "./assets/home2.jpg";
import home03 from "./assets/home3.jpg";
import Hero from "./components/Hero";

import Slider from "./components/Slider";

function Home() {
  

  return (
    <div className="App">
      
      <Hero imageSrc={home01} />

    </div>
  );
}

export default Home;

  