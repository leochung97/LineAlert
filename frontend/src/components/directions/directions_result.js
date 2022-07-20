import React, {useState} from "react";
import { connect } from "react-redux";
import { fetchDirections, clearDirections } from "../../actions/directions_actions";
import RouteInfo from "./routeinfo";

function Directions_Results({ directions, errors, clearDirections }) {
  const [count, setCount] = useState(0)

  const toggleforRoute = () => {
    if (count === directions.length - 1 ) {
      return <button type="button" className='direction-button' onClick={() => setCount(0)}>Best Route Again</button>
    } 
    else {
      return <button type="button" className='direction-button' onClick={() => setCount(count + 1)}>Next Best Route</button>
    }
  }

  const toggleprevRoute = () => {
    return count ? <button type="button" className='direction-button' onClick={() => setCount(count - 1)}>Previous Route</button> : <></>
  }

  return (
    <div className="directions-results-container">
      {
        errors ? 
        ( <div className="directions-errors-container">
            <span className='directions-errors'>{errors}. Please try again.</span>
            <button onClick={clearDirections} className="directions-error-btn">Try again</button> 
          </div>
        ) : 
        (
          <div>
            <RouteInfo route={directions[count]}/>
            <div className='directions-buttons'>
          {toggleprevRoute()}
          {toggleforRoute()}
            < button className='direction-button' type = "button" onClick={() => clearDirections()}> Clear Search </button>
            </div>
          </div>
        
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('THIS IS STATE IN DIRECTIONSRESULT MSTP', state)
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
