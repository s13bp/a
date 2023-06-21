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
      <Slider
        imageSrc={home02}
        title={"Your Parking Lots Are On Track"}
        subtitle={
          "VIP Offers Quick Reservation For Your Clients"
        }
      />
      <Slider
        imageSrc={home03}
        title={"Expand Your Horizons"}
        subtitle={"VIP Offers Advanced Payment Methods For Your Clients"}
        flipped={true}
      />
    </div>
  );
}

export default Home;

  