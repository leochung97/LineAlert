import React, {useState} from "react";
import { connect } from "react-redux";
import { fetchDirections } from "../../actions/directions_actions";
import RouteInfo from "./routeinfo";
function Directions_Results({ directions, errors }) {
  const [count, setCount] = useState(0)
  return (
    <div className="directions-results-container">
      {
        errors ? 
        ( <span>{errors}</span> ) : 
        (
          <div>
            <RouteInfo route={directions[count]} />
            {/* <button type="button" onClick={setCount(count+1)}></button> */}
          </div>
        
        )
      }
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
