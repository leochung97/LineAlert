import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { GoogleMap, Marker, TransitLayer, Polyline, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import mapStyles from "./styles.js";
import { fetchAlerts, fetchAlert } from '../../actions/alert_actions';

function Maps({ alerts, stations, fetchAlerts, fetchAlert }) {
  const [state, setState] = useState(false);
  
  useEffect(() => {
    fetchAlerts()
      .then(() => setState(true))
  }, [fetchAlerts])

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

  let markersArr = [];

  const findUnique = () => {
    const markers = {};
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
          markers[marker.id] = marker;
        }
      })
    })
    markersArr = Object.values(markers);
  }

  const markerClick = id => (
    console.log(id)
    // fetchAlert(id).then( alert => 
    //   console.log(alert)
    // )
  )

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
      onClick={() => findUnique()}
    >
      
      <TransitLayer />

      {
        state ? 
          findUnique() :
          null
      }

      {
        state ? 
          markersArr.map(marker => 
            <Marker 
              key={marker.id}
              position={marker.center}
              icon={marker.color}
              onClick={ () => markerClick(marker.id) }
              options={{ clickable: true }}
            />
          ) : 
          null
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
  );
}

const mSTP = state => ({
  alerts: state.entities.alerts,
  stations: state.entities.stations
})

const mDTP = dispatch => ({
  fetchAlerts: () => dispatch(fetchAlerts()),
  fetchAlert: alertId => dispatch(fetchAlert(alertId))
})

export default connect(mSTP, mDTP)(Maps);