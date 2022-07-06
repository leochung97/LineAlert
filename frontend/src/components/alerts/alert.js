import React, { useEffect, useRef, useState } from 'react';
import '../../assets/stylesheets/alerts.scss'

const Alert = ({ alert, fetchStation, currentStation }) => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {

    fetchStation(alert.station)
      .then(() => {
        setLoaded(true)
      })
  }, [])

  const alertDate = (
    alert.createdAt.split('T')[0]
  )

  const alertTime = (
    alert.createdAt.split('T')[1].split('.')[0]
  )

  return isLoaded ? (
    <div className='alert-body'>
      <h1 className={`alert-location ${alert.intensity}`}>
        {Object.values(currentStation)[0].name}
      <p className='alerts-stations'>{Object.values(currentStation)[0].line.join(", ")}</p>
    </h1>
      {/* will be replaced by station name */}
      <p className='alert-description'>{alert.description}</p>
      <div className='alert-date-time'>
        <p className={`alert-date ${alert.intensity}`}>{alertDate}</p>
        <p className={`alert-time ${alert.intensity}`}>{alertTime}</p>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Alert;