import React, {useState} from "react";
import { connect } from "react-redux";
import { fetchDirections, clearDirections } from "../../actions/directions_actions";
import RouteInfo from "./routeinfo";
function Directions_Results({ directions, errors, clearDirections }) {
  const [count, setCount] = useState(0)

  const toggleButton = () => {
    if (count === directions.length -1 ) {
      return <></>
    } 
    else {
      return <button type="button" onClick={() => setCount(count + 1 )}>Next best route</button>
    }
  }

  return (
    <div className="directions-results-container">
      {
        errors ? 
        ( <span>{errors}</span> ) : 
        (
          <div>
            <RouteInfo route={directions[count]} />
          {toggleButton()}
            < button type = "button" onClick={() => clearDirections()}> Re-fill Form! </button>
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
    clearDirections: () => dispatch(clearDirections()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Directions_Results);
