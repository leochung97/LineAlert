import React from 'react';
import "../../assets/stylesheets/directions_results.css";
function RouteInfo({route}) {
    return ( 
        <div className="route-container">
            <h1 className="route-container-header">Fastest Route:</h1>
            <span className="route-container-tripinfo">
                <p>Expected Arrival Time: {route.arrivalTime}</p>
                <p>Duraction: {route.duration}</p>
                <p>Distance: {route.distance}</p>
                <p>{route.trains.map((train) => {
                    return (
                        <div key={Math.random()} className="route-container-step">
<span>Take the {train.trainName} train {train.instructions.slice(6)} from the {train.departureStop} train station. Exit the train at the {train.arrivalStop} stop.</span>
                        </div>
                    )
                })}
                </p>
                <p>Hazards on Path:</p>
                <p>Alert here!</p>
            </span>
        </div>
     );
}

export default RouteInfo;