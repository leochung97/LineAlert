import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { GoogleMap, Marker, TransitLayer } from "@react-google-maps/api";
import mapStyles from "./styles.js";
import AlertModal from '../alerts/alert_modal.js';
  
const center = { lat: 40.767, lng: -73.972 };

const NEW_YORK_BOUNDS = {
  north: 40.867,
  south: 40.667,
  west: -74.072,
  east: -73.872
};

function Maps() {
  const [markers, setMarkers] = useState([]);
  const [toggleTL, setoggleTL] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [clickedMarker, setClickedMarker] = useState(null)
  
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
  
  const markerClick = id => {
    let clickedMarker = alerts.filter(alert => (alert._id === id))[0]
    setIsOpen(true)
    setClickedMarker(clickedMarker)
  }

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

        <div className='alert-modal-container'>
          <AlertModal alert={clickedMarker} open={isOpen} onClose={()=> setIsOpen(false)}/>
        </div>
        

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
        
    </GoogleMap>
  )
  } else {
    return <></>
  }
}

export default Maps;