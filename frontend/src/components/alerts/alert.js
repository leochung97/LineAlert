import React, { useEffect, useRef, useState } from 'react';
import '../../assets/stylesheets/alerts.scss'

const Alert = ({ alert, fetchStation, stations, deleteAlert, currentUser, isAuthenticated }) => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchStation(alert.station)
      .then(() => {
        setLoaded(true)
      })
  }, [])

  let currentStation = {}
  Object.values(stations).forEach(station => {
    if (station._id === alert.station) {
      currentStation[station._id] = station;
    }
  })

  const alertDate = () => (
    console.log("checking Split")
    // alert.createdAt.split('T')[0]
  )

  const alertTime = () => (
    console.log("checking Split")
    // alert.createdAt.split('T')[1].split('.')[0];
  )

  return isLoaded ? (
    <div className='alert-body'>
      <h1 className={`alert-location ${alert.intensity}`}>
        {Object.values(currentStation)[0].name}
      <p className='alerts-stations'>{Object.values(currentStation)[0].line.join(", ")}</p>
    </h1>
      <p className='alert-description'>{alert.description}</p>
      <div className='alert-date-time'>
        <p className={`alert-date ${alert.intensity}`}>{alertDate}</p>
        <p className={`alert-time ${alert.intensity}`}>{alertTime}</p>
      </div>
      {
        currentUser === alert.user && isAuthenticated ? (
          <div>
            <button>Edit</button>
            <button onClick={() => deleteAlert(alert._id)}>Delete</button>
          </div>
        ) : (
          <></>
        )
      }
    </div>
  ) : (
    <></>
  )
}

export default Alert;