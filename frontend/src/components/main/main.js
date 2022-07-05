import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../../assets/stylesheets/main.scss";
// import { getGoogleKey } from "../../util/google_api_util";
import axios from "axios";
import mapStyles from "./styles.js"

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
          <div className="main-right-top"></div>
          <div className="main-right-bottom"></div>
        </div>
      </div>
    );

    function Map() {
      const center = { lat: 40.767, lng: -73.972 };

      const markers = {
        'Union Square': { lat: 40.7359, lng: -73.9911 },
        'Times Square': { lat: 40.7559, lng: -73.9871 }
      }

      let markersArr = [];
      Object.values(markers).forEach(value => {
        markersArr.push(value)
      })
      console.log(markersArr)
    
      const icons = {
        alerts: {
          yellow: 'https://linealert-assets.s3.amazonaws.com/alert-yellow.png',
          orange: 'https://linealert-assets.s3.amazonaws.com/alert-orange.png',
          red: 'https://linealert-assets.s3.amazonaws.com/alert-red.png'
        },
      }

      return (
        <LoadScript googleMapsApiKey={mapKey.current}>
          <GoogleMap
            zoom={12.5}
            center={center}
            mapContainerClassName="map-container"
            options={{
              disableDefaultUI: true,
              styles: mapStyles
            }}
          >
            {
              markersArr.map(el => {
                return <Marker position={el} icon={icons.alerts.yellow}/>
              })
            }
          </GoogleMap>
        </LoadScript>
      );
    }
  }
}

export default MainPage;