import React from 'react';

const Alert = ({alert}) => {
    return (
        <div>
            <h1>Location</h1>
            {/* will be replaced by station name */}
            <p>{alert.intensity}</p>
            <p>{alert.station}</p>
            <p>{alert.description}</p>
        </div>
    )
}

export default Alert;