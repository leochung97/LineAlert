import React, {useState} from "react";
import { connect } from "react-redux";
import { fetchDirections, clearDirections } from "../../actions/directions_actions";
import RouteInfo from "./routeinfo";
function Directions_Results({ directions, errors, clearDirections }) {
  const [count, setCount] = useState(0)

  const toggleButton = () => {
    if (count === directions.length -1 ) {
      return <button type="button" className='direction-button' onClick={() => setCount(0)}>Best Route Again</button>
    } 
    else {
      return <button type="button" className='direction-button' onClick={() => setCount(count + 1 )}>Next Best Route</button>
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
            <div className='directions-buttons'>
          {toggleButton()}
            < button className='direction-button' type = "button" onClick={() => clearDirections()}> Re-fill Form! </button>
            </div>
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
