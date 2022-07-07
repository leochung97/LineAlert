import React from "react";
import { connect } from "react-redux";
import { fetchDirections } from "../../actions/directions_actions";
import RouteInfo from "./routeinfo";
function Directions_Results({ directions, errors }) {
  return (
    <div className="directions-results-container">
      {errors ? (
        <span>{errors}</span>
      ) : (
        <div>
          {directions.map((route) => {
            return <RouteInfo key={route.polyline} route={route} />;
          })}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    directions: Object.values(state.entities.directions),
    errors: state.entities.directions.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDirections: (directions) => dispatch(fetchDirections(directions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Directions_Results);
