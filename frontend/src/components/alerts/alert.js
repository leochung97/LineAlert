import React, { useEffect, useState } from 'react';
import EditAlertModal from "./edit_alert_modal";
import '../../assets/stylesheets/alerts.scss'
import { useHistory } from 'react-router-dom';

const Alert = ({ alert, fetchStation, stations, deleteAlert, currentUser, isAuthenticated }) => {
  const [state, setState] = useState({
    isOpen: false, 
    isLoaded: false
  });

  const history = useHistory();
  const [currentStation, setStation] = useState({});
  
  useEffect(() => {
    fetchStation(alert.station)
      .then((res) => {
        setStation(res)
        setState({ ...state, isLoaded: true })
      })
  }, [alert.station])

  const handleDelete = (alertId) => {
    deleteAlert(alertId)
  }

  const openEdit = () => {
    setState({ ...state, isOpen: true });
    history.push(`/alerts/${alert._id}`);
  }
  
  const closeModal = () => {
    setState({ ...state, isOpen: false })
    history.push("/");
  }

  const alertDate = () => {
    let alertday = alert.createdAt.split('T')[0];
    return alertday;
  }

  const alertTime = () => {
    let startTime = new Date(alert.createdAt);
    startTime = new Date(startTime.getTime() + startTime.getTimezoneOffset());

    startTime = startTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return startTime;
  };

  return state.isLoaded ? (
    <div className='alert-body'>
      <h1 className={`alert-location ${alert.intensity}`}>
        {currentStation.name}
        <p className='alerts-stations'>{currentStation.line}</p>
      </h1>
      <p className='alert-description'>{alert.description}</p>
      <div className='alert-date-time'>
        <p className={`alert-date ${alert.intensity}`}>{alertDate()}</p>
        <p className={`alert-time ${alert.intensity}`}>{alertTime()}</p>
      </div>
      <div className='edit-delete-alerts-container'>
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