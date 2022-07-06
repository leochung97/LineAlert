import React from 'react';
import '../../assets/stylesheets/alerts.scss'

const Alert = ({alert}) => {
    
    return (
        <div className='alert-body'>
            <h1 className={`alert-location ${alert.intensity}`}>Location</h1>
            {/* will be replaced by station name */}
            <p className='alert-description'>{alert.description}</p>
        </div>
    )
}

export default Alert;