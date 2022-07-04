import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
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
      return (
        <LoadScript googleMapsApiKey={mapKey.current}>
          <GoogleMap
            zoom={13}
            center={center}
            mapContainerClassName="map-container"
            options={{
              disableDefaultUI: true,

              styles: mapStyles
            }}
          ></GoogleMap>
        </LoadScript>
      );
    }
  }
}

export default MainPage;
