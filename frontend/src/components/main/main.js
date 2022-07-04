import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "../../assets/stylesheets/main.scss";
import { getGoogleKey } from "../../util/google_api_util";

function MainPage() {
  async function getKey() {
    const googleAPI = getGoogleKey();
    console.log(googleAPI);
    let response = await fetch(googleAPI),
      body = await response.json();
    console.log(response);
    console.log(body);
    return body;
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${getGoogleKey()}`,
  });
  // const googlemapkey = await getGoogleKey()
  if (!isLoaded && !getKey()) {
    return <div> Loading... </div>;
  } else {
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
  }

  function Map() {
    const center = { lat: 40.767, lng: -73.972 };

    return (
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [
                {
                  saturation: 36,
                },
                {
                  color: "#000000",
                },
                {
                  lightness: 40,
                },
              ],
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  color: "#000000",
                },
                {
                  lightness: 16,
                },
              ],
            },
            {
              featureType: "all",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 20,
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 17,
                },
                {
                  weight: 1.2,
                },
              ],
            },
            {
              featureType: "administrative.country",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.province",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.locality",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.neighborhood",
              elementType: "all",
              stylers: [
                {
                  visibility: "simplified",
                },
                {
                  lightness: "0",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "all",
              stylers: [
                {
                  visibility: "simplified",
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 20,
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#3d3d3d",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 21,
                },
              ],
            },
            {
              featureType: "poi.attraction",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.business",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.government",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.medical",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.place_of_worship",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.school",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.sports_complex",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 17,
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 29,
                },
                {
                  weight: 0.2,
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 18,
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 16,
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 19,
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [
                {
                  color: "#000000",
                },
              ],
            },
            {
              featureType: "transit.line",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "transit.line",
              elementType: "labels",
              stylers: [
                {
                  color: "#ff0000",
                },
              ],
            },
            {
              featureType: "transit.station.airport",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit.station.bus",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit.station.bus",
              elementType: "labels",
              stylers: [
                {
                  color: "#ff0000",
                },
              ],
            },
            {
              featureType: "transit.station.bus",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "simplified",
                },
              ],
            },
            {
              featureType: "transit.station.rail",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "transit.station.rail",
              elementType: "labels.text",
              stylers: [
                {
                  color: "#ffffff",
                },
                {
                  weight: "0.01",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#98cccc",
                },
              ],
            },
          ],
        }}
      ></GoogleMap>
    );
  }
}

export default MainPage;
