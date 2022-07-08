import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { GoogleMap, Marker, TransitLayer, Polyline, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import mapStyles from "./styles.js";
  
const center = { lat: 40.767, lng: -73.972 };
const NEW_YORK_BOUNDS = {
  north: 40.867,
  south: 40.667,
  west: -74.072,
  east: -73.872
};

const poly = [
  { lat: 40.7359, lng: -73.9911 },
  { lat: 40.7559, lng: -73.9871 },
  { lat: 40.7623, lng: -73.9752 },
  { lat: 40.7730, lng: -73.9855 },
  { lat: 40.7830, lng: -73.9815 }
]

function Maps() {
  const [markers, setMarkers] = useState([]);
  const [toggleTL, setoggleTL] = useState(true)
  
  const alerts = useSelector(state => state.entities.alerts, (a, b) => a.length === b.length);
  const stations = useSelector(state => state.entities.stations, (a, b) => a.length === b.length);

  useEffect(() => {
    const tempMarkers = {};
    const icons = new Map();
    icons.set("YELLOW", 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-yellow.png');
    icons.set("ORANGE", 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-orange.png');
    icons.set("RED", 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-red.png');

    alerts.forEach(alert => {
      stations.forEach(station => {
        if (station._id === alert.station) {
          const marker = {
            id: alert._id,
            center: { lat: station.latLng.lat, lng: station.latLng.lng },
            color: icons.get(alert.intensity)
          }
          tempMarkers[marker.id] = marker;
        }
      })
    })

    setMarkers(Object.values(tempMarkers));
  }, [alerts, stations])

  const markerClick = id => (
    console.log(id)
    // fetchAlert(id).then( alert => 
    //   console.log(alert)
    // )
  )
  if (window.google) {
  return (
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
      
      <button className="transitlayer-toggle" onClick={() => setoggleTL(!toggleTL)}>Toggle Transit Layer</button>
      {toggleTL ? <TransitLayer /> : <></>}

      <TransitLayer />

      {
        markers.map(marker => 
            <Marker 
              key={marker.id}
              position={marker.center}
              icon={marker.color}
              onClick={ () => markerClick(marker.id) }
              options={{ clickable: true }}
            />
          )
      }

      {/* <Polyline
            path={poly}
            options={{
              strokeColor: '#FFFFFF',
              strokeOpactiy: 1.0,
              strokeWeight: 2
            }}
          /> */}

    </GoogleMap>
    )
        } else {
          return <></>
        }
}

export default Maps;