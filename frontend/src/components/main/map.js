import React, { useEffect, useState } from "react";
import { connect, useSelector } from 'react-redux';
import { GoogleMap, Marker, TransitLayer, DirectionsService, useJsApiLoader, Polyline } from "@react-google-maps/api";
import mapStyles from "./styles.js";
import AlertModal from '../alerts/alert_modal.js';
import {icons, center, NEW_YORK_BOUNDS} from './map_utils.js';

function Maps({ directions, count }) {
  const [markers, setMarkers] = useState([]);
  const [toggleTL, setoggleTL] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [response, updateResponse] = useState(null);
  const [sentResponse, updateSentResponse] = useState(false);
  const [mapInit, setMapInit] = useState(false);

  useEffect(() => {
    if (Object.values(directions)[count] && !directions.error) {
      setoggleTL(false);
    }
  }, [directions, count]);
  
  let polyStart = {};
  let polyEnd = {};
  let direction = null;
  let trains = [];

  if (JSON.stringify(directions) !== "{}") {
    directions.error ? direction = null : direction = Object.values(directions)[count]
  }


  const directionsCallback = resp => {
    if (resp !== null && resp.status === 'OK') {
        if (!sentResponse) {
          updateResponse(resp)
          updateSentResponse(true);
        }
    
        if (sentResponse){
          setTimeout(() => {
            updateSentResponse(false);
          }, 20000)
        }
    }
  }

  if (direction) {
    direction.trains.forEach(train => {
      trains.push(train)
    })
    polyStart = direction.startLocation;
    polyEnd = direction.endLocation;
  } else {
    trains = []
    polyStart = {}
    polyEnd = {}
  }

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

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: ''
  // })

  const memoizedDirectionsService = () => {
        return <DirectionsService
          options={{
            origin: polyStart,
            destination: polyEnd,
            travelMode: "TRANSIT",
            provideRouteAlternatives: true,
          }}
          callback={directionsCallback}
        />
  }

  setTimeout(() => {
    setMapInit(true);
  }, 1000)

  const renderMap = () => {
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
          suppressInfoWindows: true,
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

        { JSON.stringify(directions) !== "{}" ? 
          memoizedDirectionsService()   
          : <></>
        }

        {
          response && JSON.stringify(directions) !== "{}" &&
          <Polyline 
            path={response.routes[count].overview_path}
            options={{
              strokeColor: "#4A89F3",
              strokeOpacity: 0.95,
              strokeWeight: 4,
            }}
          />
        }

        {
          trains.map(train => {
            return (
              <Marker
              key={train.polyline}
              position={train.departureStopLocation}
              icon={icons[train.trainName]}
              />
            )
          })
        }

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
  } 
  const spinner = () => {
    return (
      <div className="spinner-container-maps">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    mapInit ? renderMap() : spinner()
  )
}

const mSTP = state => {
  return {
    directions: state.entities.directions,
    count: state.entities.count
  }
}

export default connect(mSTP)(Maps);