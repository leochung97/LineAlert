import React, { useEffect, useState } from 'react';
import EditAlertModal from "./edit_alert_modal";
import '../../assets/stylesheets/alerts.scss'
import { useHistory } from 'react-router-dom';

const Alert = ({ alert, fetchStation, stations, deleteAlert, clearAlerts, currentUser, isAuthenticated }) => {
  const [state, setState] = useState({
    isOpen: false, 
    isLoaded: false
  })

  const history = useHistory();

  useEffect(() => {
    fetchStation(alert.station)
      .then(() => {
        setState({ ...state, isLoaded: true })
      })
  }, [fetchStation, alert])

  const handleDelete = (alertId) => {
    deleteAlert(alertId)
      .then(() => {
        clearAlerts()
        console.log("this was called")
      })
  }

  const openEdit = () => {
    setState({ ...state, isOpen: true });
    history.push(`/alerts/${alert._id}`);
  }
  
  const closeModal = () => {
    setState({ ...state, isOpen: false })
    history.push("/");
  }

  let currentStation = {}
  stations.forEach(station => {
    if (station._id === alert.station) {
      currentStation = station;
    }
  })

  const alertDate = () => {
    let alertday = alert.createdAt.split('T')[0];
    return alertday;
  }

  const alertTime = () => {
    let alerttime = alert.createdAt.split('T')[1].split('.')[0];
    return alerttime;
  }

  return state.isLoaded ? (
    <div className='alert-body'>
      <h1 className={`alert-location ${alert.intensity}`}>
        {currentStation.name}
        <p className='alerts-stations'>{currentStation.line.join(" ")}</p>
      </h1>
      <p className='alert-description'>{alert.description}</p>
      <div className='alert-date-time'>
        <p className={`alert-date ${alert.intensity}`}>{alertDate()}</p>
        {
          currentUser === alert.user && isAuthenticated ? (
            <div className='edit-delete-alert'>
              <button className='edit-alert-button' onClick={openEdit}>Edit</button>
              <button className='delete-alert-button' onClick={() => handleDelete(alert._id)}>Delete</button>
            </div>
          ) : (
            <></>
          )
        }
        <p className={`alert-time ${alert.intensity}`}>{alertTime()}</p>
      </div>
      
      <EditAlertModal
        alert={alert}
        isOpen={state.isOpen}
        closeModal={closeModal}
      />

    </div>
  ) : (
    <></>
  )
}

export default Alert;