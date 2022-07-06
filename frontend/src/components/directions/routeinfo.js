import React from 'react';
function RouteInfo({route}) {
    return ( 
        <div className="route-container">
            <h1>
                Route:
            </h1>
            <p>
                {route.arrivalTime}
                {route.distance}
                {route.duration}
                {route.trains.map((train) => {
                    return (
                        <div className="train-info">
                            <p>{train.trainName}</p>
                            <p>{train.instructions}</p>
                            <p>from: {train.departureStop}</p>
                            <p>to: {train.arrivalStop}</p>
                        </div>
                    )
                })}
            </p>
        </div>
     );
}

export default RouteInfo;