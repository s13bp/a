import React, { Component } from 'react'
import Leaflet from 'leaflet';
import './Nav.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import leafGreen from './assets/leaf-green.png';
import leafRed from './assets/leaf-red.png';
import leafOrange from './assets/leaf-orange.png';
import leafShadow from './assets/leaf-shadow.png';



Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapDisplay extends Component {
  
  
  state = {
    greenIcon: {
      lat: -1.2873365193799453, 
      lng: 36.81822089044627,
    },
    redIcon: {
      lat: -1.288768249338055, 
      lng: 36.821057123302495,
    },
    orangeIcon: {
      lat: 35.772790,
      lng: -78.652305,
    },
    zoom: 13
  }

  grenIcon = L.icon({
    iconUrl: leafGreen,
    shadowUrl: leafShadow,
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]
  });


 
  redIcon = L.icon({
    iconUrl: leafRed,
    shadowUrl: leafShadow,
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -86]
  });

  orangeIcon = L.icon({
    iconUrl: leafOrange,
    shadowUrl: leafShadow,
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -86]
  });

  render(){
    const positionRedIcon = [this.state.redIcon.lat, this.state.redIcon.lng];
    const positionGreenIcon = [this.state.greenIcon.lat, this.state.greenIcon.lng];
    const positionOrangeIcon = [this.state.orangeIcon.lat, this.state.orangeIcon.lng];
    return (
      <Map className="map" center={positionGreenIcon} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionGreenIcon} icon={this.grenIcon}>
          <Popup>
                VIP Smart Parking
          </Popup>
        </Marker>
        <Marker position={positionRedIcon} icon={this.redIcon}>
          <Popup>
          I am a red leaf
          </Popup>
        </Marker>
        <Marker position={positionOrangeIcon} icon={this.orangeIcon}>
          <Popup>
          I am an orange leaf
          </Popup>
        </Marker>
        <body>
          <div id="map"></div>
          <button id="refreshButton" onclick="Book()">Zoom Into VIP</button>
          
        </body>
      </Map>
    );
  }
}

export default MapDisplay;
