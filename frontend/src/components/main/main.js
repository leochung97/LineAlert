import React from "react";
import { connect } from "react-redux";
import "../../assets/stylesheets/main.scss";
import AlertsContainer from "../alerts/alerts";
import DirectionsForm from "../directions/directions_form.js"
import DirectionsResult from "../directions/directions_result";
import Map from "./map.js";

function MainPage({directions, stations, alerts}) {
  return (
    <div className="main">
      <div className="main-left-side">
        <div className="map">
          <Map 
            alerts={alerts}
            stations={stations}
          />
        </div>
      </div>
      <div className="main-right-side">
        <div className="main-right-top">
        {JSON.stringify(directions) !== "{}" ? (
            <DirectionsResult />
          ) : (
            <DirectionsForm />
          )}
        </div>
        <div className="main-right-bottom">
          <h1>Alerts</h1>
          <AlertsContainer />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    directions: state.entities.directions, 
    stations: state.entities.stations,
    alerts: state.entities.alerts
  };
};

export default connect(mapStateToProps)(MainPage)