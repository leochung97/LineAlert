import React, { useEffect, useRef, useState } from 'react';

const Alert = ({alert, fetchStation, currentStation}) => {
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
    
        fetchStation(alert.station)
            .then(() => {
                setLoaded(true)
            })
    }, [])
  

    return isLoaded ? (
        <div>
            <p>{alert.createdAt}</p>
            <h1>Location</h1>
            <p>{Object.values(currentStation)[0].name}</p>
            <p>{Object.values(currentStation)[0].line.join(", ")}</p>
            <p>{alert.intensity}</p>
            <p>{alert.description}</p>
        </div>
        ) : (
            <></>
        )
}

export default Alert;