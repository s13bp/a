import React from 'react';
import classes from './HowItWorks.module.css';


const HowItWorks = (props) => {

  return (
    <aside className = {`${props.isHowItWorksOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper '}`}>

      <div className = 'sidebar'>
        

        <h3 className = {classes.header}>How NAI-PARK Works</h3>

        <ul className = {classes.container}>
          <li className = {classes.item}>
            <span className = {classes.number}>1</span>
            <div className = {classes.content}>
              <div className = {classes.title}>Find Your Car Parking Spot !</div>
              <p className = {classes.read}>Sign up First To Check Our Available Spots</p>
            </div>
          </li>
          <li className = {classes.item}>
            <span className = {classes.number}>2</span>
            <div className = {classes.content}>
              <div className = {classes.title}> Booking Process !</div>
              <p className = {classes.read}>Select Date And Our Software Will Generate List Of Parking Spots According To Availability</p>
            </div>
          </li>
          <li className = {classes.item}>
            <span className = {classes.number}>3</span>
            <div className = {classes.content}>
              <div className = {classes.title}>Confirm Your Reservation And Proceed With Payment !</div>
              <p className = {classes.read}>Upon arrival, just show your reserved park ID </p>
            </div>            
          </li>
        </ul>
        
        <a className = {classes.car} href="https://www.animatedimages.org/cat-cars-67.htm">
          <img src="https://www.animatedimages.org/data/media/67/animated-car-image-0021.gif" border="0" alt = "park here" />
        </a>
      </div>

    </aside>
  );
}

export default HowItWorks;

