import React from 'react';
import "../../assets/stylesheets/directions_results.css";

function RouteInfo({route}) {
  return ( 
    <div className="route-container">
      <h1 className="route-container-header">Fastest Route</h1>
      <div className="route-container-tripinfo">
        <div className='arrival-duration-distance'>
          <div className='fastest-route-info-container-third'>
            <h4 className='fastest-route-h4'>Duration</h4><div className='fastest-route-p'> {route.duration}</div>
            </div>
            <div className='fastest-route-info-container-third'>
              <h4 className='fastest-route-h4'>Arrival Time</h4><div className='fastest-route-p'> {route.arrivalTime}</div>
            </div>
            <div className='fastest-route-info-container-third-last'>
              <h4 className='fastest-route-h4'>Distance</h4><div className='fastest-route-p'>{route.distance}</div>
            </div>
          </div>
          <div className='fastest-route-info-container'>
            <h4 className='fastest-route-h4'>Directions</h4><div className='fastest-route-p'>{route.trains.map((train) => {
            return (
              <div key={Math.random()} className="route-container-step">
                <span>Take the {train.trainName} train {train.instructions.slice(6)} from the {train.departureStop} train station. Exit the train at the {train.arrivalStop} stop.</span>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
    );
}

export default RouteInfo;