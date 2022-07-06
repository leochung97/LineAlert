import React from 'react';
import {connect} from "react-redux"
import { fetchDirections } from '../../actions/directions_actions';
import RouteInfo from './routeinfo';
function Directions_Results({directions}) {
  return ( 
    <div className='directions-results-container'>
        <h1>hello this is the directions results container</h1>
        {directions.map( (route) => {
          {console.log(route)}
          return <RouteInfo key={Math.random()} route={route}/>
        })}
        {/* {console.log(directions)} */}
    </div>   
    );
}




const mapStateToProps = (state) => {
    return {
      directions: Object.values(state.entities.directions)
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchDirections: (directions) => dispatch(fetchDirections(directions)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Directions_Results);