import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, TransitLayer, Polyline } from "@react-google-maps/api";
import "../../assets/stylesheets/main.scss";
import axios from "axios";
import mapStyles from "./styles.js";
import AlertsContainer from "./alerts";
import DirectionsForm from "../directions/directions.js"

function MainPage() {
  const [loaded, setLoaded] = useState(false);

  const mapKey = useRef(null);

  useEffect(() => {
    axios.get("/api/google/").then((key) => {
      setLoaded(true);
      mapKey.current = key.data;
    });
  }, []);

  if (loaded) {
    return (
      <div className="main">
        <div className="main-left-side">
          <div className="map">
            <Map />
          </div>
        </div>
        <div className="main-right-side">
          <div className="main-right-top">
            <DirectionsForm />
          </div>
          <div className="main-right-bottom">
            <AlertsContainer />
          </div>
        </div>
      </div>
    );

    function Map() {
      const center = { lat: 40.767, lng: -73.972 };
    
      const NEW_YORK_BOUNDS = {
        north: 40.867,
        south: 40.667,
        west: -74.072,
        east: -73.872
      };

      const icons = {
        alerts: {
          yellow: 'https://linealert-assets.s3.amazonaws.com/alert-yellow-15x15.png',
          orange: 'https://linealert-assets.s3.amazonaws.com/alert-orange-15x15.png',
          red: 'https://linealert-assets.s3.amazonaws.com/alert-red-15x15.png'
        }
      };

      const markers = {
        'Union Square': { id: 1, center: {lat: 40.7359, lng: -73.9911}, color: icons.alerts.yellow },
        'Times Square': { id: 2, center: {lat: 40.7559, lng: -73.9871}, color: icons.alerts.red }
      };

      const poly = [
        {lat: 40.7359, lng: -73.9911},
        {lat: 40.7559, lng: -73.9871},
        {lat: 40.7623, lng: -73.9752},
        {lat: 40.7730, lng: -73.9855},
        {lat: 40.7830, lng: -73.9815}
      ]
      let markersArr = [];
      Object.values(markers).forEach(value => {
        markersArr.push(value)
      })

      return (
        <LoadScript googleMapsApiKey={mapKey.current}>
          <GoogleMap
            zoom={12.5}
            center={center}
            mapContainerClassName="map-container"
            options={{
              minZoom: 11,
              panControl: false,
              disableDefaultUI: true,
              styles: mapStyles,
              restriction: {
                latLngBounds: NEW_YORK_BOUNDS,
                strictBounds: false
              }
            }}
          >
            {
              markersArr.map(el => {
                return (
                  <Marker 
                    key={el.id} 
                    position={el.center} 
                    icon={el.color}
                  />
                )
              })
            }
            {/* <TransitLayer/> */}
            <Polyline
              path={poly}
              options={{
                strokeColor: '#FFFFFF',
                strokeOpactiy: 1.0,
                strokeWeight: 2
              }}
            />
          </GoogleMap>
        </LoadScript>
      );
    }
  }
}

export default MainPage;