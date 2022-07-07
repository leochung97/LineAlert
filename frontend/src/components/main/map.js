import { GoogleMap, Marker, TransitLayer, Polyline, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import mapStyles from "./styles.js";

export default function Map({ alerts, stations }) {
  const center = { lat: 40.767, lng: -73.972 };
  const NEW_YORK_BOUNDS = {
    north: 40.867,
    south: 40.667,
    west: -74.072,
    east: -73.872
  };
  const icons = {
    alerts: {
      YELLOW: 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-yellow.png',
      ORANGE: 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-orange.png',
      RED: 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-red.png'
    }
  };
  const poly = [
    { lat: 40.7359, lng: -73.9911 },
    { lat: 40.7559, lng: -73.9871 },
    { lat: 40.7623, lng: -73.9752 },
    { lat: 40.7730, lng: -73.9855 },
    { lat: 40.7830, lng: -73.9815 }
  ]

  console.log(alerts);
  console.log(stations);
  
  let markersArr = [];

  const findUnique = () => {
    const markers = {};
    alerts.forEach(alert => {
      stations.forEach(station => {
        if (station._id === alert.station) {
          const marker = {
            id: alert._id,
            center: { lat: station.latLng.lat, lng: station.latLng.lng },
            color: alert.intensity,
          }
          markers[marker.id] = marker;
        }
      })
    })
    markersArr = Object.values(markers);
  }

  const markerClick = (center) => {
    const station = stations.find(station =>
      station.latLng.lat === center.lat && station.latLng.lng === center.lng
    );
    console.log(station);
  }

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
        markersArr.map(alert => {
          return (
            <Marker
              key={alert.id}
              position={alert.center}
              icon={alert.color}
              onClick={() => { markerClick(alert.center) }}
              options={{
                clickable: true
              }}
            />
          )
        })
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